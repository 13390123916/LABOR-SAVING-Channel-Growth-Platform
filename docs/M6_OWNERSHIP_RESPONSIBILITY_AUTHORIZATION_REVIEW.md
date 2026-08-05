# M6.2 Ownership & Responsibility Authorization Review

Status: `PREPARATION REVIEW / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M6 Authorization Review Phase`\
Review date: `2026-08-05`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 1. Purpose and Boundary

This review assesses ownership and responsibility readiness for a later Implementation Authorization Decision. It is documentation-only governance work.

It records canonical domain boundaries and required role assignments without inventing real owners, creating teams, changing permissions, or authorizing implementation. M3 and M5 architecture baselines remain frozen.

Inherited state:

```text
M3 Platform Foundation: COMPLETE / FROZEN
M5 Preparation Phase: COMPLETE / FROZEN
M6.0 Authorization Readiness: READY FOR ARCHITECTURE REVIEW
M6.1 Evidence Framework: COMPLETE / PREPARATION ONLY
Implementation Authorization: PENDING
M4 Platform Runtime: LOCKED / BLOCKED / NOT AUTHORIZED
```

## 2. Status Classification

| Status | Meaning |
| --- | --- |
| `READY` | Canonical boundary and accountable role are accepted for the exact slice, with approval and escalation paths confirmed. |
| `PENDING` | Boundary is defined, but a named accountable role or approval acceptance is not yet confirmed. |
| `BLOCKED` | Missing ownership or authority prevents safe validation, operation, recovery, or authorization. |
| `NOT APPLICABLE` | An approved slice-specific review formally excludes the responsibility. No exclusion is inferred here. |

No row is currently `READY`; no row is marked `NOT APPLICABLE`.

## 3. Domain Ownership Matrix

| Domain | Responsibility scope | Expected owner role | Approval responsibility | Current status |
| --- | --- | --- | --- | --- |
| Business Domain | Business priorities, acceptance criteria, commercial risk, customer/partner impact, and business communication | Business Owner for the approved slice | Business approver accepts scope, outcomes, risk, and release criteria | `PENDING` |
| Growth Domain | Partner proposition, product/industry/content growth inputs, acquisition funnel, attribution, and CN-first SEO/GEO outcomes | Growth/Marketing Owner with canonical CMS, Lead, Dealer, and Analytics owners | Growth approver plus affected canonical owners approve facts, claims, and acceptance criteria | `PENDING` |
| Operational Domain | Environment readiness, monitoring, incident response, maintenance window, backup/recovery, rollback, and stop conditions | Operations Owner / Recovery Owner (to be named) | Operations approver and affected Business/Security owners | `BLOCKED` |
| Security Domain | Identity boundary, RBAC governance, least privilege, privacy, Audit, export, exceptions, and security incidents | Security Architecture / Security Operations Owner (to be named) | Security approver independent of requester/operator where required | `PENDING` |
| Technical Domain | Architecture conformance, implementation scope, dependencies, source/configuration integrity, validation, and change control | Technical Lead / Application Owner (to be named) | Architecture Review and Technical approver | `PENDING` |
| Runtime Domain | Future execution of approved Website, CMS, Lead, Dealer, Analytics, SEO/GEO, API, and Admin UI slices within M4 | Runtime Operator / Service Owner (to be named) | Explicit human execution authority for exact target, command/change, window, and expiry | `BLOCKED` |

Canonical module ownership remains the source of truth; this table does not create a new Platform Module.

## 4. Capability Ownership Review

