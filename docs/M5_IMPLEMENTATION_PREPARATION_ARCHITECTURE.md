# M5 Implementation Preparation Architecture

Status: `PREPARATION BASELINE / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.4 Implementation Preparation Architecture Review`\
Review date: `2026-08-02`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

This document prepares future implementation boundaries. It does not authorize implementation.

- `Freeze First -> Validate Second -> Execute Last` remains mandatory.
- M3 Platform Foundation and its architecture, capability, module ownership, and ADR decisions remain complete and frozen.
- M5 security architecture is frozen at the governance level; its authorization, identity, data, Audit, privacy, and separation-of-duties boundaries remain binding.
- M4 Platform Runtime remains `LOCKED / BLOCKED / NOT AUTHORIZED`.
- No feature, runtime, API, Admin UI, database, Prisma, migration, authentication, authorization, permission, credential, deployment, staging, or production operation is performed by this document.
- A future implementation slice must return to the owning document, intake gate, evidence gate, and human authorization gate before execution.

## 1. Implementation Boundary Definition

The following areas describe what future runtime work may eventually implement, which owner governs it, and what is excluded from this preparation baseline.

| Future implementation area | Future purpose | Domain owner | Required dependencies | Not in scope for M5.4 |
| --- | --- | --- | --- | --- |
| Website frontend | Render approved public routes, localized content, forms, navigation, accessibility, and governed conversion entry points | Website / Platform Architecture owner; public facts remain with canonical content/entity owners | Approved route and content architecture, CMS outputs, Platform Assets, SEO/GEO acceptance, Lead intake contract, privacy/security review | New routes, invented claims, runtime deployment, form/API implementation, authentication UI, or changing canonical URL ownership |
| CMS capability | Maintain approved content entities, media references, workflow states, publication gates, import/export controls, and editorial evidence | CMS / Content System owner | Database foundation, Auth/RBAC, Media, Platform Assets, Security/Audit, SEO/GEO contracts | New content entity types or publication policy, database/schema work, CRUD/API/Admin UI, or bypassing owner approval |
| Lead management capability | Accept valid Lead intake, preserve identity/source/consent, deduplicate, assign, govern lifecycle, privacy, export, and CRM handoff | Lead Center owner | Website/CMS/SEO source context, Database, Authentication/Authorization, Security/Audit, CRM and Dealer handoff rules | Replacing frozen Lead lifecycle, CRM ownership, unapproved scoring/routing, unrestricted export, or runtime implementation |
| Dealer capability | Govern durable Dealer identity, classification, region/cooperation relationship, lifecycle, ownership, qualified Lead handoff, and review evidence | Dealer Center owner | Lead Center, Partner model, CRM workflow, Auth/RBAC scope, Security/Audit, Platform Assets | Automatic permission grants, commercial policy invention, tier thresholds, database work, or changing Dealer ownership |
| Partner capability | Coordinate public Partner Program content, Partner Lead intake, review queues, enablement, and controlled Dealer/CRM handoffs | Partner System / CMS for public facts; Lead Center for Partner Lead; Dealer Center for Dealer facts; CRM for activities | CMS, Website, Lead, Dealer, CRM, Auth/RBAC, Security/Audit, SEO/GEO | Creating a new canonical Partner identity/entity without intake, external portal implementation, contract/pricing decisions, or access entitlement from status |
| Analytics capability | Consume authorized, minimized attribution, conversion, Dealer, and operational events for measurement and review | Analytics / Platform Measurement Capability owner | Approved source-event contracts, Lead, Dealer, CRM, SEO/GEO, Auth/RBAC, Security/Audit, privacy | Becoming source-of-truth, unrestricted sensitive-data access, event collection runtime, dashboards/exports without approval, or rewriting business facts |
| Security runtime capability | Enforce approved Authentication, Authorization, scope/ownership, high-risk approval, Audit, privacy, access-review, and security-monitoring controls | Platform Runtime implementation owner under Authentication/RBAC and Security / Permission governance | Frozen M3 Auth/Security architecture, Database, evidence/authorization gates, Operations, Privacy/Compliance | Redesigning security architecture, changing roles/permissions, automatic privilege changes, credentials, live enforcement, or runtime activation in M5.4 |

