# M4 Runtime Source Delivery Gate Report

## Current State

- Repository: `LABOR-SAVING Channel Growth Platform`
- Reviewed HEAD: `af3dcd1`
- Branch: `main`
- Gate: `M4 Runtime Source Delivery Boundary Gate`
- Runtime state: `FROZEN`
- Review mode: repository inspection, architecture validation, and delivery boundary decision only
- Execution state: no staging, commit, push, Prisma generation, migration, database connection, health check, transaction smoke test, or acceptance test is authorized by this report

The repository marks M4.0 Database Runtime Foundation as completed, but ten required runtime source files under `website/` remain untracked and absent from both `HEAD` and `origin/main`. The tracked M4.0.5.3 validation boundary explicitly requires these files. This is a source-delivery closure gap, not a new M4.0.6 implementation scope.

## Missing Runtime Source

The complete non-ignored, untracked inventory under `website/` is:

| Path | Classification | Delivery role |
| --- | --- | --- |
| `website/prisma.config.ts` | Prisma source configuration | Locates the schema and migrations; reads `DATABASE_URL` from the process environment |
| `website/prisma/schema.prisma` | ORM schema source | Defines the reviewed 30-model M4.0.4 materialization and generated-client output |
| `website/prisma/migrations/0001_database_runtime_bootstrap/migration.sql` | Versioned migration source | M4.0.1 table-free baseline |
| `website/prisma/migrations/0002_database_core_materialization/migration.sql` | Versioned migration source | M4.0.4 core database materialization |
| `website/prisma/migrations/0003_auth_persistence_materialization/migration.sql` | Versioned migration source | Approved auth persistence materialization |
| `website/lib/database/access.ts` | Runtime source | Connection, transaction, and client access boundary |
| `website/lib/database/errors.ts` | Runtime source | Database runtime error normalization |
| `website/lib/database/index.ts` | Runtime source | Public database runtime exports |
| `website/lib/database/repository.ts` | Runtime source | Generic repository base class |
| `website/lib/database-health.ts` | Runtime source | Database health implementation consumed by the controlled runtime scripts |

`website/lib/prisma.ts` is already tracked and clean at HEAD. It is not missing source and does not need staging.

Ignored local inventory was also reviewed:

| Path/category | Observed inventory | Classification |
| --- | ---: | --- |
| `website/generated/prisma/**` | 38 files | Generated Prisma Client; reproducible artifact; never commit |
| `website/.env` | 1 file | Local configuration and possible secret material; never commit |
| `website/.next/**` | 835 files | Next.js build/cache output; never commit |
| `website/node_modules/**` | 31,093 files | Installed dependencies; never commit |
| `website/tsconfig.tsbuildinfo` | 1 file | TypeScript incremental cache; never commit |
| `website/next-env.d.ts` | 1 file | Framework-generated local file under the current ignore policy |
| `website/app/favicon.ico` | 1 file | Ignored temporary scaffold residue under the current repository policy |

No additional non-ignored untracked files exist under `website/`. `website/.env.example` is a pre-existing modified tracked file and is outside this gate.

## Ownership

| Source boundary | Ownership decision |
| --- | --- |
| `website/prisma/schema.prisma` | M4.0.4 Database Runtime Materialization |
| `website/prisma/migrations/0001_*` | M4.0.1 Database Runtime Bootstrap source |
| `website/prisma/migrations/0002_*` and `0003_*` | M4.0.4 materialization source; tracking does not authorize execution |
| `website/lib/database/access.ts`, `errors.ts`, `index.ts`, `repository.ts` | M4.0.2 Database Repository Foundation |
| `website/lib/database-health.ts` | M4 Runtime Foundation dependency consumed by M4.0.5.3 |
| `website/prisma.config.ts` | M4 database runtime configuration required to reproduce M4.0.4 source and M4.0.5.3 validation |
| `website/lib/prisma.ts` | Already delivered by M4.0.5.3 |

None of these files is reclassified as M4.0.6 implementation. The frozen Platform Architecture and accepted ADR boundaries remain unchanged.

## Git Delivery Boundary

### ALLOW

Only the following paths are approved for a future exact staging operation:

