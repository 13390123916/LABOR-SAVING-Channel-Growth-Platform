# M5 Security Preparation Architecture

Document responsibility: prepare future security requirements while preserving the frozen Authentication, Authorization, Security / Permission, Audit, Privacy, and module-ownership architecture.

Status: `PREPARATION DRAFT / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.3 Security Preparation Architecture Review`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

This document applies `Freeze First -> Validate Second -> Execute Last`.

- `docs/AUTH_SYSTEM.md` remains the frozen owner of Authentication, Authorization, RBAC, Role, Permission, Resource, login, Session, and future SSO boundaries.
- `docs/SECURITY_PERMISSION.md` remains the frozen owner of platform security governance, high-risk actions, Audit coverage, Privacy, Export, Data Access, and Security Exception boundaries.
- Canonical business modules continue to own their business identities, facts, lifecycles, scopes, and ownership decisions.
- This document reviews future security preparation requirements. It does not replace, extend, or amend the frozen role matrix, permission model, security flow, or platform-module ownership.
- Any proposal that changes a frozen role, permission, resource, action, scope, identity flow, module boundary, or ADR must stop and return to Architecture Review and ADR discipline.
- This document creates no runtime code, schema, migration, ORM, API, middleware, authentication flow, credential, secret, role assignment, permission grant, Admin UI, monitoring operation, or production action.
- M4 Runtime remains `LOCKED / BLOCKED / NOT AUTHORIZED`. Preparation approval cannot authorize M4 or any execution-sensitive operation.

# 1. Security Preparation Objective

Security preparation is required to turn the frozen security architecture into reviewable future acceptance requirements before implementation is considered. It must expose unresolved ownership, trust, access, approval, evidence, privacy, automation, and incident-response questions without filling those gaps with runtime assumptions.

## 1.1 Relationship with Runtime

- M5.3 may define what a future runtime must prove; it may not implement or exercise the proof.
- Future runtime access must remain deny-by-default, least-privilege, attributable, scoped to the approved Resource and Action, and constrained by Ownership and Scope.
- Structural validation, preparation readiness, or Architecture Review approval is not live acceptance and is not runtime authorization.
- Runtime identity, permission, Audit, credential, database, and production operations require their own later design, evidence, validation, and explicit human authorization.

## 1.2 Relationship with Authentication

- Authentication answers who the current actor is.
- Authentication results must enter Authorization; successful authentication alone grants no business access.
- Login, Session, password, MFA, SSO, OAuth, OIDC, and external-identity protocol design remain owned by `docs/AUTH_SYSTEM.md` and future approved runtime work.
- External authentication must not bypass mapping to a governed platform identity and must not mix external portal access with internal administration access.

## 1.3 Relationship with Authorization

- Authorization decides whether an identified actor may perform an Action on a Resource under approved Role, Permission, Scope, and Ownership constraints.
- The frozen RBAC model remains the baseline. M5.3 does not add roles, permissions, resources, inheritance, or grants.
- High-risk actions require explicit authorization, accountable ownership, approval where required, and complete Audit evidence.
- UI visibility is not an authorization decision; any future enforcement must occur for every governed request or operation.

## 1.4 Relationship with Audit Governance

- Audit provides accountable evidence for authentication events, allowed backend writes, security events, high-risk actions, approvals, ownership changes, and permission changes.
- Audit evidence must be attributable, time-ordered, purpose-bound, access-controlled, protected from ordinary update/delete paths, and governed by approved retention rules.
- Audit does not authorize an action and does not replace prevention, approval, incident response, or canonical business ownership.
- Analytics may consume only authorized, minimized, redacted, pseudonymous, or aggregated security facts. It may not become a sensitive-data or Audit bypass.

# 2. Permission Model Review

## 2.1 Frozen Baseline

The frozen permission baseline is:

```text
Identity
-> Role
-> Permission
-> Resource + Action
-> Scope + Ownership
-> Authorization Decision
-> Audit
```

The frozen internal roles remain `Super Admin`, `Admin`, `Editor`, `SEO`, `Sales`, and `Partner Manager`. Their current matrix in `docs/AUTH_SYSTEM.md` is not repeated or modified here. Role hierarchy does not imply automatic permission inheritance; grants remain explicit. Authentication proves identity, while Authorization determines access.