### 1.1 Boundary Rules

- A capability may consume another domain's approved facts or events without acquiring ownership of those facts.
- Cross-domain handoff must identify source owner, target owner, allowed fields, purpose, authorization, Audit evidence, failure handling, and rollback/reconciliation expectations before implementation.
- Business relationship status, Lead state, CRM stage, Dealer tier, external claims, or Analytics scores must not silently create permission.
- Any new Platform Capability, canonical entity, route-family replacement, core data model, permission rule, privacy boundary, or runtime technology choice requires the Platform Module Intake Gate and Architecture Review/ADR discipline.

## 2. Domain Ownership Matrix

| Business function | Owning domain | Responsible future role | Boundary confirmation |
| --- | --- | --- | --- |
| Public route rendering and frontend composition | Website / Platform Architecture | Website frontend owner | Renders approved facts; does not become a content, Lead, permission, or analytics source of truth. |
| Content lifecycle and publication | CMS / Content System | CMS owner and approved editorial reviewers | Owns content workflow and publication evidence; does not own business facts owned by Product, Platform Assets, Partner, or other modules. |
| Media metadata and asset lifecycle | Media Management | Media owner | Owns asset lifecycle and references; does not own content meaning or public factual approval. |
| Company, Brand, contact, downloads, and system assets | Platform Assets | Platform Assets owner | Owns canonical platform facts and public assets; consumers cannot independently rewrite them. |
| Lead identity, source, consent/privacy, lifecycle, assignment, export, and CRM input | Lead Center | Lead owner and authorized Lead reviewers | Canonical Lead source; CRM and Dealer consume governed handoffs only. |
| Dealer identity, lifecycle, region/cooperation, ownership, and Dealer Lead assignment | Dealer Center | Dealer owner and authorized Dealer reviewers | Canonical Dealer source; Dealer is not a User and does not grant permission automatically. |
| Partner Program proposition and public cooperation content | Partner System / CMS | Partner content owner | Public acquisition/content responsibility; does not create Partner user access or replace Dealer ownership. |
| CRM activities, tasks, communications, opportunities, and outcomes | CRM future operating capability | CRM owner and accountable activity owners | Operational layer; does not own Lead, Dealer, Customer, identity, permission, or public facts. |
| SEO/GEO route, metadata, relationship, indexing, and factual discovery acceptance | SEO/GEO growth capability with CMS and entity owners | SEO/GEO owner and factual approvers | Consumes approved facts; does not become CMS, Lead, Dealer, permission, or publication authority. |
| Measurement definitions and authorized event consumption | Analytics | Analytics owner | Read-only measurement consumer; cannot rewrite source facts or bypass privacy/security boundaries. |
| Security policy, high-risk actions, Privacy, Audit, Export, and access-review governance | Security / Permission | Security governance and Privacy/Audit reviewers | Governs requirements and evidence; does not implement runtime enforcement in this phase. |
| Authentication, Authorization, RBAC, and Session behavior | Authentication / Authorization | Auth/RBAC owner | Frozen M3 owner; implementation must conform rather than redesign. |
| Runtime integration and enforcement | M4 Platform Runtime | Platform Runtime owner under all canonical module owners | Future implementation boundary only; remains blocked and unauthorized. |

No function has overlapping canonical ownership in this matrix. Where a workflow crosses domains, the source owner remains authoritative and the receiving domain owns only its approved output or activity evidence.

## 3. Dependency Architecture Review

### 3.1 Foundation Dependencies