| Capability | Primary ownership | Supporting ownership | Approval authority | Escalation path | Status |
| --- | --- | --- | --- | --- | --- |
| Website Frontend | Website/Runtime owner under Platform Architecture | CMS, Media, Platform Assets, SEO/GEO, Lead Center | Architecture + Technical + affected Business owner | Technical -> Architecture -> Operations/Security for release risk | `PENDING` |
| CMS | CMS System | Media, Platform Assets, SEO/GEO, Security/Audit | CMS content approver; SEO/GEO or release approver for public output | CMS owner -> Architecture -> Security for high-risk publish | `PENDING` |
| Lead Center | Lead Center | CRM, Dealer Center, Analytics, Auth/RBAC, Security/Audit | Lead owner/approver; Business owner for material lifecycle or privacy impact | Lead owner -> Security/Privacy -> Business owner | `PENDING` |
| Dealer Center | Dealer Center | Lead Center, Partner Program/CMS, CRM, Analytics, Auth/RBAC, Security/Audit | Dealer owner/approver; Business owner for region/cooperation status | Dealer owner -> Business owner -> Security/Architecture for boundary risk | `PENDING` |
| Partner Center | No new canonical module; public Partner proposition is Partner System/CMS, Partner Lead is Lead Center, Dealer facts are Dealer Center | CRM, Analytics, Platform Assets, Auth/RBAC, Security/Audit | Affected canonical owner(s); Business approver for proposition/policy | Partner/CMS -> Lead or Dealer owner -> Business/Architecture | `PENDING` |
| Analytics | Analytics | Lead, Dealer, CMS, Platform Assets, SEO/GEO, Security/Audit | Analytics definition owner; Business owner for metric acceptance; Security for sensitive access/export | Analytics -> Security/Privacy -> Business owner | `PENDING` |
| SEO/GEO | SEO/GEO capability consumes approved facts; canonical facts remain with CMS, Product, Industry, Platform Assets, Lead, and other owners | CMS, Media, Platform Assets, Product/Industry owners, Lead Center | SEO/GEO approver plus each factual owner; release authority for publication | SEO/GEO -> factual owner -> Security/Architecture for boundary conflict | `PENDING` |
| Security Runtime | M4 Runtime implementation under Authentication/RBAC and Security/Permission governance | Operations, Audit, Privacy, Database, affected module owners | Security approver and Architecture Review; execution authority remains separate | Security Operations -> Architecture -> incident/business authority | `BLOCKED` |

The capability review does not authorize runtime implementation or assign personnel.

## 5. Business Ownership Gap Review

The following role-level gaps must be resolved before a slice can receive ownership approval:

| Gap | Required role confirmation | Why it blocks or delays authorization | Status |
| --- | --- | --- | --- |
| Dealer operational ownership | Dealer Operations Owner and backup | Needed for regional/cooperation workflow, assignment, escalation, and acceptance of Dealer changes | `PENDING` |
| Partner management ownership | Partner/Growth Owner with CMS and Lead/Dealer handoff authority | Prevents public proposition, Partner Lead, and Dealer facts from acquiring conflicting owners | `PENDING` |
| Content approval ownership | Content Owner, SEO/GEO reviewer, factual domain owner, and release approver | Public claims require fact ownership and separated publication approval | `PENDING` |
| Lead ownership | Lead Center Owner, Lead assignment authority, privacy reviewer, and CRM handoff owner | Lead identity, attribution, lifecycle, privacy, assignment, and export cannot be assumed by CRM or Dealer | `PENDING` |
| Customer data ownership | Business-approved Customer owner or explicit external system owner | Current M5 decision leaves Customer canonical ownership undecided; no implementation may infer it | `BLOCKED` |
| Business acceptance | Business Owner for the exact implementation slice | Technical completion cannot substitute for business acceptance or risk ownership | `PENDING` |

No individual, department, vendor, or external system is selected by this review.

## 6. Technical Ownership Review

Future responsibilities require role acceptance before implementation authorization:

| Responsibility | Required owner role | Required separation / approval | Status |
| --- | --- | --- | --- |
| Architecture conformance and boundary changes | Architecture Reviewer / Technical Lead | Architecture Review; ADR required for material boundary changes | `PENDING` |
| Application and source integrity | Application/Technical Owner | Independent review and repository governance validation | `PENDING` |
| Database and migration safety | Database Owner / Migration Operator | Database Governance, Security, Operations, backup/rollback, and explicit human authorization | `BLOCKED` |
| Authentication and authorization implementation | Authentication/RBAC Owner | Security approval; requester/operator/approver separation for high-risk changes | `BLOCKED` |
| Security and privacy controls | Security Architecture / Security Operations Owner | Independent Security approval and Audit/privacy acceptance | `PENDING` |
| Deployment and environment control | Operations/Release Owner | Environment owner approval, change window, rollback, monitoring, and expiry | `BLOCKED` |
| Runtime validation and evidence custody | Independent Verifier / Evidence Owner | Must not be the sole implementer or approver | `PENDING` |

This section defines accountability requirements only. It creates no runtime team or operating procedure.

## 7. Approval Authority and Separation of Duties