```text
docs/runtime/M4_RUNTIME_SOURCE_DELIVERY_GATE_REPORT.md
website/prisma.config.ts
website/prisma/schema.prisma
website/prisma/migrations/0001_database_runtime_bootstrap/migration.sql
website/prisma/migrations/0002_database_core_materialization/migration.sql
website/prisma/migrations/0003_auth_persistence_materialization/migration.sql
website/lib/database/access.ts
website/lib/database/errors.ts
website/lib/database/index.ts
website/lib/database/repository.ts
website/lib/database-health.ts
```

The report is governance evidence; the other ten paths are the exact runtime source-delivery closure. `website/lib/prisma.ts` is already tracked and has no pending change.

### DENY

The following paths and categories must not be staged by this gate:

```text
website/generated/prisma/**
website/.env
website/.next/**
website/node_modules/**
website/tsconfig.tsbuildinfo
website/next-env.d.ts
website/app/favicon.ico
website/.env.example
```

Reasons: generated artifacts, local configuration/secrets, dependency installations, build/cache output, temporary scaffold residue, or a pre-existing tracked modification outside this gate. Every repository path not explicitly listed under ALLOW is also outside this gate. A future staging action must use the exact allowlist and must not use `git add .`.

## CI Dependency Boundary

The reproducible source chain is:

```text
prisma.config.ts
        |
schema.prisma
        |
        v
prisma generate
        |
        v
website/generated/prisma/client.ts and generated model files
        |
        +--------------------------+
        |                          |
        v                          v
website/lib/prisma.ts      website/lib/database/access.ts
        |                          |
        +------------+-------------+
                     v
        website/lib/database/**
                     |
          +----------+----------+
          |                     |
          v                     v
database-health.ts     transaction/runtime consumers
```

The source boundary is complete only when:

1. Prisma configuration, schema, reviewed migrations, and database runtime modules are tracked.
2. The generated client remains ignored and is recreated from the tracked schema in every clean CI checkout.
3. TypeScript runs only after client generation.

The current `.github/workflows/ci.yml` runs `npm ci` and then immediately runs `npm run typecheck`. Because `tsconfig.json` includes all TypeScript sources and tracked runtime files import `../generated/prisma/client`, Typecheck cannot be reproducible in a clean checkout without generation.

CI therefore requires a non-database generation step after `npm ci` and before Typecheck:

```text
npm ci
npm run prisma:generate
npm run typecheck
npm run lint
npm run build
```

The future CI repair boundary is limited to `.github/workflows/ci.yml`. It must invoke the existing `prisma:generate` package script and must not commit generated output. Prisma Client generation is a source-generation step; it must not be coupled to migration deploy, database connectivity, health checks, transaction smoke tests, or acceptance.

## Security Impact

- No hard-coded database URL, password assignment, API key, or secret assignment pattern was found in the ten source-delivery candidates.
- `prisma.config.ts` obtains `DATABASE_URL` from the process environment and contains no credential value.
- The local `website/.env` exists, is ignored, was not read for values, and is explicitly denied from delivery.
- Generated Prisma Client output remains denied to prevent environment-specific or stale generated artifacts from entering Git.
- Tracking repository and health primitives makes runtime code available in clean checkouts, but does not itself grant credentials, network access, operator authority, or database privileges.

## Migration Impact

- The three migration SQL files contain schema DDL and no `INSERT`, `UPDATE`, `DELETE`, `REPLACE`, or `LOAD DATA` statements.
- Tracking the reviewed migration files restores versioned source completeness and the validator's required migration order.
- Source delivery does not run or authorize `prisma migrate deploy`, migration status, database provisioning, migration-user provisioning, seed, reset, health, transaction smoke, or acceptance.
- M4.0.4.4 Database Migration Execution and M4.0.4.4.6.10 Migration User Provisioning remain blocked and not authorized.

## Approval Decision

**Decision: PASS FOR CONTROLLED SOURCE DELIVERY, EXECUTION NOT AUTHORIZED.**

The eleven-path ALLOW list is approved as the exact future staging boundary: one gate report plus ten missing runtime source files. This closes previously approved M4.0.1/M4.0.2/M4.0.4 source delivery dependencies consumed by M4.0.5.3; it does not create M4.0.6 capability and does not modify frozen architecture.

CI reproducibility repair is also approved in principle with a separate, minimal implementation boundary: modify only `.github/workflows/ci.yml` to run the existing `npm run prisma:generate` after dependency installation and before Typecheck. That CI edit is not performed or included in the current source staging allowlist.

Any staging, commit, push, CI modification, Prisma generation, or database-related execution requires a subsequent explicitly authorized implementation step.
