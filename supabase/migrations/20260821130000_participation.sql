create table if not exists public.surveys (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null check (char_length(title) between 4 and 160),
  question text not null check (char_length(question) between 8 and 500),
  description text,
  published boolean not null default false,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

create table if not exists public.survey_options (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  label text not null check (char_length(label) between 1 and 180),
  position smallint not null default 0,
  unique (survey_id, label)
);

create table if not exists public.survey_votes (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  option_id uuid not null references public.survey_options(id) on delete cascade,
  visitor_id uuid not null,
  created_at timestamptz not null default now(),
  unique (survey_id, visitor_id)
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 8 and 120),
  category text not null check (char_length(category) between 2 and 80),
  location text not null check (char_length(location) between 3 and 120),
  description text not null check (char_length(description) between 30 and 2500),
  contact_email text check (contact_email is null or char_length(contact_email) <= 254),
  status text not null default 'received' check (status in ('received', 'reviewing', 'accepted', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  category text not null check (char_length(category) between 2 and 80),
  location text not null check (char_length(location) between 3 and 180),
  description text not null check (char_length(description) between 20 and 2500),
  contact_email text check (contact_email is null or char_length(contact_email) <= 254),
  status text not null default 'received' check (status in ('received', 'reviewing', 'resolved', 'discarded')),
  created_at timestamptz not null default now()
);

create index if not exists survey_votes_survey_id_idx on public.survey_votes(survey_id);
create index if not exists ideas_status_created_at_idx on public.ideas(status, created_at desc);
create index if not exists incidents_status_created_at_idx on public.incidents(status, created_at desc);

alter table public.surveys enable row level security;
alter table public.survey_options enable row level security;
alter table public.survey_votes enable row level security;
alter table public.ideas enable row level security;
alter table public.incidents enable row level security;

revoke all on public.surveys, public.survey_options, public.survey_votes, public.ideas, public.incidents from anon, authenticated;

insert into public.surveys (slug, title, question, description, published, starts_at, ends_at)
values (
  'prioridad-fiestas-2026',
  'Consulta sobre las fiestas',
  '¿Qué tipo de actividad te gustaría que tuviera más presencia en las próximas fiestas?',
  'Esta consulta es anónima y estará abierta hasta el 6 de septiembre de 2026.',
  true,
  '2026-08-21T00:00:00+02:00',
  '2026-09-07T00:00:00+02:00'
)
on conflict (slug) do update set
  title = excluded.title,
  question = excluded.question,
  description = excluded.description,
  published = excluded.published,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at;

with active_survey as (
  select id from public.surveys where slug = 'prioridad-fiestas-2026'
)
insert into public.survey_options (survey_id, label, position)
select active_survey.id, option_data.label, option_data.position
from active_survey
cross join (values
  ('Música y conciertos', 1),
  ('Actividades infantiles y familiares', 2),
  ('Deporte y vida saludable', 3),
  ('Tradiciones y cultura local', 4)
) as option_data(label, position)
on conflict (survey_id, label) do nothing;
