-- Repwerk Fitness: database setup for login and cloud sync.
-- Paste everything into Supabase → SQL Editor → New query, then click Run. Safe to run more than once.

-- One row per user with the whole app state as JSON.
create table if not exists public.user_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Row level security: every user can only see and change their own row.
alter table public.user_state enable row level security;

drop policy if exists "user_state select own" on public.user_state;
drop policy if exists "user_state insert own" on public.user_state;
drop policy if exists "user_state update own" on public.user_state;
drop policy if exists "user_state delete own" on public.user_state;
create policy "user_state select own" on public.user_state for select to authenticated using ((select auth.uid()) = user_id);
create policy "user_state insert own" on public.user_state for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "user_state update own" on public.user_state for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "user_state delete own" on public.user_state for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.user_state from anon;
grant select, insert, update, delete on public.user_state to authenticated;

-- "Konto löschen" in the app: deletes the signed-in user. Their row in user_state goes with it (on delete cascade).
create or replace function public.delete_user()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke execute on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;

-- ---------------------------------------------------------------------------
-- Community: public profiles and shared workouts.
-- Every signed-in user can read profiles and shared workouts; only the owner can write or delete them.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '' check (char_length(name) <= 60),
  bio text not null default '' check (char_length(bio) <= 400),
  avatar text not null default '' check (octet_length(avatar) <= 200000),
  goal text not null default '' check (char_length(goal) <= 60),
  at bigint not null default 0
);
alter table public.profiles enable row level security;
drop policy if exists "profiles read" on public.profiles;
drop policy if exists "profiles insert own" on public.profiles;
drop policy if exists "profiles update own" on public.profiles;
drop policy if exists "profiles delete own" on public.profiles;
create policy "profiles read" on public.profiles for select to authenticated using (true);
create policy "profiles insert own" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "profiles update own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "profiles delete own" on public.profiles for delete to authenticated using ((select auth.uid()) = id);
revoke all on public.profiles from anon;
grant select, insert, update, delete on public.profiles to authenticated;
create index if not exists profiles_at on public.profiles (at desc);

create table if not exists public.posts (
  author uuid not null references auth.users (id) on delete cascade,
  id text not null check (char_length(id) <= 64),
  at bigint not null,
  data jsonb not null check (octet_length(data::text) <= 400000),
  primary key (author, id)
);
alter table public.posts enable row level security;
drop policy if exists "posts read" on public.posts;
drop policy if exists "posts insert own" on public.posts;
drop policy if exists "posts update own" on public.posts;
drop policy if exists "posts delete own" on public.posts;
create policy "posts read" on public.posts for select to authenticated using (true);
create policy "posts insert own" on public.posts for insert to authenticated with check ((select auth.uid()) = author);
create policy "posts update own" on public.posts for update to authenticated using ((select auth.uid()) = author) with check ((select auth.uid()) = author);
create policy "posts delete own" on public.posts for delete to authenticated using ((select auth.uid()) = author);
revoke all on public.posts from anon;
grant select, insert, update, delete on public.posts to authenticated;
create index if not exists posts_author_at on public.posts (author, at desc);

-- ---------------------------------------------------------------------------
-- Workout photos: Storage bucket "workout-photos", one folder per user (<user id>/<photo id>.jpg).
-- Files are public by link (needed for the community feed); the photo ids are random. Only the owner can upload or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('workout-photos', 'workout-photos', true, 2097152, array['image/jpeg'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "workout photos read own" on storage.objects;
drop policy if exists "workout photos insert own" on storage.objects;
drop policy if exists "workout photos update own" on storage.objects;
drop policy if exists "workout photos delete own" on storage.objects;
create policy "workout photos read own" on storage.objects for select to authenticated
  using (bucket_id = 'workout-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "workout photos insert own" on storage.objects for insert to authenticated
  with check (bucket_id = 'workout-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "workout photos update own" on storage.objects for update to authenticated
  using (bucket_id = 'workout-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "workout photos delete own" on storage.objects for delete to authenticated
  using (bucket_id = 'workout-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- ---------------------------------------------------------------------------
-- Pro status, written only by the Stripe webhook (server, secret key). Users can read their own row.
create table if not exists public.entitlements (
  user_id uuid primary key references auth.users (id) on delete cascade,
  pro_until timestamptz,
  status text,
  stripe_customer text,
  stripe_subscription text,
  updated_at timestamptz not null default now()
);
alter table public.entitlements enable row level security;
drop policy if exists "entitlements read own" on public.entitlements;
create policy "entitlements read own" on public.entitlements for select to authenticated using ((select auth.uid()) = user_id);
revoke all on public.entitlements from anon, authenticated;
grant select on public.entitlements to authenticated;

-- AI usage counter. Only use_ai() writes it, so nobody can reset their own limits.
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  period text not null,
  kind text not null,
  n int not null default 0,
  primary key (user_id, period, kind)
);
alter table public.ai_usage enable row level security;
drop policy if exists "ai_usage read own" on public.ai_usage;
create policy "ai_usage read own" on public.ai_usage for select to authenticated using ((select auth.uid()) = user_id);
revoke all on public.ai_usage from anon, authenticated;
grant select on public.ai_usage to authenticated;

-- Called by /api/ai before every AI request. Counts one use and says whether it is allowed.
-- Limits (Free / Pro): photo scan 3 / 30 per day, text analysis 10 / 60 per day,
-- coach 5 per week / 50 per day, meal plan Pro only, 3 per week. Days and weeks follow German time.
create or replace function public.use_ai(p_kind text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_pro boolean := false;
  v_lim int;
  v_period text;
  v_n int;
  v_now timestamp := now() at time zone 'Europe/Berlin';
begin
  if v_uid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if p_kind is null or p_kind not in ('scan', 'text', 'coach', 'mealplan') then p_kind := 'text'; end if;
  select coalesce(e.pro_until > now(), false) into v_pro from public.entitlements e where e.user_id = v_uid;
  v_pro := coalesce(v_pro, false);
  v_lim := case p_kind
    when 'scan' then case when v_pro then 30 else 3 end
    when 'text' then case when v_pro then 60 else 10 end
    when 'coach' then case when v_pro then 50 else 5 end
    else case when v_pro then 3 else 0 end
  end;
  if v_lim = 0 then return jsonb_build_object('ok', false, 'error', 'pro', 'limit', 0, 'pro', v_pro); end if;
  v_period := case when p_kind = 'mealplan' or (p_kind = 'coach' and not v_pro)
    then 'w' || to_char(date_trunc('week', v_now), 'YYYY-MM-DD')
    else 'd' || to_char(v_now, 'YYYY-MM-DD') end;
  insert into public.ai_usage as u (user_id, period, kind, n) values (v_uid, v_period, p_kind, 1)
  on conflict (user_id, period, kind) do update set n = u.n + 1 where u.n < v_lim
  returning u.n into v_n;
  if v_n is null then return jsonb_build_object('ok', false, 'error', 'limit', 'limit', v_lim, 'pro', v_pro); end if;
  return jsonb_build_object('ok', true, 'used', v_n, 'limit', v_lim, 'pro', v_pro);
end;
$$;
revoke execute on function public.use_ai(text) from public, anon;
grant execute on function public.use_ai(text) to authenticated;
