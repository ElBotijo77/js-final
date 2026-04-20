# Estructura recomendada (mundo real)

```text
src/
  app/
    api/
      auth/login/route.ts
      auth/register/route.ts
      ranking/top/route.ts
      ranking/submit/route.ts
  server/
    db/
      client.ts
      schema/
        auth.ts
        ranking.ts
      repositories/
        auth.repository.ts
        ranking.repository.ts
      services/
        auth.service.ts
        ranking.service.ts
      fixtures/
        users.yaml
        scores.yaml
        load-fixtures.ts
      seed.ts
  shared/
    schemas/
      auth.schema.ts
      ranking.schema.ts
    types/
      api.ts
drizzle.config.ts
package.json
```

## Reglas de organizacion

- `app/api/*`: entrada HTTP (request/response).
- `shared/schemas/*`: validaciones de payload con Zod.
- `server/db/repositories/*`: acceso a base de datos.
- `server/db/services/*`: reglas de negocio.
- `server/db/schema/*`: definicion de tablas Drizzle.
