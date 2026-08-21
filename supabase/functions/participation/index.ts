import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const TURNSTILE_SECRET_KEY = Deno.env.get('TURNSTILE_SECRET_KEY') ?? '';
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type Payload = Record<string, unknown>;

function corsHeaders(origin: string | null) {
  const isAllowed = Boolean(origin && ALLOWED_ORIGINS.includes(origin));
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

function response(origin: string | null, data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin) });
}

function asText(value: unknown, min = 0, max = 2500) {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text.length >= min && text.length <= max ? text : null;
}

function isUuid(value: string | null) {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}

function isEmail(value: string | null) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function verifyTurnstile(token: string | null, request: Request) {
  if (!TURNSTILE_SECRET_KEY) return { ok: false, error: 'La protección anti-spam no está configurada.' };
  if (!token) return { ok: false, error: 'Completa la verificación anti-spam antes de enviar el formulario.' };

  const form = new FormData();
  form.append('secret', TURNSTILE_SECRET_KEY);
  form.append('response', token);
  const remoteIp = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For')?.split(',')[0];
  if (remoteIp) form.append('remoteip', remoteIp);

  const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const result = await verification.json() as { success?: boolean };
  return result.success ? { ok: true } : { ok: false, error: 'No se ha podido verificar el envío. Inténtalo de nuevo.' };
}

async function listSurveys() {
  const { data: rawSurveys, error: surveysError } = await db
    .from('surveys')
    .select('id,title,description,starts_at,ends_at,survey_questions(id,prompt,help,position,survey_question_options(id,label,position))')
    .eq('published', true)
    .order('starts_at', { ascending: false });

  if (surveysError) throw surveysError;

  const now = Date.now();
  const surveys = (rawSurveys ?? []).filter((survey: { starts_at: string; ends_at: string | null }) =>
    new Date(survey.starts_at).getTime() <= now && (!survey.ends_at || new Date(survey.ends_at).getTime() > now),
  );
  const surveyIds = surveys.map((survey: { id: string }) => survey.id);
  const { data: responses, error: responsesError } = surveyIds.length
    ? await db.from('survey_responses').select('survey_id').in('survey_id', surveyIds)
    : { data: [], error: null };
  if (responsesError) throw responsesError;

  const responseCounts = new Map<string, number>();
  for (const item of responses ?? []) responseCounts.set(item.survey_id, (responseCounts.get(item.survey_id) ?? 0) + 1);

  return surveys.map((survey: { id: string; title: string; description: string | null; ends_at: string | null; survey_questions: Array<{ id: string; prompt: string; help: string | null; position: number; survey_question_options: Array<{ id: string; label: string; position: number }> }> }) => ({
    id: survey.id,
    title: survey.title,
    description: survey.description,
    endsAt: survey.ends_at,
    responses: responseCounts.get(survey.id) ?? 0,
    questions: (survey.survey_questions ?? []).sort((a, b) => a.position - b.position).map((question) => ({
      id: question.id,
      prompt: question.prompt,
      help: question.help,
      options: (question.survey_question_options ?? []).sort((a, b) => a.position - b.position).map((option) => ({ id: option.id, label: option.label })),
    })),
  }));
}