Preparation result: `ALIGNED / NO FROZEN PERMISSION CHANGE PROPOSED`.

## 2.2 Internal User Roles

Future review must verify:

- Each internal role has a named business purpose and accountable owner.
- Access is limited to stable Resources, explicit Actions, necessary fields, approved Scope, and applicable Ownership.
- `Super Admin` remains a governance and emergency role rather than a routine operating identity.
- `limited`, `assigned`, `partner`, `own`, `department`, `region`, and `readonly` scopes receive precise future acceptance definitions before implementation.
- Temporary, delegated, emergency, inactive, transferred, and terminated access has explicit approval, expiry, revocation, and Audit requirements.
- Role and permission reviews identify unused, excessive, conflicting, orphaned, or stale access without changing it automatically.

## 2.3 Dealer Access Boundary

- A Dealer is a canonical channel business object, not a User, Role, Permission, or proof of identity.
- Dealer ownership, region, lifecycle, tier, cooperation state, performance, or Lead relationship must not automatically grant platform access.
- Any future Dealer user must be represented as an individual external identity linked to an approved Dealer relationship; the relationship does not replace Authentication or Authorization.
- Dealer access must be limited to approved Dealer-scoped resources and ownership/region boundaries. Internal User, Role, Permission, Setting, unrestricted Audit, unrelated Lead, unrelated Dealer, and unrestricted export access remain denied by default.
- Suspension, archive, ownership transfer, contract or relationship change, and access expiry require an approved synchronization and revocation policy before implementation.

## 2.4 Partner Access Boundary

- A public Partner applicant or Partner Lead is not an authenticated Partner user and receives no access entitlement from submission alone.
- `Partner Manager` is a frozen internal operating role; it must not be reused as an external Partner identity or external portal role.
- Any future Partner user requires an approved identity proof, sponsoring relationship, purpose, scope, expiry/review rule, and separate external access boundary.
- Partner access must not expose internal review, qualification, pricing, commercial, Dealer, Lead, CRM, permission, security, or Audit information unless a later owner-specific rule explicitly authorizes the exact purpose and scope.
- The boundary between Partner user and Dealer user remains an Architecture Review question; business classification must not drive automatic role assignment.

## 2.5 External Identity Boundary

- External identity providers may support future Authentication only; they cannot grant or alter platform Authorization.
- External claims, groups, organization membership, or upstream roles are untrusted for authorization until mapped through an approved, governed, and auditable platform process.
- Internal administration and external portal identities, sessions, audiences, recovery paths, and permissions must remain separated.
- Account linking, duplicate identity resolution, sponsor removal, organization change, provider outage, deprovisioning, and compromised external identity require fail-closed handling rules before implementation.
- No SSO protocol, identity provider, token format, credential flow, or account-linking mechanism is approved by this draft.

## 2.6 Administrative Roles

- User, Role, Permission, Setting, retention, Security Exception, emergency access, and other management actions remain highest-risk operations.
- Administrative access requires named accountability, least privilege, stronger authentication requirements to be approved, short review intervals to be approved, and complete Audit coverage.
- Shared administrator identities are prohibited by the frozen Authentication boundary.
- Routine content, SEO, sales, partner, or operational work must not use the highest-governance identity merely for convenience.
- Emergency or break-glass access, if required, needs separate Architecture and Security Review covering activation, scope, time limit, observation, revocation, evidence, and post-use review.

## 2.7 Separation of Duties

The following future conflicts require explicit review. This draft does not change the current permission matrix:

| High-risk area | Preparation requirement |
| --- | --- |
| User / Role / Permission | The requester, approver, and effective change actor must be attributable; self-approval and sole-person control require an approved exception policy. |
| Content / SEO / GEO publication | Drafting, factual review, approval, and publication responsibilities must be defined; the same-person exception, if allowed, requires scope and Audit rules. |
| Lead / Dealer export | Business request, privacy/purpose review, authorization, export generation, and receipt must be separable and traceable where risk requires. |
| Dealer lifecycle / ownership | Proposal, approval, effective transition, reassignment, suspension, and archive decisions require named authority and evidence. |
| Setting / retention / Security Exception | Request, risk review, approval, execution, and verification must not be silently collapsed into an unreviewed action. |
| Incident / recovery | Incident coordination does not grant unrestricted technical, data, credential, or recovery authority. |

