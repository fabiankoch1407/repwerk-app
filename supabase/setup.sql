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
