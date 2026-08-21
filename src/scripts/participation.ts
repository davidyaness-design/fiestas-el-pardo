const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

type ApiResponse<T> = { data?: T; error?: string; code?: string };
type LocalOption = { id: string; label: string; votes: number };
type LocalQuestion = { id: string; prompt: string; help?: string; options: LocalOption[] };
type LocalSurvey = { id: string; title: string; description: string; endsAt: string; responses: number; questions: LocalQuestion[] };
type LocalSubmission = { id: string; createdAt: string; [key: string]: unknown };

const LOCAL_SURVEYS_KEY = 'el-pardo-participation-surveys';
const LOCAL_IDEAS_KEY = 'el-pardo-participation-ideas';
const LOCAL_INCIDENTS_KEY = 'el-pardo-participation-incidents';
const LOCAL_VOTES_KEY = 'el-pardo-participation-votes';

const defaultSurveys: LocalSurvey[] = [{
  id: 'cuestionario-fiestas-2026-v2',
  title: 'Cuestionario de valoración de las fiestas',
  description: 'Queremos conocer tu opinión para mejorar la programación de próximas ediciones.',
  endsAt: '2026-09-07T00:00:00+02:00',
  responses: 0,
  questions: [
    { id: 'actividad', prompt: '¿Qué tipo de actividad te gustaría que tuviera más presencia?', options: [
      { id: 'musica', label: 'Música y conciertos', votes: 0 }, { id: 'familia', label: 'Actividades infantiles y familiares', votes: 0 }, { id: 'deporte', label: 'Deporte y vida saludable', votes: 0 }, { id: 'tradicion', label: 'Tradiciones y cultura local', votes: 0 },
    ] },
    { id: 'horario', prompt: '¿En qué franja horaria participas con más facilidad?', options: [
      { id: 'manana', label: 'Mañana', votes: 0 }, { id: 'tarde', label: 'Tarde', votes: 0 }, { id: 'noche', label: 'Noche', votes: 0 }, { id: 'indiferente', label: 'Me resulta indiferente', votes: 0 },
    ] },
    { id: 'informacion', prompt: '¿Cómo prefieres informarte sobre el programa?', options: [
      { id: 'web', label: 'Página web del distrito', votes: 0 }, { id: 'redes', label: 'Redes sociales', votes: 0 }, { id: 'cartel', label: 'Carteles y programa impreso', votes: 0 }, { id: 'vecindario', label: 'Asociaciones y vecindario', votes: 0 },
    ] },
    { id: 'valoracion', prompt: 'En general, ¿cómo valorarías la programación de las fiestas?', options: [
      { id: 'excelente', label: 'Excelente', votes: 0 }, { id: 'buena', label: 'Buena', votes: 0 }, { id: 'mejorable', label: 'Mejorable', votes: 0 }, { id: 'insuficiente', label: 'Insuficiente', votes: 0 },
    ] },
  ],
}];

export function isParticipationConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getVisitorId() {
  const storageKey = 'el-pardo-participation-visitor';
  const stored = window.localStorage.getItem(storageKey);

  if (stored) return stored;

  const visitorId = crypto.randomUUID();
  window.localStorage.setItem(storageKey, visitorId);
  return visitorId;
}

export function getTurnstileToken() {
  return document.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value ?? '';
}

function localRead<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function localWrite<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function ensureText(value: unknown, min: number, max: number, message: string) {
  if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) throw new Error(message);
  return value.trim();
}

function ensureEmail(value: unknown) {
  const email = typeof value === 'string' ? value.trim() : '';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Introduce un correo electrónico válido o déjalo vacío.');
  return email || null;
}

function localSurveys() {
  const surveys = localRead<LocalSurvey[]>(LOCAL_SURVEYS_KEY, defaultSurveys);
  if (!surveys.every((survey) => Array.isArray(survey.questions))) {
    localWrite(LOCAL_SURVEYS_KEY, defaultSurveys);
    return defaultSurveys;
  }
  return surveys;
}