# 3. Identity Boundary Architecture

These categories are preparation boundaries, not new database types, roles, accounts, or runtime identities.

| Identity category | Access purpose | Trust boundary | Ownership | Governance requirement |
| --- | --- | --- | --- | --- |
| Internal users | Perform approved administration, content, SEO/GEO, sales, partner, and governance work | Workforce identity is trusted only after Authentication; employment or team membership alone does not authorize access | Authentication owns identity; the relevant business owner sponsors purpose and scope; Security governs access requirements | Named individual identity, explicit RBAC, least privilege, scope/ownership checks, periodic review, lifecycle revocation, high-risk approval, and Audit |
| Dealer users | Future access to narrowly approved Dealer-scoped collaboration or assigned work | External organization boundary; Dealer business-object status is not identity proof or authorization | Authentication owns identity; Dealer Center owns Dealer relationship facts; the sponsoring owner approves business purpose | Separate external access boundary, verified relationship, Dealer/region/ownership scope, no internal-admin role reuse, expiry/review, revocation synchronization, privacy and Audit |
| Partner users | Future access to narrowly approved Partner collaboration before or outside Dealer status | External applicant/partner boundary; Partner application, Lead status, or cooperation interest grants no access | Authentication owns identity; Partner/Lead/Dealer owners own relationship facts at their respective stages | Explicit sponsorship, purpose limitation, separate external role design subject to review, no automatic conversion to Dealer access, field minimization, expiry/review, privacy and Audit |
| Public users | Read approved public content and submit approved public interactions | Anonymous or untrusted public boundary; submitted data and client claims remain untrusted | Public content owner owns published facts; Lead Center owns accepted Lead intake; Authentication owns any later identified state | Public-only access, input validation requirements, privacy/consent purpose, abuse controls, no administrative access, no trust from client-side state, appropriate event evidence |
| System identities | Perform a narrowly defined future machine-to-machine or scheduled operation | Non-human workload boundary; possession of a technical credential alone does not broaden authority | The owning platform module sponsors the purpose; Authentication/Security governance owns identity and access requirements; Operations may hold approved runtime custody | One identity per approved purpose, no shared human use, minimum Resource/Action/Scope, non-interactive access, credential lifecycle outside documentation, rotation/revocation requirements, attributable operation and Audit |

## 3.1 Cross-Category Rules

- One business organization may relate to multiple individual identities, but organization identity and user identity must not be merged.
- One individual crossing internal, Dealer, or Partner boundaries must not inherit access across contexts automatically.
- Identity category is not a Role, and Role is not proof of business ownership.
- Category, relationship, Role, Permission, Scope, and Ownership changes require separate accountable decisions.
- Ambiguous, duplicated, stale, suspended, archived, unowned, or unmapped identities fail closed.
- Category transition or account linking must preserve previous/new category, sponsor, reason, effective time, revoked access, granted access, and Audit evidence.

# 4. Audit Requirement Design

## 4.1 Audit Questions

Every required Audit record must answer:

| Question | Required meaning |
| --- | --- |
| Who | The attributable human or system actor, authenticated identity context, effective roles, delegated/sponsoring authority where applicable, and approver for approval-gated actions |
| What | Attempted or completed Action, stable Resource, affected object, outcome, before/after or change summary where appropriate, approval/exception reference, and affected ownership or permission scope |
| When | Authoritative event time, receipt/record time where different, ordering/correlation context, and effective/expiry time for delayed or temporary changes |
| Where | Environment and service/channel context, request or correlation identifier, source context such as approved network/client metadata, and target Resource/object boundary without recording secrets |
| Why | Business purpose, reason, request/ticket/decision reference, applicable approval, exception rationale, or system trigger; unsupported free text alone is insufficient for high-risk actions |

Audit data must exclude secrets, credentials, password material, reusable Session material, unnecessary personal data, and unrestricted payload copies.

## 4.2 Required Event Coverage