async function submitSurvey(payload: Payload, request: Request) {
  const surveyId = asText(payload.surveyId, 1, 80);
  const visitorId = asText(payload.visitorId, 1, 80);
  const comment = asText(payload.comment, 0, 800) || null;
  const captcha = await verifyTurnstile(asText(payload.turnstileToken, 1, 4096), request);
  if (!captcha.ok) return { error: captcha.error, status: 400 };
  if (!isUuid(surveyId) || !isUuid(optionId) || !isUuid(visitorId)) return { error: 'Los datos del voto no son válidos.', status: 400 };

  const { data: survey, error: surveyError } = await db.from('surveys').select('id,published,starts_at,ends_at').eq('id', surveyId).maybeSingle();
  if (surveyError || !survey || !survey.published || new Date(survey.starts_at).getTime() > Date.now() || (survey.ends_at && new Date(survey.ends_at).getTime() <= Date.now())) {
    return { error: 'Esta encuesta ya no está disponible.', status: 404 };
  }

  const answers = Array.isArray(payload.answers) ? payload.answers : [];
  const { data: questions, error: questionsError } = await db.from('survey_questions').select('id,survey_question_options(id)').eq('survey_id', surveyId);
  if (questionsError || !questions?.length || answers.length !== questions.length) return { error: 'Responde todas las preguntas antes de enviar el cuestionario.', status: 400 };

  const parsedAnswers = answers.map((answer) => {
    const item = answer as Record<string, unknown>;
    return { questionId: asText(item.questionId, 1, 80), optionId: asText(item.optionId, 1, 80) };
  });
  if (parsedAnswers.some((answer) => !isUuid(answer.questionId) || !isUuid(answer.optionId))) return { error: 'Las respuestas no son válidas.', status: 400 };
  for (const question of questions) {
    const answer = parsedAnswers.find((item) => item.questionId === question.id);
    if (!answer || !(question.survey_question_options ?? []).some((option: { id: string }) => option.id === answer.optionId)) return { error: 'Las respuestas no son válidas.', status: 400 };
  }

  const { data: responseData, error: responseError } = await db.from('survey_responses').insert({ survey_id: surveyId, visitor_id: visitorId, comment }).select('id').single();
  if (responseError?.code === '23505') return { error: 'Ya has enviado este cuestionario desde este dispositivo.', status: 409 };
  if (responseError || !responseData) throw responseError;
  const { error: answersError } = await db.from('survey_answers').insert(parsedAnswers.map((answer) => ({ response_id: responseData.id, question_id: answer.questionId, option_id: answer.optionId })));
  if (answersError) throw answersError;
  return { data: { message: 'Encuesta registrada' } };
}

async function submitIdea(payload: Payload, request: Request) {
  const title = asText(payload.title, 8, 120);
  const category = asText(payload.category, 2, 80);
  const location = asText(payload.location, 3, 120);
  const description = asText(payload.description, 30, 2500);
  const contactEmail = asText(payload.contactEmail, 0, 254) || null;
  const captcha = await verifyTurnstile(asText(payload.turnstileToken, 1, 4096), request);
  if (!captcha.ok) return { error: captcha.error, status: 400 };
  if (!title || !category || !location || !description || !isEmail(contactEmail)) return { error: 'Revisa los campos obligatorios de la propuesta.', status: 400 };

  const { error } = await db.from('ideas').insert({ title, category, location, description, contact_email: contactEmail });
  if (error) throw error;
  return { data: { message: 'Propuesta recibida' } };
}

async function submitIncident(payload: Payload, request: Request) {
  const category = asText(payload.category, 2, 80);
  const location = asText(payload.location, 3, 180);
  const description = asText(payload.description, 20, 2500);
  const contactEmail = asText(payload.contactEmail, 0, 254) || null;
  const captcha = await verifyTurnstile(asText(payload.turnstileToken, 1, 4096), request);
  if (!captcha.ok) return { error: captcha.error, status: 400 };
  if (!category || !location || !description || !isEmail(contactEmail)) return { error: 'Revisa los campos obligatorios de la incidencia.', status: 400 };

  const { error } = await db.from('incidents').insert({ category, location, description, contact_email: contactEmail });
  if (error) throw error;
  return { data: { message: 'Incidencia recibida' } };
}

Deno.serve(async (request) => {
  const origin = request.headers.get('Origin');
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(origin) });
  if (!ALLOWED_ORIGINS.length || !origin || !ALLOWED_ORIGINS.includes(origin)) return response(origin, { error: 'Origen no autorizado.' }, 403);
  if (request.method !== 'POST') return response(origin, { error: 'Método no permitido.' }, 405);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return response(origin, { error: 'El servicio no está configurado.' }, 503);

  try {
    const payload = await request.json() as Payload;
    const action = payload.action;
    if (action === 'list_surveys') return response(origin, { data: await listSurveys() });

    const result = action === 'submit_survey' ? await submitSurvey(payload, request)
      : action === 'submit_idea' ? await submitIdea(payload, request)
      : action === 'submit_incident' ? await submitIncident(payload, request)
      : { error: 'Acción no válida.', status: 400 };
    if ('error' in result) return response(origin, { error: result.error }, result.status);
    return response(origin, result);
  } catch (error) {
    console.error(error);
    return response(origin, { error: 'No se ha podido procesar la solicitud.' }, 500);
  }
});