| Decision | Minimum approval authority | Separation requirement | Current state |
| --- | --- | --- | --- |
| Architecture changes | Architecture Review authority and affected canonical owner | Requester and final approver separated; ADR used when required | `PENDING` |
| Security changes | Security/Permission authority and affected owner | Security reviewer independent of implementation requester/operator | `PENDING` |
| Permission changes | Authentication/RBAC owner plus Security/Permission reviewer | No automatic role/permission grant; high-risk changes require explicit approval and Audit | `BLOCKED` |
| Data access changes | Canonical data owner plus Security/Privacy reviewer | Purpose, scope, minimum fields, audience, duration, and Audit must be accepted | `BLOCKED` |
| Runtime activation | Named human authorization authority for exact slice/target | Operator cannot self-approve; target, command, window, expiry, monitoring, and rollback bound | `BLOCKED` |
| Deployment | Operations/Release approver plus Technical and Security concurrence | Implementer, approver, and verifier separated where risk requires | `BLOCKED` |

General readiness, CI, administrator access, or architecture completion cannot substitute for these approvals.

## 8. Ownership Risk Review and Governance Mitigation

| Risk | Impact | Governance mitigation | Status |
| --- | --- | --- | --- |
| Undefined ownership | Work may proceed without accountable acceptance or recovery authority | Require role-level assignment and explicit acceptance before slice approval | `HIGH` |
| Conflicting ownership | Duplicate facts, inconsistent lifecycle decisions, and unauthorized handoffs | Preserve canonical owner matrix; route disputes to Architecture Review and affected owner | `HIGH` |
| Missing approval authority | Changes may be treated as approved without valid human authorization | Require named approver, scope, evidence, time window, and Audit record | `HIGH` |
| Operational responsibility gap | No accountable response for failure, rollback, monitoring, or incident communication | Name Operations, Recovery, Incident, and escalation roles before execution | `HIGH` |
| Customer ownership undecided | Customer data could be duplicated or assigned to CRM by inference | Keep Customer ownership `BLOCKED`; resolve through Architecture Review before implementation | `CRITICAL` |
| Security/runtime conflation | Frozen governance could be mistaken for implemented controls | Keep Security Runtime `BLOCKED`; require target-bound Security evidence | `CRITICAL` |
| SEO/GEO ownership drift | Search output could invent or publish facts outside canonical owners | Require factual owner, SEO/GEO reviewer, and release approver for public output | `HIGH` |

## 9. Authorization Impact

Ownership conclusion:

```text
Canonical domain boundaries: REVIEWED / PRESERVED
Capability ownership: DEFINED AT ROLE AND MODULE LEVEL
Execution-specific assignments: INCOMPLETE
Approval authority: DEFINED, NOT CONFIRMED FOR A NAMED SLICE
Ownership evidence: NOT READY
Controlled Implementation authorization: NOT GRANTED
M4 Platform Runtime: LOCKED / BLOCKED / NOT AUTHORIZED
```

M6.2 is ready for Architecture Review only. Approval of this document must not promote any status to `READY`, activate runtime work, or authorize database, migration, authentication, permission, deployment, or staging activity.

## 10. Governance Validation

Run from the repository root:

```text
node scripts/validate-website-governance.mjs
```

Passing confirms repository structure only. It does not confirm a real owner, approve an authority, prove an operational control, or authorize implementation.

Validation boundary:

```text
No code / runtime / database / Prisma / migration / API / authentication /
authorization / permission / credential / deployment / staging operation.
No Git mutation.
```

## 11. Review Handoff

```text
M6.2 Ownership & Responsibility Authorization Review: PREPARED
Architecture Review approval: PENDING
Implementation Authorization: PENDING / NOT GRANTED
Evidence instances: 0 / 6
```

Await Architecture Review approval before assigning execution ownership or discussing implementation work.

## 12. References

- `docs/M6_AUTHORIZATION_EVIDENCE_FRAMEWORK.md`
- `docs/M6_AUTHORIZATION_READINESS_REVIEW.md`
- `docs/M6_IMPLEMENTATION_AUTHORIZATION_DECISION.md`
- `docs/PLATFORM_ARCHITECTURE.md`
- `docs/SECURITY_PERMISSION.md`
- `docs/M5_DEALER_CHANNEL_ARCHITECTURE.md`
- `docs/M5_PARTNER_MANAGEMENT_MODEL.md`
- `docs/M5_LEAD_CRM_BOUNDARY_DECISION.md`
- `docs/M5_IMPLEMENTATION_PREPARATION_ARCHITECTURE.md`
