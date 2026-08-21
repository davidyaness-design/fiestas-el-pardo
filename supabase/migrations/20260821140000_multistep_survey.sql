create table if not exists public.survey_questions (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  prompt text not null check (char_length(prompt) between 8 and 500),
  help text,
  position smallint not null,
  unique (survey_id, position)
);

create table if not exists public.survey_question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.survey_questions(id) on delete cascade,
  label text not null check (char_length(label) between 1 and 180),
  position smallint not null,
  unique (question_id, position),
  unique (question_id, label)
);

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  visitor_id uuid not null,
  comment text check (comment is null or char_length(comment) <= 800),
  created_at timestamptz not null default now(),
  unique (survey_id, visitor_id)
);

create table if not exists public.survey_answers (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.survey_responses(id) on delete cascade,
  question_id uuid not null references public.survey_questions(id) on delete cascade,
  option_id uuid not null references public.survey_question_options(id) on delete cascade,
  unique (response_id, question_id)
);

create index if not exists survey_questions_survey_id_idx on public.survey_questions(survey_id, position);
create index if not exists survey_responses_survey_id_idx on public.survey_responses(survey_id);
create index if not exists survey_answers_option_id_idx on public.survey_answers(option_id);

alter table public.survey_questions enable row level security;
alter table public.survey_question_options enable row level security;
alter table public.survey_responses enable row level security;
alter table public.survey_answers enable row level security;
revoke all on public.survey_questions, public.survey_question_options, public.survey_responses, public.survey_answers from anon, authenticated;

update public.surveys
set title = 'Cuestionario de valoración de las fiestas',
    question = 'Queremos conocer tu opinión para mejorar la programación de próximas ediciones.',
    description = 'El cuestionario es anónimo y tarda menos de dos minutos.',
    published = true,
    starts_at = '2026-08-21T00:00:00+02:00',
    ends_at = '2026-09-07T00:00:00+02:00'
where slug = 'prioridad-fiestas-2026';

with survey as (
  select id from public.surveys where slug = 'prioridad-fiestas-2026'
)
insert into public.survey_questions (survey_id, prompt, position)
select survey.id, question_data.prompt, question_data.position
from survey
cross join (values
  ('¿Qué tipo de actividad te gustaría que tuviera más presencia?', 1),
  ('¿En qué franja horaria participas con más facilidad?', 2),
  ('¿Cómo prefieres informarte sobre el programa?', 3),
  ('En general, ¿cómo valorarías la programación de las fiestas?', 4)
) as question_data(prompt, position)
on conflict (survey_id, position) do update set prompt = excluded.prompt;

with survey_questions as (
  select q.id, q.position
  from public.survey_questions q
  join public.surveys s on s.id = q.survey_id
  where s.slug = 'prioridad-fiestas-2026'
)
insert into public.survey_question_options (question_id, label, position)
select survey_questions.id, option_data.label, option_data.position
from survey_questions
join (values
  (1, 'Música y conciertos', 1), (1, 'Actividades infantiles y familiares', 2), (1, 'Deporte y vida saludable', 3), (1, 'Tradiciones y cultura local', 4),
  (2, 'Mañana', 1), (2, 'Tarde', 2), (2, 'Noche', 3), (2, 'Me resulta indiferente', 4),
  (3, 'Página web del distrito', 1), (3, 'Redes sociales', 2), (3, 'Carteles y programa impreso', 3), (3, 'Asociaciones y vecindario', 4),
  (4, 'Excelente', 1), (4, 'Buena', 2), (4, 'Mejorable', 3), (4, 'Insuficiente', 4)
) as option_data(question_position, label, position) on option_data.question_position = survey_questions.position
on conflict (question_id, label) do update set position = excluded.position;
