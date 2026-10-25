-- Portalul owner-ului Mokum: membri cu acces + documentele portalului.
-- Fiecare secțiune (pl, kpi, team, ...) e un rând JSON în portal_docs.

create table if not exists public.portal_members (
  email      text primary key check (email = lower(email)),
  role       text not null default 'owner' check (role in ('owner', 'atc')),
  name       text,
  created_at timestamptz not null default now()
);

create table if not exists public.portal_docs (
  section    text primary key check (section in (
    'pl', 'kpi', 'team', 'courses', 'org', 'raci', 'jobs',
    'playbook', 'hospitality', 'cjm', 'equipment', 'contacts'
  )),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);

-- Istoric: fiecare versiune salvată, ca să putem reveni dacă se strică ceva.
create table if not exists public.portal_history (
  id         bigint generated always as identity primary key,
  section    text not null,
  data       jsonb not null,
  saved_at   timestamptz not null default now(),
  saved_by   text
);
create index if not exists portal_history_section_idx on public.portal_history (section, saved_at desc);

create or replace function public.is_portal_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portal_members
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.is_portal_atc()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portal_members
    where email = lower(coalesce(auth.jwt() ->> 'email', '')) and role = 'atc'
  );
$$;

create or replace function public.portal_docs_history()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.portal_history (section, data, saved_by)
  values (new.section, new.data, new.updated_by);
  return new;
end;
$$;

drop trigger if exists portal_docs_history_trg on public.portal_docs;
create trigger portal_docs_history_trg
  after insert or update on public.portal_docs
  for each row execute function public.portal_docs_history();

revoke all on function public.is_portal_member() from public;
revoke all on function public.is_portal_atc() from public;
revoke all on function public.portal_docs_history() from public;
grant execute on function public.is_portal_member() to authenticated;
grant execute on function public.is_portal_atc() to authenticated;

-- Expunere explicită prin Data API (proiectul nu expune automat tabelele noi).
-- Doar utilizatorii autentificați; anonimii nu primesc nimic.
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.portal_members to authenticated;
grant select, insert, update, delete on public.portal_docs to authenticated;
grant select on public.portal_history to authenticated;
revoke all on public.portal_members, public.portal_docs, public.portal_history from anon;

alter table public.portal_members enable row level security;
alter table public.portal_docs enable row level security;
alter table public.portal_history enable row level security;

-- Membrii: fiecare membru vede lista; doar ATC adaugă / scoate oameni.
create policy "members read" on public.portal_members
  for select to authenticated using (public.is_portal_member());
create policy "atc manages members" on public.portal_members
  for all to authenticated using (public.is_portal_atc()) with check (public.is_portal_atc());

-- Documentele: citire și scriere doar pentru membri.
create policy "docs read" on public.portal_docs
  for select to authenticated using (public.is_portal_member());
create policy "docs insert" on public.portal_docs
  for insert to authenticated with check (public.is_portal_member());
create policy "docs update" on public.portal_docs
  for update to authenticated using (public.is_portal_member()) with check (public.is_portal_member());
create policy "docs delete" on public.portal_docs
  for delete to authenticated using (public.is_portal_atc());

-- Istoricul: doar citire, pentru membri (scrie doar trigger-ul).
create policy "history read" on public.portal_history
  for select to authenticated using (public.is_portal_member());

-- Accesul se dă din SQL Editor (nu se comite în repo, care e public):
--   insert into public.portal_members (email, role, name)
--   values ('email@atc', 'atc', 'Around The Corner'), ('email@mokum', 'owner', 'Owner Mokum');
