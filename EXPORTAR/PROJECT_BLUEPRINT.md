# Project Blueprint (Reusable)

## 1) Stack base

- Framework: Next.js (App Router) + React + TypeScript.
- DB: PostgreSQL + Drizzle ORM + Drizzle Kit.
- Auth: Better Auth con adaptador Drizzle.
- Estilos UI: Tailwind CSS + componentes React.
- Testing: Jest + Testing Library + Playwright (E2E).

## 2) Organizacion de carpetas (modelo)

- `app/`: rutas/paginas y API routes.
- `database/`: conexion, schemas, relations, repositories, migrations, fixtures y seed.
- `lib/`: integraciones transversales (auth, data helpers, clientes).
- `__tests__/`: pruebas unitarias/integracion de UI y rutas.
- `.cursor/rules/`: reglas persistentes para guiar al agente.

## 3) Capa de base de datos (filosofia)

- `database/index.ts`: unica instancia de conexion.
- `database/schemas/*.ts`: definicion de tablas (verdad del modelo).
- `database/schemas/*relations*.ts`: relaciones para consultas relacionales.
- `database/repositories/*.ts`: consultas y reglas de negocio (evitar SQL en UI).
- `database/migrations/*.sql`: historial de cambios del schema.
- `database/fixtures/*`: datos de ejemplo para desarrollo.
- `database/seed.ts`: carga inicial de datos en orden por dependencias.

## 4) Flujo recomendado para features nuevas

1. Crear/ajustar tabla en `schemas`.
2. Generar y aplicar migracion.
3. Crear repositorio con metodos necesarios.
4. Exponer uso desde API route o Server Component.
5. Agregar fixtures/seed si aporta al desarrollo local.
6. Agregar pruebas de comportamiento.

## 5) Convenciones que se deben repetir

- Alias `@/*` para imports absolutos.
- Tipado estricto (`strict: true`) y errores explicitos.
- Repositorios con nombres claros (`getX`, `createX`, `updateX`).
- Validar input en capa API antes de llamar repositorios.
- Evitar logica de negocio dentro de componentes de UI.

## 6) Plantilla portable a otro proyecto

Para reutilizar este blueprint en un proyecto nuevo:

1. Copiar este archivo.
2. Copiar la carpeta base `database/` (o `database-template-game/` como punto de partida).
3. Adaptar entidades del dominio.
4. Ajustar auth y endpoints.
5. Mantener la misma separacion por capas.
