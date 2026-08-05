# M5 Security Architecture Freeze Decision

Status: `PASS / FROZEN WITH DEFERRED ITEMS / ARCHITECTURE REVIEW APPROVAL REQUIRED`\
Phase: `M5.3.2 Final Security Architecture Freeze Decision`\
Decision date: `2026-08-02`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 1. Decision

The M5.3 Security Architecture boundary is frozen at the governance level, subject to Architecture Review approval.

Decision:

```text
M5.3 Security Architecture: FROZEN FOR GOVERNANCE
Implementation: DEFERRED / NOT AUTHORIZED
M4 Runtime: LOCKED / BLOCKED / NOT AUTHORIZED
Architecture Review Approval: REQUIRED
```

This decision freezes responsibilities, trust boundaries, authorization principles, data classifications, and Audit accountability. It does not freeze or approve technical implementation choices, credentials, runtime configuration, database structures, migrations, deployment, or live operations.

## 2. Freeze Boundary

The following are frozen as M5 security governance requirements:

- Security / Permission remains a platform governance capability, not Authentication, Login, or Runtime Security.
- Authentication owns identity confirmation, login, Session, and future SSO boundaries.
- Authorization/RBAC owns access decisions for `Role + Permission + Resource + Action + Scope + Ownership`.
- The governing flow remains:

```text
Authentication
-> Authorization
-> Resource
-> Audit
-> Analytics (Future)
```

- Identity categories remain distinct: Internal, Dealer, Partner, Public, and System.
- Business relationship status MUST NOT automatically create system permission.
- Dealer and Partner authorization remain separate from internal administration and from each other unless a later approved mapping explicitly says otherwise.
- Public, Internal, and Sensitive Business Data remain purpose-limited classifications with canonical source ownership.
- Audit requirements remain accountable through Who, What, When, Where, and Why.
- Deny-by-default, least privilege, explicit high-risk authorization, separation of duties, privacy minimization, and traceable ownership remain mandatory.
- Automatic permission escalation, privilege granting, role assignment, and security policy changes remain prohibited.

The freeze does not create a new module, role, permission, resource, identity account, schema, API, or runtime contract.

## 3. Identity Governance Baseline

These categories are frozen governance boundaries, not newly created runtime identities.

| Identity category | Ownership | Purpose | Trust boundary | Lifecycle responsibility |
| --- | --- | --- | --- | --- |
| Internal Identity | Authentication owns identity and Session facts; sponsoring business owner owns purpose and scope | Approved internal administration, content, SEO/GEO, sales, partner, and governance work | Workforce identity is not business authorization until Authentication and Authorization succeed | Govern join, role review, transfer, suspension, termination, revocation, and recertification with Audit |
| Dealer Identity | Authentication owns the individual; Dealer Center owns Dealer relationship and canonical Dealer facts | Future, narrowly scoped Dealer collaboration or assigned work | External organization boundary; Dealer status, tier, region, or ownership is not identity proof or permission | Govern sponsorship, relationship changes, suspension/archive, expiry, access review, and revocation without merging User and Dealer |
| Partner Identity | Authentication owns the individual; Partner, Lead, and Dealer owners own relationship facts at their stages | Future, narrowly scoped Partner collaboration | External Partner boundary; application, Lead status, or cooperation interest grants no entitlement | Govern sponsorship, proofing, review, expiry, suspension, conversion, and revocation with separate external access controls |
| Public Identity | Public content owners and Lead Center own accepted public interactions; no authenticated owner is assumed | Read approved public content and submit approved public interactions | Anonymous/untrusted public boundary; client claims and submitted data are untrusted authorization inputs | Govern anonymous interaction, abuse handling, consent/purpose, optional later identification, and retention |
| System Identity | Owning module sponsors purpose; Authentication/Security govern identity/access requirements; Operations may hold approved custody | Future, narrowly defined machine-to-machine or scheduled work | Non-human workload boundary; a technical credential cannot broaden authority | Govern purpose, creation, minimum scope, rotation, disablement, revocation, expiry, incident handling, and Audit |

Cross-category rules are frozen: organization identity is not user identity; identity category is not a Role; one context does not inherit another context's access; ambiguous, stale, suspended, or unmapped identities fail closed.

## 4. Authorization Governance Baseline

- Existing RBAC remains unchanged. The frozen internal role set and permission matrix remain owned by `docs/AUTH_SYSTEM.md`.
- Security / Permission remains the governance owner for high-risk action classification, Privacy, Data Access, Export, Audit, retention, and Security Exceptions.
- Authorization must evaluate the identified actor, Role, Permission, Resource, Action, Scope, Ownership, status, and applicable approval.
- Default access is denied. Login status, UI visibility, external-provider claims, Dealer/Partner relationship status, Lead lifecycle, CRM stage, tier, region, or client-side state cannot substitute for authorization.
- Privilege escalation, temporary access, delegation, break-glass access, and exceptions must be time-bound, attributable, reviewable, revocable, and separately approved.
- Administrative actions involving User, Role, Permission, Setting, retention, Security Exception, export, recovery, or ownership remain high-risk.
- Request, review, approval, effective change, and verification must be separated where risk requires. Shared administrator accounts, automatic role assignment, automatic privilege granting, and automatic policy changes remain prohibited.

Required statement:

> Authorization model is frozen. Future implementation must conform to this boundary.

## 5. Data Governance Baseline