| Event category | Minimum future Audit requirement |
| --- | --- |
| Security events | Authentication success/failure, logout, account status or recovery events, suspicious or denied high-risk access, Session/security-control events, and security exceptions with outcome and correlation context |
| Permission changes | Role, Permission, Scope, Ownership-based access, temporary access, revocation, and exception changes with requester, approver, previous/new state, reason, effective time, and expiry where applicable |
| Sensitive operations | Publish, approve, export, import, assign, delete, restore, manage, sensitive-data access, retention change, recovery, and other classified high-risk actions with target, scope, purpose, result, and approval evidence |
| Approval actions | Request, review, approve, reject, withdraw, expire, override, and exception decisions with decision authority, evidence reference, reason, and relationship to the effective action |
| Ownership changes | Previous owner, new owner, assigning authority, business reason, effective time, affected open work/access scope, handoff outcome, and any related access revocation/grant evidence |

## 4.3 Audit Governance Requirements

- Audit records are append-oriented evidence and are not editable or soft-deletable through ordinary administration.
- Allowed actions and material denied/failed security actions require distinguishable outcomes.
- Approval evidence and effective-action evidence must be linked without implying that approval itself performed the action.
- Correlation across Authentication, Authorization, canonical business modules, security events, and incidents must preserve source ownership.
- Access to Audit evidence is deny-by-default, purpose-limited, attributable, and separable from ordinary operational access.
- Retention, archive, legal hold, export, redaction, correction-by-superseding-record, integrity validation, and disposal rules remain subject to Security/Privacy/Compliance approval.
- Missing, delayed, duplicated, malformed, or unverifiable Audit evidence is a readiness failure for the affected high-risk operation.

# 5. Security Checklist Preparation

This checklist defines review inputs. A checked item would require approved evidence in a later gate; this draft supplies no runtime evidence.

## Authentication

- [ ] Identity categories, sponsors, authoritative sources, and lifecycle owners are approved.
- [ ] Internal and external authentication contexts remain separated.
- [ ] Password, Session, MFA, recovery, rate-limit, lockout, external-provider, and deprovisioning requirements are approved by the frozen owner.
- [ ] Shared administrator accounts and client-side role trust are prohibited.
- [ ] Authentication success, failure, logout, recovery, and material risk events have Audit requirements.

## Authorization

- [ ] Every operation maps to a stable Resource, explicit Action, Role/Permission, Scope, and Ownership decision.
- [ ] Deny-by-default, least privilege, per-request checks, and high-risk explicit authorization are acceptance requirements.
- [ ] Internal, Dealer, Partner, public, and system access cannot inherit across categories automatically.
- [ ] Temporary, delegated, emergency, suspended, stale, and revoked access rules are approved.
- [ ] Separation-of-duties conflicts and approved exceptions are defined and auditable.

## Data Access

- [ ] Canonical owner, classification, business purpose, audience, field scope, and ownership/region constraints are known.
- [ ] Lead, Dealer, CRM, Audit, Analytics, log, and configuration access cannot bypass the owning module.
- [ ] Sensitive field access, masking/redaction, aggregation, export, retention, and disposal requirements are approved.
- [ ] Backups, logs, caches, exports, and Analytics do not become shadow access paths.
- [ ] Access review can identify orphaned, excessive, conflicting, stale, and unused access without changing it automatically.

## Sensitive Operations

- [ ] High-risk Actions have named requester, approver, operator, target, purpose, prerequisites, rollback/reversal, validation, and Audit requirements.
- [ ] Publish, approve, export, import, assign, delete, restore, manage, ownership change, retention change, and recovery boundaries are reviewed.
- [ ] Emergency and exception paths are narrower, time-bound, observable, revocable, and subject to post-use review.
- [ ] Preparation, validation, approval, and execution states are not conflated.
- [ ] Missing identity, target, authority, evidence, rollback, or validation keeps the operation not ready.

## Audit

- [ ] Required records answer Who, What, When, Where, and Why.
- [ ] Security, permission, sensitive-operation, approval, and ownership events have complete coverage.
- [ ] Integrity, correlation, access, retention, archive, export, legal hold, and disposal requirements are approved.
- [ ] Secrets and unnecessary personal/business payloads are excluded.
- [ ] Audit gaps are detectable, reviewable, and treated as readiness failures.

## Privacy

