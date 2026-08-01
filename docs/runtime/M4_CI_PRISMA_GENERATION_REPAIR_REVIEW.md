# M4 CI Prisma Generation Repair Review

## Current State

- Repository: `LABOR-SAVING Channel Growth Platform`
- Baseline commit: `c31efb5f6dcc2300dbcc68df6f6e0551b39d9cd6`
- Review scope: CI reproducibility repair only
- Runtime source delivery: completed
- Migration and database execution: not authorized

The M4 Runtime Source Delivery commit tracks `website/prisma/schema.prisma` and the database runtime source, while `website/generated/prisma/**` remains intentionally ignored. A clean GitHub Actions checkout therefore contains the source schema but not the generated Prisma Client.

## Current CI Flow

The `website-check` job currently runs from `website/`:

```text
Checkout
-> Setup Node.js
-> npm ci
-> npm run typecheck
-> npm run lint
-> npm run build
```

No step recreates the ignored generated client before TypeScript compilation.

## Failure Mechanism

Tracked runtime source imports `../generated/prisma/client` or `../../generated/prisma/client`. TypeScript includes those sources during `npm run typecheck`.

Local development can appear valid when `website/generated/prisma/**` already exists from an earlier generation. GitHub Actions starts from a clean checkout, where that ignored directory is absent. Typecheck therefore reports that the generated Prisma Client module cannot be found.

This is a reproducibility ordering defect. It is not a missing frozen architecture decision, schema redesign requirement, migration failure, or database connectivity failure.

## Proposed Change

Insert one step in `.github/workflows/ci.yml` immediately after `Install dependencies` and before `Typecheck`:

```yaml
      - name: Generate Prisma Client
        run: npm run prisma:generate
```

The resulting `website-check` sequence is:

```text
Checkout
-> Setup Node.js
-> npm ci
-> npm run prisma:generate
-> npm run typecheck
-> npm run lint
-> npm run build
```

The change reuses the existing package script and does not add another generation command, dependency, environment file, cache, migration command, or database command.

## Security Impact

- No credential, secret, `DATABASE_URL`, or environment-specific value is added to the workflow.
- Prisma Client generation reads tracked source and writes an ignored build-time artifact inside the CI workspace.
- The step does not require database connectivity and does not grant database privileges.
- Local `.env` files remain ignored and are not uploaded or referenced by this change.
- The workflow continues to install dependencies from the committed npm lockfile before generation.

## Runtime Impact

- The change does not alter application runtime logic or introduce a new Platform Capability.
- It makes the existing M4 runtime source compilable from a clean checkout by recreating its generated TypeScript dependency.
- It does not execute the generated client, connect to MySQL, run a health check, start a transaction, or perform acceptance.
- It does not reclassify the repair as M4.0.6 implementation and does not modify frozen architecture or Owner documents.

## Migration Impact

- No Prisma migration command is added or executed.
- No migration SQL is staged, modified, or consumed by the new CI step.
- M4.0.4.4 Database Migration Execution and M4.0.4.4.6.10 Migration User Provisioning remain blocked and not authorized.

## Why Generated Client Remains Untracked

`website/generated/prisma/**` is deterministic output derived from the tracked Prisma schema and installed Prisma toolchain. Keeping it untracked:

- prevents stale generated code from diverging from `schema.prisma`;
- avoids platform- or tool-version-specific generated churn in Git;
- requires every clean CI checkout to prove generation reproducibility;
- preserves the source boundary: schema and runtime source are versioned, generated output is rebuilt.

The repository `.gitignore` already enforces this boundary with `website/generated/prisma/**`.

## Review Decision

**Decision: PASS FOR MINIMAL CI REPRODUCIBILITY REPAIR; COMMIT AND PUSH NOT AUTHORIZED.**

The approved repair boundary is limited to `.github/workflows/ci.yml` plus this review report. Prisma generation, migration, database, health, transaction, and acceptance commands were not run during this review.