function localRequest<T>(action: string, payload: Record<string, unknown>) {
  if (action === 'list_surveys') return localSurveys() as T;

  if (action === 'submit_survey') {
    const surveyId = ensureText(payload.surveyId, 1, 80, 'La encuesta no es válida.');
    const visitorId = ensureText(payload.visitorId, 1, 80, 'No se ha podido identificar este dispositivo.');
    const votes = localRead<Array<{ surveyId: string; visitorId: string }>>(LOCAL_VOTES_KEY, []);
    if (votes.some((vote) => vote.surveyId === surveyId && vote.visitorId === visitorId)) throw new Error('Ya has emitido un voto en esta encuesta desde este dispositivo.');

    const surveys = localSurveys();
    const survey = surveys.find((item) => item.id === surveyId);
    const answers = Array.isArray(payload.answers) ? payload.answers : [];
    if (!survey || answers.length !== survey.questions.length) throw new Error('Responde a todas las preguntas antes de enviar la encuesta.');
    for (const question of survey.questions) {
      const answer = answers.find((item) => item && typeof item === 'object' && (item as Record<string, unknown>).questionId === question.id) as Record<string, unknown> | undefined;
      const optionId = typeof answer?.optionId === 'string' ? answer.optionId : '';
      const option = question.options.find((item) => item.id === optionId);
      if (!option) throw new Error('Revisa que hayas respondido todas las preguntas.');
      option.votes += 1;
    }
    survey.responses += 1;
    localWrite(LOCAL_SURVEYS_KEY, surveys);
    localWrite(LOCAL_VOTES_KEY, [...votes, { surveyId, visitorId }]);
    return { message: 'Encuesta registrada' } as T;
  }

  if (action === 'submit_idea') {
    const title = ensureText(payload.title, 8, 120, 'El título debe tener entre 8 y 120 caracteres.');
    const category = ensureText(payload.category, 2, 80, 'Selecciona el área de la propuesta.');
    const location = ensureText(payload.location, 3, 120, 'Indica la zona a la que se refiere la propuesta.');
    const description = ensureText(payload.description, 30, 2500, 'Describe tu idea con al menos 30 caracteres.');
    const contactEmail = ensureEmail(payload.contactEmail);
    const ideas = localRead<LocalSubmission[]>(LOCAL_IDEAS_KEY, []);
    localWrite(LOCAL_IDEAS_KEY, [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), title, category, location, description, contactEmail }, ...ideas]);
    return { message: 'Propuesta recibida' } as T;
  }

  if (action === 'submit_incident') {
    const category = ensureText(payload.category, 2, 80, 'Selecciona el tipo de incidencia.');
    const location = ensureText(payload.location, 3, 180, 'Indica la ubicación de la incidencia.');
    const description = ensureText(payload.description, 20, 2500, 'Describe la incidencia con al menos 20 caracteres.');
    const contactEmail = ensureEmail(payload.contactEmail);
    const incidents = localRead<LocalSubmission[]>(LOCAL_INCIDENTS_KEY, []);
    localWrite(LOCAL_INCIDENTS_KEY, [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), category, location, description, contactEmail }, ...incidents]);
    return { message: 'Incidencia recibida' } as T;
  }

  throw new Error('La acción solicitada no es válida.');
}

export async function participationRequest<T>(action: string, payload: Record<string, unknown> = {}) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return localRequest<T>(action, payload);
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/participation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({ action, ...payload }),
  });

  const result = await response.json().catch(() => ({})) as ApiResponse<T>;
  if (!response.ok) throw new Error(result.error ?? 'No se ha podido completar la solicitud.');

  return result.data as T;
}

export function setStatus(element: HTMLElement, message: string, type: 'success' | 'error' | 'info' = 'info') {
  element.hidden = false;
  element.dataset.type = type;
  element.textContent = message;
}