- [ ] Personal and commercially sensitive data has an approved purpose, minimum scope, owner, access audience, and retention basis.
- [ ] Public submission consent/purpose and later internal use remain traceable.
- [ ] Dealer/Partner access does not expose unrelated Lead, contact, commercial, or internal-review information.
- [ ] Logging, monitoring, Audit, Analytics, incident evidence, backup, and export receive privacy review.
- [ ] Applicable legal, contractual, residency, notification, and data-subject obligations are identified by authorized reviewers.

## External Access

- [ ] Dealer, Partner, public, system, vendor, and external identity-provider trust boundaries are approved.
- [ ] Sponsorship, proofing, mapping, scope, expiry, access review, suspension, revocation, and provider-failure rules are defined.
- [ ] External claims and groups cannot grant platform permissions automatically.
- [ ] External access is separated from internal administration and cannot reuse internal administrative roles.
- [ ] External export, API, integration, and support access requires separate purpose, owner, evidence, and authorization.

## Incident Response

- [ ] Security event intake, classification, evidence preservation, ownership, severity, escalation, communication, containment, recovery, and review requirements are approved.
- [ ] Incident roles do not imply unrestricted permission, credential, data, or recovery authority.
- [ ] Emergency containment and recovery remain explicit, scoped, attributable, reversible where possible, and separately authorized.
- [ ] Privacy/security notification and external communication authorities are named.
- [ ] Post-incident actions have owners, due dates, validation evidence, and an Architecture/ADR escalation path where required.

# 6. Automation Boundary

## 6.1 Allowed Future Automation

Future automation may assist humans only after separate design and approval:

| Assistance | Allowed preparation boundary |
| --- | --- |
| Security alert suggestion | Correlate approved signals and suggest an alert, severity candidate, owner, or review context without declaring a final incident decision or changing state |
| Risk detection assistance | Identify anomalies, missing evidence, stale access, conflicting access, or candidate risk for authorized human review without treating inference as fact |
| Access review reminders | Notify accountable owners that a review, expiry, recertification, or unresolved exception is due without approving, extending, revoking, or changing access |

Allowed assistance must be explainable, attributable, purpose-limited, access-controlled, privacy-reviewed, monitored for error, and presented as a recommendation requiring accountable human decision.

## 6.2 Prohibited Automation

The following are not allowed:

- Automatic permission escalation.
- Automatic privilege granting.
- Automatic role assignment.
- Automatic security policy changes.
- Automatic approval, self-approval, exception approval, emergency-access activation, or access extension.
- Automatic conversion of Partner, Dealer, Lead, CRM, Analytics, employment, group, or external-provider facts into access rights.
- Automatic suppression, alteration, or deletion of Audit evidence.

Automation may not turn a risk score, external claim, business lifecycle state, ownership inference, or alert into an authorization decision. Any future state-changing security automation requires Architecture Review and cannot be approved by this document.

# 7. Architecture Consistency Review

Review scope is limited to `docs/AUTH_SYSTEM.md`, `docs/SECURITY_PERMISSION.md`, and the current M5 preparation documents.

| Source | Consistency decision |
| --- | --- |
| `docs/AUTH_SYSTEM.md` | Preserved as owner of Authentication, Authorization, RBAC, internal roles, permission matrix, login, Session, Audit fields/events, and future SSO. No redesign or matrix change is proposed. |
| `docs/SECURITY_PERMISSION.md` | Preserved as owner of Security Governance Objects, high-risk actions, Audit, Privacy, Export, Data Access, and the `Authentication -> Authorization -> Resource -> Audit -> Analytics (Future)` flow. |
| `docs/M5_PREPARATION_PHASE_READINESS_REPORT.md` | Implements the requested M5.3 permission, Audit, privacy, external-access, incident, and release-readiness preparation while retaining M4 blockers. |
| `docs/M5_PARTNER_MANAGEMENT_MODEL.md` | Preserves Partner Lead, Dealer, CRM, Auth/RBAC, Security/Audit, and Analytics ownership; this document keeps Partner business status separate from external identity and access. |
| `docs/M5_DEALER_CHANNEL_ARCHITECTURE.md` | Preserves Dealer Center ownership and the decision that a Dealer organization is not a User; this document prepares the separate future Dealer-user trust boundary. |
| `docs/M5_CRM_WORKFLOW_ARCHITECTURE.md` | Preserves CRM as activity/evidence owner and Auth/RBAC plus Security/Audit as access and governance owners; no CRM stage creates access. |
| `docs/M5_LEAD_LIFECYCLE_MODEL.md` | Preserves Lead Center identity/lifecycle/privacy ownership; no Lead state creates a user, role, permission, or external entitlement. |
| `docs/M5_LEAD_CRM_BOUNDARY_DECISION.md` | Preserves Lead Center as canonical, CRM as operational, Dealer Center as Dealer owner, and Authentication/RBAC as identity/access owner. |
| `docs/M5_SEO_GEO_ARCHITECTURE.md` | Preserves public approved facts, publication gates, private operational records, and factual-approval separation; SEO/GEO does not become a permission or identity system. |
| `docs/M5_OPERATIONAL_READINESS_ARCHITECTURE.md` | Aligns security monitoring, log/Audit separation, privacy, incident authority, recovery authorization, and break-glass questions with this preparation boundary. |

