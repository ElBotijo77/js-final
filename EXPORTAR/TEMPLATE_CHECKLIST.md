# Template Checklist (Copiar a otro proyecto)

Usa esta lista cada vez que quieras replicar el modelo.

## 1) Inicializacion

- [ ] Crear proyecto Next + TypeScript.
- [ ] Instalar `drizzle-orm`, `drizzle-kit`, `pg`, `dotenv`.
- [ ] Configurar `DATABASE_URL` en `.env`.
- [ ] Definir alias de imports (`@/*`) en `tsconfig`.

## 2) Estructura minima

- [ ] Crear `database/index.ts`.
- [ ] Crear `database/schemas/`.
- [ ] Crear `database/repositories/`.
- [ ] Crear `database/migrations/`.
- [ ] Crear `database/fixtures/` y `database/seed.ts`.
- [ ] Crear `lib/auth.ts` si hay autenticacion.

## 3) Dominio de datos

- [ ] Listar entidades principales (3-6 para MVP).
- [ ] Definir foreign keys minimas.
- [ ] Crear tablas en schema.
- [ ] Generar primera migracion.

## 4) Reglas de negocio

- [ ] Implementar metodos en repositorio por caso de uso real.
- [ ] Evitar logica de negocio en componentes.
- [ ] Exponer metodos por API route o server actions.

## 5) Datos de ejemplo

- [ ] Crear fixtures YAML/JSON.
- [ ] Crear loader de fixtures.
- [ ] Crear seed en orden correcto de insercion.
- [ ] Ejecutar seed y validar datos.

## 6) Validacion y pruebas

- [ ] Probar flujos felices y errores.
- [ ] Agregar tests minimos de repository/API.
- [ ] Confirmar que no hay errores de TypeScript.
- [ ] Confirmar que migraciones son reproducibles.

## 7) Checklist final antes de entregar

- [ ] README con como correr proyecto.
- [ ] README con modelo de datos.
- [ ] Variables de entorno documentadas.
- [ ] Sin secretos hardcodeados.