| Dependency | Required role in future implementation | Gate status for M5.4 |
| --- | --- | --- |
| Database foundation | Provides the approved structural persistence foundation and target/data ownership constraints | Repository foundation may be reviewed; live initialization, migration, connection, and write remain blocked. |
| Authentication foundation | Provides governed identity, login, Session, and future external-identity boundary | Frozen architecture is a prerequisite; runtime implementation remains separately gated. |
| Authorization foundation | Provides frozen RBAC, Resource/Action, Scope, Ownership, deny-by-default, and Audit integration rules | Governance baseline is frozen; permission implementation and grants are not authorized. |
| Content foundation | Provides CMS, Media, Platform Assets, entity truth, publication, and public-fact inputs | Owner documents and source facts must be approved before frontend or SEO outputs. |
| Lead foundation | Provides canonical Lead identity, attribution, privacy, lifecycle, assignment, export, and handoff rules | Frozen Lead boundary is prerequisite; runtime Lead processing is not authorized. |

### 3.2 Business Dependencies

| Dependency | Consumed by | Required boundary |
| --- | --- | --- |
| Website/CMS to Lead intake | Lead, CRM, Dealer, Analytics | Only accepted, privacy-governed intake creates a Lead; traffic does not. |
| Partner workflow to Dealer qualification | Dealer, CRM, Analytics | Partner Lead and review evidence may propose handoff; Dealer Center accepts canonical Dealer decisions. |
| Lead to CRM workflow | CRM, Dealer, Analytics | CRM consumes authorized Lead context and activities; it cannot rewrite Lead identity or lifecycle. |
| Dealer to CRM workflow | CRM, Analytics | CRM records relationship activities; Dealer Center remains owner of Dealer facts and lifecycle. |
| SEO/GEO to public acquisition | Website, Lead, Analytics | SEO/GEO supplies approved source context and routes; it does not own Lead or public factual truth. |
| Authorized events to Analytics | Analytics, Operations, Security review | Events are minimized, authorized, traceable, and read-only to Analytics. |
| Security/Audit across all capabilities | Every future runtime slice | Every sensitive operation must carry identity, authorization, purpose, Audit, privacy, and failure evidence. |

### 3.3 Dependency Order

```text
Frozen M3 architecture and owner documents
-> Repository/static governance validation
-> Structural Database foundation review
-> Authentication and Authorization/RBAC readiness
-> Content foundation: CMS / Media / Platform Assets
-> Lead foundation and governed intake
-> Dealer / Partner / CRM business workflows
-> SEO/GEO public discovery and acquisition
-> Analytics authorized measurement
-> Operational monitoring, incident, backup/recovery, and release evidence
-> M4 Runtime implementation review and separate authorization
```

This order is a recommendation for future planning. It does not start, unlock, or authorize any step.

## 4. Implementation Sequence Recommendation

### Phase 1: Foundation Readiness

Confirm owner documents, source facts, structural validation, environment boundaries, security controls, test/evidence plans, rollback expectations, and human authority. Resolve any architecture drift before implementation intake.

Exit condition: all required owners and dependencies are named, the target/component boundary is explicit, and no execution-sensitive gate is missing.

### Phase 2: Core Business Capability

Prepare implementation slices in the frozen ownership order: CMS/Media/Platform Assets, then Lead, followed by approved Partner/Dealer/CRM handoffs. Each slice must preserve canonical identity, lifecycle, ownership, privacy, Authorization, and Audit boundaries.

Exit condition: each slice has independent acceptance, rollback/reconciliation, evidence, and review approval.

### Phase 3: Growth Capability

Prepare Website frontend and SEO/GEO outputs from approved CMS/entity facts, preserving canonical routes, `/partner/` as the primary Partner route, factual publication gates, and Lead source attribution. Prepare Analytics consumption only after event ownership and privacy contracts are approved.

Exit condition: public outputs have factual owners, publication/indexing gates, privacy review, and no unsupported claims or operational-data exposure.

### Phase 4: Operational Capability

Prepare monitoring, logging, Audit review, incident response, backup/restore evidence, access reviews, release controls, and rollback/recovery procedures. Operational readiness remains evidence-based and separate from runtime authorization.

Exit condition: named operational owners, severity/escalation rules, backup/restore proof requirements, privacy controls, and failure/stop procedures are approved.

### Phase 5: Optimization