Consistency result: `ALIGNED FOR PREPARATION / FROZEN ARCHITECTURE UNCHANGED / IMPLEMENTATION NOT AUTHORIZED`.

One status-wording variance exists in the current M5 preparation set: `docs/M5_PARTNER_MANAGEMENT_MODEL.md` records `LOCKED / NOT AUTHORIZED`, while the governing task and other M5 documents use the full `LOCKED / BLOCKED / NOT AUTHORIZED` boundary. This review does not modify that user-owned document. The variance does not authorize execution and should be considered during the later cross-workstream documentation review.

# 8. Open Architecture Questions

Architecture Review must resolve before this draft becomes an implementation input:

1. **Security ownership:** which named roles own Security Governance, Security Operations, Audit governance, Privacy review, access review, and their backup/escalation paths?
2. **External identity model:** are Dealer users and Partner users separate portal populations, stages of one governed external identity, or another approved model?
3. **Identity sponsorship:** who may sponsor, approve, review, suspend, and revoke each external identity category?
4. **Administrative assurance:** which roles and Actions require MFA, re-authentication, stronger proofing, restricted environment access, or shorter review intervals?
5. **Separation of duties:** which actions mandate independent requester, approver, operator, and verifier, and which narrowly defined exceptions are acceptable?
6. **Scope definitions:** what precise field, ownership, region, department, assigned, partner, own, limited, readonly, and time-bound semantics apply to each Resource?
7. **System identities:** which future machine purposes are legitimate, who owns them, and what credential custody, rotation, revocation, and emergency-disable rules apply?
8. **Audit policy:** what event sources, integrity proof, review cadence, retention, archive, legal hold, access, export, correction, and disposal rules are approved?
9. **Privacy/compliance:** which laws, contracts, consent bases, residency constraints, notification duties, and data-subject requirements apply to each identity and data category?
10. **Access review:** what review cadence, evidence, reviewer independence, escalation, expiry, and closure criteria apply to internal, external, temporary, emergency, and system access?
11. **Incident authority:** who may classify, investigate, contain, communicate, recover, approve emergency access, and accept security recovery?
12. **Automation assurance:** what approved signals, accuracy thresholds, explainability, privacy, false-positive handling, human review, and monitoring are required for suggestion-only automation?

# 9. Governance Validation

Required repository governance validation:

```text
node scripts/validate-website-governance.mjs
```

The validation is repository-structural only. Passing does not approve this architecture, resolve open questions, prove a security control, create runtime evidence, or authorize implementation or execution.

The validation boundary remains:

- No runtime operation.
- No database operation.
- No Prisma operation.
- No migration operation.
- No credential or secret operation.
- No permission or role operation.
- No Git mutation.

# 10. Architecture Review Gate

Required review areas are Architecture, Business, Repository Governance, Security / Permission, Authentication/RBAC, Privacy/Compliance, Audit, Operations/Incident Response, and affected canonical module owners.

Until Architecture Review Approval:

```text
M5.3 Security Preparation Architecture: PREPARATION DRAFT
Frozen Security Architecture: UNCHANGED
Security Implementation: NOT AUTHORIZED
Permission / Role Change: NOT AUTHORIZED
Authentication Implementation: NOT AUTHORIZED
Runtime / Database / Migration Execution: BLOCKED / NOT AUTHORIZED
```