| Classification | Ownership | Access responsibility | Protection requirement |
| --- | --- | --- | --- |
| Public Data | Canonical content/entity owner with CMS publication governance | Public read only after approved publication; internal changes and publication remain separately authorized | Factual approval, publication gate, source traceability, and no unsupported claims |
| Internal Data | Relevant canonical business or platform owner | Named internal roles receive minimum Resource/Action/Scope access for an approved purpose; no public/external access by default | Deny by default, least privilege, ownership/region limits, purpose limitation, and Audit |
| Sensitive Business Data | Canonical source owner controls meaning; Security/Privacy governs cross-module use | Purpose-limited, field-minimized, authorized access; exports, reviews, incidents, retention, and disposal require explicit control | Privacy review, masking/redaction/aggregation where sufficient, export control, retention governance, and traceable Audit |

Classification does not transfer canonical ownership or grant access. Logs, backups, exports, caches, Analytics, incident packages, and Audit records must not become shadow data stores or bypass paths. Uncertain classification or ownership fails closed pending an accountable decision.

## 6. Audit Governance Baseline

Audit requirements are frozen as governance requirements only. Runtime Audit implementation remains deferred.

| Question | Frozen responsibility |
| --- | --- |
| Who | Authentication supplies attributable human/system identity context; Authorization supplies effective role/scope; approvers and delegated authority are recorded where relevant. |
| What | The source owner identifies Action, stable Resource, affected object, outcome, approval/exception reference, and ownership or permission change. |
| When | Preserve authoritative event time, ordering/correlation context, and effective/expiry times for temporary or delayed changes. |
| Where | Preserve approved environment, service/channel, request/correlation context, and target boundary without secrets. |
| Why | The requesting owner or system trigger supplies purpose, reason, ticket/decision reference, approval, or exception rationale. |

Security events, permission changes, sensitive operations, approvals, ownership changes, material denied actions, and security exceptions require attributable evidence. Audit evidence is append-oriented, purpose-limited, access-controlled, and unavailable for ordinary update/delete paths. Audit does not authorize an action.

## 7. Deferred Decisions Lock

The following classification locks sequencing without solving runtime implementation questions:

| Item | Classification | Locked disposition |
| --- | --- | --- |
| Security, Audit, Privacy, access-review, and incident named assignments | C. Requires business ownership decision | Assign accountable owners, backups, escalation, and review cadence before operational enablement. |
| Dealer versus Partner portal population and identity-provider mechanics | B. Deferred to runtime phase | Preserve separate authorization contexts; defer portal, provider, protocol, and account-linking choices. |
| External sponsorship, proofing, suspension, and revocation operations | C. Requires business ownership decision | Name sponsors and lifecycle reviewers before external access is enabled. |
| MFA, re-authentication, stronger proofing, and administrative thresholds | B. Deferred to runtime phase | Preserve the high-risk assurance requirement; defer factors, thresholds, and implementation. |
| Separation-of-duties principles and no self-approval | A. Frozen now | Request, approval, effective change, and verification must be separated where risk requires. |
| Explicit scope semantics and deny-by-default handling | A. Frozen now | Future Resources must define field, ownership, region, assigned, partner, readonly, and time-bound scope before implementation. |
| System-identity purpose catalogue and credential custody | B. Deferred to runtime phase | No system identity is created; each future purpose requires separate design, custody, and authorization. |
| Audit accountability and evidence questions | A. Frozen now | Who/What/When/Where/Why and source-owner responsibility are mandatory; retention numbers and tooling remain deferred. |
| Privacy, consent, residency, notification, and data-subject obligations | C. Requires business ownership decision | Authorized Privacy/Compliance owners must identify applicable obligations before handling is implemented. |
| Access-review cadence, incident authority, and recovery acceptance | C. Requires business ownership decision | Assign owners and evidence cadence; no emergency or recovery execution is authorized. |
| Suggestion-only security automation | B. Deferred to runtime phase | State-changing automation remains prohibited; any future assistance requires separate design and human review. |

## 8. Acceptance Criteria

| Criterion | Result |
| --- | --- |
| M5 Security Architecture boundary frozen | `PASS` |
| No M3 frozen architecture changed | `PASS` |
| M4 remains `LOCKED / BLOCKED / NOT AUTHORIZED` | `PASS` |
| No implementation introduced | `PASS` |
| No permission model expansion | `PASS` |
| No runtime activation | `PASS` |
| Governance validation passes | `PASS` |

Repository validation command:

```text
node scripts/validate-website-governance.mjs
```

Structural validation confirms repository governance only. It does not create runtime evidence, authorize implementation, unlock M4, or approve execution.

## 9. Final Freeze Decision

```text
M5.3.2 Final Security Architecture Freeze: PASS
Security Governance Boundary: FROZEN
Identity Governance Baseline: FROZEN
Authorization Governance Baseline: FROZEN
Data Governance Baseline: FROZEN
Audit Governance Baseline: FROZEN
Implementation / Runtime: DEFERRED / NOT AUTHORIZED
M4 Runtime: LOCKED / BLOCKED / NOT AUTHORIZED
Architecture Review Approval: REQUIRED
```

This document is the final repository-side freeze decision proposal. It becomes an approved architecture freeze only after Architecture Review approval. No approval here authorizes authentication, authorization, RBAC, database, credential, migration, deployment, staging, or production work.
