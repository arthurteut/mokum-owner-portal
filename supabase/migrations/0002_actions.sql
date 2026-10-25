-- Planul de acțiune devine o secțiune nouă a portalului.
alter table public.portal_docs drop constraint if exists portal_docs_section_check;
alter table public.portal_docs add constraint portal_docs_section_check check (section in (
  'actions', 'pl', 'kpi', 'team', 'courses', 'org', 'raci', 'jobs',
  'playbook', 'hospitality', 'cjm', 'equipment', 'contacts'
));
