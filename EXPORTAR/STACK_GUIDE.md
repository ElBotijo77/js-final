# Stack Guide (Como se usa cada tecnologia)

## Next.js + React + TypeScript

- `app/` usa App Router para paginas y rutas API.
- Componentes en `app/business/components/` siguen composicion simple.
- TypeScript estricto para detectar errores temprano.

## Drizzle ORM + PostgreSQL

- Definicion de tablas en `database/schemas/`.
- Conexion central en `database/index.ts`.
- Consultas reutilizables en `database/repositories/`.
- Migraciones SQL versionadas en `database/migrations/`.

Uso practico:
- UI/API no consulta DB directo (preferir repository).
- Repository encapsula reglas y queries.
- Schema evoluciona por migraciones, no por cambios manuales en DB.

## Better Auth

- Configurado en `lib/auth.ts`.
- Usa adaptador Drizzle con tablas de `auth-schema`.
- Login/registro deben pasar por la capa de auth (no SQL manual para credenciales).

## Fixtures + Seed

- Fixtures YAML en `database/fixtures/`.
- Loader transforma YAML a arrays tipados.
- `seed.ts` inserta en orden para respetar foreign keys.
- Ideal para dev local, pruebas manuales y demos.

## Testing

- Unit/integration: Jest + Testing Library.
- E2E: Playwright.
- Regla util: toda feature de negocio nueva debe tener al menos 1 test de comportamiento.

## Criterios de calidad (equipo estudiante)

- Codigo legible antes que optimizacion prematura.
- Nombres claros en funciones y variables.
- Comentarios cortos solo cuando algo no sea obvio.
- Cambios pequeños y verificables.
