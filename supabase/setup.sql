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
