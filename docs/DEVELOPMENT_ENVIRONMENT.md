# Development Environment Foundation

This document defines the local M4 Database Runtime bootstrap path for new developers.

## Scope

Allowed in this stage:

- Docker Compose MySQL runtime
- Local environment configuration
- Structural Prisma and migration validation
- Preparation for controlled database execution

Not allowed in this stage:

- Auth, RBAC, CMS, Lead, Dealer, Analytics, API, Admin UI
- Business tables or schema expansion beyond the current Prisma baseline

## Prerequisites

- Node.js and npm
- Docker with Docker Compose

## Bootstrap

From the repository root:

```powershell
cd website
npm install
Copy-Item -LiteralPath .env.example -Destination .env
cd ..
docker compose --env-file website/.env up -d mysql
docker compose ps
```

The MySQL service is ready when `labor-saving-mysql` is healthy.

Then run the structural preflight:

```powershell
cd website
npm run prisma:generate
$env:DATABASE_URL="mysql://labor_saving:labor_saving_dev_password@localhost:3306/labor_saving_channel_growth"
npm run db:acceptance:preflight
```

Run `npm run dev` only after controlled database acceptance succeeds and the environment is approved for runtime use.

## Runtime Configuration

Local configuration lives in `website/.env`.

`website/.env.example` provides the local MySQL values used by `docker-compose.yml`:

```text
DATABASE_URL=mysql://labor_saving:labor_saving_dev_password@localhost:3306/labor_saving_channel_growth
```

Do not commit `website/.env`.

## Database Acceptance

`npm run db:acceptance:preflight` runs structural validation only:

1. `npm run db:validate`

It does not connect to a database, run migrations, or grant execution approval.

`npm run db:acceptance` is the controlled execution acceptance sequence, and is not part of structural validation:

1. `npm run db:validate`
2. `npm run db:migrate`
3. `npm run db:migrate:status`
4. `npm run db:health`
5. `npm run db:tx-smoke`

Acceptance passes only when the configured MySQL runtime is reachable, migrations have been applied, a `SELECT 1` health check succeeds, and a transaction smoke test succeeds.

Structural validation PASS does not equal execution authorization.

## Validation Layers

### Structural Validation

`npm run db:validate` and `npm run db:acceptance:preflight` validate the repository, Prisma materialization, migration shape, and runtime abstractions without connecting to a database or executing migrations.

### Live Read-only Validation

`npm run db:migrate:status`, `npm run db:health`, and `npm run db:tx-smoke` require an explicitly approved target `DATABASE_URL` and live-validation authorization.

### Controlled Execution Acceptance

`npm run db:acceptance` includes `db:migrate` and requires explicit human execution authorization, backup evidence, rollback readiness, target environment approval, and permission approval.

## Migration Execution Governance

Migration execution follows Freeze First, Validate Second, Execute Last.

`DATABASE_URL` must be provided explicitly for migration execution. Do not rely on implicit `.env` loading for `npm run db:acceptance`.

```powershell
cd website
$env:DATABASE_URL="mysql://labor_saving:labor_saving_dev_password@localhost:3306/labor_saving_channel_growth"
npm run db:acceptance
```

### Backup Policy

- Create a backup before migration execution against any non-empty database.
- Name the artifact as `labor-saving-<environment>-m4.0.4.3.1-pre-migration-<YYYYMMDD-HHMMSS>-<operator>.sql`.
- Store local artifacts outside Git; store staging and production artifacts in approved operations storage.
- Verify the file exists and is greater than zero bytes before proceeding.

Backup command:

```powershell
mysqldump --single-transaction --routines --triggers --set-gtid-purged=OFF --result-file "<backup-artifact>.sql" "<database_name>"
```

### Rollback Governance

- Stop immediately when migration execution fails.
- Inspect migration status only; do not run seed, reset, or follow-up migration commands to force progress.
- Restore from the verified backup artifact, then run migration status, health check, and transaction smoke validation.
- Treat ambiguous migration status, failed restore validation, or missing backup evidence as stop conditions.

Restore command:

```powershell
mysql "<database_name>" < "<backup-artifact>.sql"
```

### Permission Boundary

- Local: Developer.
- Staging: Approved Operator.
- Production: Authorized Release Owner.

Validation PASS does not grant execution approval. Staging and production execution require explicit approval and release evidence.

## Local Recovery Boundary

Local destructive recovery is not part of normal migration acceptance. If a local database must be recreated, stop first and record the reason; do not use this against staging or production data.

```powershell
docker compose ps
npm run db:migrate:status
```

Staging and production recovery must follow Rollback Governance.
