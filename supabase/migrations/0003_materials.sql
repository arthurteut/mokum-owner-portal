-- Materialele portalului (cursuri, fișe A4, SOP-uri): stocare privată.
-- Doar membrii portalului pot vedea, urca și șterge fișiere.

insert into storage.buckets (id, name, public, file_size_limit)
values ('materials', 'materials', false, 52428800)
on conflict (id) do nothing;

drop policy if exists "materials read" on storage.objects;
drop policy if exists "materials upload" on storage.objects;
drop policy if exists "materials update" on storage.objects;
drop policy if exists "materials delete" on storage.objects;

create policy "materials read" on storage.objects
  for select to authenticated using (bucket_id = 'materials' and public.is_portal_member());
create policy "materials upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'materials' and public.is_portal_member());
create policy "materials update" on storage.objects
  for update to authenticated using (bucket_id = 'materials' and public.is_portal_member())
  with check (bucket_id = 'materials' and public.is_portal_member());
create policy "materials delete" on storage.objects
  for delete to authenticated using (bucket_id = 'materials' and public.is_portal_member());