Only after stable, authorized operation may future review consider performance, search/indexing refinement, workflow optimization, measurement improvements, or suggestion-only automation. Optimization cannot alter canonical ownership, permission boundaries, or frozen architecture without review.

Exit condition: a separately approved change proposal, evidence, rollback, and owner accountability exist for each optimization.

## 5. Runtime Entry Conditions

No future runtime slice may leave preparation until all applicable conditions below are satisfied:

- Architecture Review approval for the slice and confirmation that no frozen boundary is being redesigned.
- Owning domain, responsible role, source-of-truth inputs, receiving outputs, and cross-domain handoff are explicitly confirmed.
- Security/RBAC review confirms Resource, Action, Scope, Ownership, least privilege, separation of duties, and high-risk approval requirements.
- Authentication, external identity, privacy, and Audit requirements are mapped without creating credentials or permissions during preparation.
- Database, environment, target, backup, rollback, validation, and failure procedure evidence is complete for the authorized operation.
- Runtime authorization is explicit, target-bound, operator-bound, time-bound, and separate from general readiness or Architecture approval.
- External M4 evidence remains valid; A-F evidence instances and Authorization Record v2 requirements are satisfied before controlled execution is considered.
- Test, monitoring, incident, reconciliation, release, and post-release review owners are named.
- No unresolved ownership ambiguity, permission leakage, unsupported public claim, missing evidence, missing rollback, or missing stop condition remains.

Missing any required condition means `NOT READY / BLOCKED / NOT AUTHORIZED`.

## 6. Risk Boundary Review

| Risk | Governance mitigation |
| --- | --- |
| Scope expansion | Apply Platform Module Intake Gate; stop for Architecture Review and ADR before adding a capability, entity, route family, or contract. |
| Permission leakage | Reuse frozen Auth/RBAC; deny by default; separate Dealer/Partner contexts; require explicit scope, ownership, approval, and Audit. |
| Domain coupling | Keep canonical source ownership; define narrow handoff contracts; prohibit receiving domains from rewriting source facts. |
| Premature runtime activation | Retain `LOCKED / BLOCKED / NOT AUTHORIZED`; separate documentation validation, readiness, live validation, and controlled execution. |
| Ownership ambiguity | Name source and receiving owners, decision authority, escalation path, and evidence owner before implementation intake. |
| Unsupported public claims | Require verified source facts, limitation-aware content, publication approval, and SEO/GEO factual review. |
| Sensitive-data exposure | Classify data, minimize fields, restrict audience/purpose, review exports/logs/backups/Analytics, and fail closed when uncertain. |
| Irreversible or high-risk operation | Require target, operator, approval, backup, rollback, validation, stop conditions, and immutable evidence before any human execution gate. |
| Worktree contamination | Preserve unrelated user changes; use exact future staging allowlists only after explicit Git authorization. |

## 7. Preparation Acceptance Summary

| Acceptance criterion | Result |
| --- | --- |
| M3 frozen architecture preserved | `PASS` |
| M4 remains `LOCKED / BLOCKED / NOT AUTHORIZED` | `PASS` |
| M5 security freeze preserved | `PASS` |
| Implementation boundaries documented | `PASS` |
| Ownership boundaries documented | `PASS` |
| Dependencies documented | `PASS` |
| No execution introduced | `PASS` |
| Governance validation | `PASS` |

Required validation command:

```text
node scripts/validate-website-governance.mjs
```

Passing this command confirms repository structure only. It does not authorize runtime, database, credential, permission, deployment, or production operations.

## 8. Final Governance State

```text
M5.4 Implementation Preparation Architecture: PREPARATION BASELINE
M3 Platform Foundation: COMPLETE / FROZEN
M5 Security Architecture: FROZEN
M4 Platform Runtime: LOCKED / BLOCKED / NOT AUTHORIZED
Implementation: NOT AUTHORIZED
Execution: NOT AUTHORIZED
Architecture Review Approval: REQUIRED
```

This document is a preparation baseline awaiting Architecture Review approval. Future implementation must conform to the documented boundaries and must pass its own small-slice intake, evidence, authorization, validation, and rollback gates.
