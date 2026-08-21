#Web realizada por David Yanes Sanz y diseñada por Hugo Burgos Fernández

# Fiestas del Real Sitio de El Pardo

Web pública creada con Astro y Tailwind CSS. El contenido del programa se sirve de forma estática y la participación ciudadana se procesa con Supabase Edge Functions.

## Desarrollo

```powershell
pnpm install
pnpm dev
```

La comprobación completa se ejecuta con `pnpm build`.

## Activar participación ciudadana

Sin configuración externa, las tres pantallas son utilizables en modo local: votos, propuestas e incidencias se guardan en el navegador del visitante. Es ideal para revisar la experiencia, pero no centraliza los datos ni permite que el equipo municipal los consulte.

Para que almacenen votos, ideas e incidencias de usuarios reales en una bandeja común hay que enlazarlos a un proyecto de Supabase y a Cloudflare Turnstile.

1. Crea un proyecto de Supabase y aplica, en este orden, las dos migraciones de `supabase/migrations/`: `20260821130000_participation.sql` y `20260821140000_multistep_survey.sql`. Puedes ejecutarlas en el SQL Editor o con `supabase db push` si usas la CLI.
2. Crea un widget de Cloudflare Turnstile para el dominio definitivo de la web.
3. Duplica `.env.example` como `.env` y rellena `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` y `PUBLIC_TURNSTILE_SITE_KEY`.
4. Configura los secretos de la función. Sustituye el dominio por el definitivo, sin barra final:

```powershell
supabase secrets set TURNSTILE_SECRET_KEY=tu-secreto-turnstile
supabase secrets set ALLOWED_ORIGINS=https://tu-proyecto.pages.dev,https://fiestas.fuencarral-el-pardo.es
```

5. Publica la función:

```powershell
supabase functions deploy participation --no-verify-jwt
```

La función valida todos los campos, verifica el captcha en el servidor y nunca expone la clave de servicio. Las tablas de votos, propuestas e incidencias tienen Row Level Security activado; solo la función puede escribir en ellas.

Antes de subir el frontend a producción, configura esas tres variables públicas en el proveedor de hosting y vuelve a ejecutar `pnpm build`. No publiques nunca `TURNSTILE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY` ni la contraseña de la base de datos en `.env`, Git o el frontend.

## Gestión del contenido

- Para crear o cerrar una encuesta, modifica `surveys`, sus preguntas en `survey_questions` y las opciones en `survey_question_options` desde el panel de Supabase.
- Las propuestas se revisan en la tabla `ideas` y las incidencias en `incidents`, actualizando su campo `status`.
- No se recogen datos personales salvo el correo opcional que un usuario introduzca para recibir respuesta.
