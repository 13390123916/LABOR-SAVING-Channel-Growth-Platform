# M5 Partner Management Model

Document responsibility: prepare the future Partner management operating model by coordinating existing Partner Program, Partner Lead, Dealer Center, CRM, CMS, Auth/RBAC, Security/Audit, and Analytics boundaries.

Status: `PREPARATION DRAFT / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.0 Business Capability Architecture Preparation`\
Runtime boundary: `LOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

Partner Management in this document is an orchestration model, not a new canonical platform entity or module.

Canonical ownership remains:

- CMS and Partner System own the public Partner Program, content, cooperation-mode descriptions, CTA, Metadata, Schema, and publication workflow.
- Lead Center owns Partner Lead intake, status, assignment, privacy, deduplication, and CRM input.
- Dealer Center owns the long-lived channel business object, Dealer lifecycle, region/cooperation relationships, and Dealer governance.
- CRM owns follow-up activities, communications, tasks, opportunities, and outcomes.
- Authentication and RBAC own identity, Resource, Action, Permission, Scope, and access decisions.
- Security and Audit own high-risk-action, privacy, export, evidence, and accountability boundaries.
- Analytics consumes authorized Lead and Dealer facts without changing them.

This document does not create database models, schema changes, migrations, APIs, CRUD, Admin UI, runtime workflows, permissions, credentials, or execution authority.

## 1. Partner Types

Partner type at intake describes the requested cooperation model. It does not mean the applicant has been approved, authorized, contracted, or assigned an exclusive region.

| Partner type | Business intent | Future mapping boundary |
| --- | --- | --- |
| Regional agency | Interest in serving a geographic market | Region and scope require qualification, negotiation, and approval |
| Industry agency | Interest in serving a defined industry market | Industry fit and capability require evidence and review |
| Channel distribution | Interest in distributing through existing sales/channel resources | Operating role may later map to Agent or Distributor classification |
| Project cooperation | Interest in opportunity-specific or project-specific collaboration | CRM tracks project activity; it does not create a permanent Dealer scope automatically |

Target organization profiles may include industrial-tool agents, MRO service providers, automation integrators, industrial robotics integrators, equipment traders, and organizations with relevant industrial customer resources. These are Dealer operating-role classifications, not additional Partner Program lifecycle states.

Rules:

- Partner type is sourced from confirmed Partner Program options and Partner Lead intent.
- Multiple interests may be reviewed, but a final cooperation scope requires explicit business approval.
- Partner type does not determine Dealer tier, Lead entitlement, permissions, pricing, rebates, exclusivity, or contract outcome.
- Controlled vocabularies must be reviewed before implementation and must not be inferred from free-text claims alone.

## 2. Partner Relationship Model

The relationship model connects existing domain objects without merging them:

```text
Partner Program (CMS-managed public content)
-> Partner Lead (Lead Center intake)
-> Qualification and conversion decision
-> Dealer Prospect (Dealer Center)
-> Dealer lifecycle
-> CRM activities / opportunities / tasks
-> Analytics review
```

Supporting dependencies:

```text
Platform Assets -> approved brand, company, contact, and download facts
Authentication -> internal operator identity
RBAC -> scoped access and high-risk action authorization
Audit -> transition, assignment, export, and approval evidence
Security / Permission -> privacy, export, ownership, and risk controls
```

Relationship rules:

- The Partner Program is a public acquisition and content object; it is not the partner organization.
- A Partner Lead is an application or inquiry; it is not a Dealer.
- A qualified conversion may establish a Dealer Prospect while retaining source Lead traceability.
- Dealer is the durable channel relationship object.
- CRM records interaction around a Lead or Dealer; CRM activity is not the Dealer fact source.
- A User account is an authenticated identity and must remain separate from the external organization.
- Customer Lead assignment to an Active Dealer is a governed Lead relationship, not a transfer of customer ownership or unrestricted data access.

## 3. Partner Status Lifecycle

Partner Management does not introduce a parallel canonical status field. Its operating view is composed from the existing publication, Lead, and Dealer lifecycles.

### 3.1 Acquisition and Intake

```text
Partner Program:
Draft -> Internal Review -> Content Approved -> SEO Approved
-> Release Approved -> Published -> Indexed -> Archived

Partner Lead:
New -> Contacted -> Qualifying -> Assigned -> Won / Invalid
```

- Public Partner content must pass the CMS publication gates.
- `Won` indicates a valid cooperation opportunity or effective business conversion; it is not a revenue claim or legal authorization.
- `Invalid` requires a reason and Audit evidence.

### 3.2 Durable Relationship

When the approved business conversion creates a durable channel object, the canonical Dealer lifecycle applies:

```text
Prospect
-> Qualified
-> Negotiating
-> Approved
-> Active
-> Suspended
-> Archived
```

Cross-domain transition controls:

- Source Lead and conversion evidence must remain traceable.
- Lead completion and Dealer creation must not be treated as automatic approval.
- Dealer status changes require the Dealer authorization and Audit boundaries.
- CRM stages must remain CRM activity semantics and must not overwrite Lead or Dealer lifecycle states.
- Re-entry, rejection, recovery, and exceptional transitions require Architecture Review before implementation design.

## 4. Partner Operation Process

| Step | Primary owner | Preparation output | Stop condition |
| --- | --- | --- | --- |
| 1. Program preparation | CMS / Partner content owner | Approved cooperation content, CTA, Metadata, Schema, and source mapping | Unverified claims, missing approval, or unsupported commercial terms |
| 2. Acquisition | Website / SEO / GEO | Traceable Partner entry and source context | Content or indexing gate not approved |
| 3. Intake | Lead Center | Partner Lead with purpose, consent, source, and minimum business fields | Missing required intake or privacy basis |
| 4. Triage and assignment | Lead Center / Partner Manager | Accountable assignee and review priority | Unclear ownership or unauthorized access |
| 5. Qualification | Partner Manager / authorized reviewer | Evidence-based fit assessment | Missing evidence, compliance exception, or no qualified reviewer |
| 6. Conversion | Lead Center / Dealer Center | Traceable decision to establish or not establish Dealer Prospect | Automatic conversion or missing decision evidence |
| 7. Negotiation and approval | Dealer Center / CRM / approval authority | Reviewed scope and accountable decision | Commercial/legal assumptions or missing authority |
| 8. Activation and operation | Dealer Center | Active relationship with owner, scope, and operating readiness | Unresolved compliance, ownership, or readiness condition |
| 9. Lead collaboration | Lead Center / Dealer Center | Governed Customer Lead assignment and disposition | Dealer not Active, scope mismatch, or unauthorized sensitive-data access |
| 10. Review | Dealer Center / Analytics / Security | Evidence-based operating, performance, and compliance review | Unapproved metrics or incomplete evidence |
| 11. Suspension or archive | Dealer Center / approval authority | Controlled pause or historical retention with reason and Audit | Missing authority, impact review, retention, or handoff plan |

Operational principles:

- Human review remains mandatory for qualification, approval, activation, suspension, and exceptional recovery.
- Content publication, Lead assignment, Dealer approval, export, and permission change are separate controlled actions.
- CRM communications and tasks support the process but do not own Partner Program, Lead, or Dealer facts.
- No process step may promise revenue, payback, exclusivity, authorization, pricing, certification, customer cases, or market ranking without confirmed evidence and approval.

## 5. Partner Capability Requirements

The following capabilities are future requirements only:

### 5.1 Program and Acquisition

- Governed Partner Program content, cooperation modes, enablement modules, FAQ, CTA, Metadata, Schema, and release approvals.
- CN-first source attribution across `/partner/`, search, AI search, campaigns, social, events, manual intake, and compliant import.
- Factual content controls that prevent unsupported commercial or market claims.

### 5.2 Lead and Qualification

- Partner Lead intake using the existing Lead Schema and privacy boundary.
- Deduplication candidates without automatic deletion.
- Assignment to scoped Partner Manager queues.
- Qualification evidence, reviewer accountability, missing-evidence handling, decision rationale, and escalation.
- Traceable Partner Lead-to-Dealer conversion without merging the two objects.

### 5.3 Relationship Operations

- Dealer lifecycle, classification, ownership, region/industry/product relationships, and review history.
- CRM-linked follow-up, tasks, meetings, opportunities, and outcomes.
- Governed Customer Lead assignment to eligible Active Dealers.
- Enablement and approved-asset access without copying or modifying public fact sources.
- Suspension, archive, ownership transfer, and outstanding-work handoff controls.

### 5.4 Performance and Growth Review

- Approved Dealer/Partner metric catalogue with clear fact owners and evidence lineage.
- Acquisition, qualification, Lead handling, channel coverage, engagement, contribution, data-quality, and compliance review views.
- Aggregated or minimized Analytics consumption that cannot overwrite Lead or Dealer facts.
- Human-reviewed tier or segmentation capability only after thresholds, weights, and policy effects are approved.

### 5.5 Security and Governance

- Stable Resource/Action controls using the frozen Auth and Security boundaries.
- Scope and ownership checks for regional, assigned, departmental, and read-only access.
- Explicit authorization and Audit for approval, activation, suspension, archive, reassignment, import, export, and sensitive-data access.
- Data minimization, consent/purpose control, desensitization, retention, and compliant archive handling.
- Separation between internal Admin identity and any future external Partner Portal identity.

### 5.6 Operational Readiness

- Monitoring and logging for workflow failures, unowned records, overdue reviews, assignment exceptions, and high-risk actions.
- Incident response, backup/restore, rollback, reconciliation, and evidence-retention requirements.
- Release gates that remain blocked until architecture approval, implementation authorization, testing, and operational evidence are complete.

## 6. Architecture Alignment Summary

| Concern | Canonical owner | M5 preparation treatment |
| --- | --- | --- |
| Public Partner proposition and content | Partner System / CMS | Reuse; do not duplicate content architecture |
| Application and source attribution | Lead Center | Reuse Partner Lead lifecycle and privacy rules |
| Durable channel organization | Dealer Center | Reuse canonical Dealer object and lifecycle |
| Follow-up and opportunity activity | CRM | Prepare integration boundary only |
| Identity and access | Authentication / RBAC | Reuse Resource, Action, Scope, Ownership, and explicit authorization |
| High-risk actions and privacy | Security / Permission / Audit | Reuse governance and evidence requirements |
| Performance and attribution | Analytics | Consume authorized facts; never rewrite source states |

This preparation model introduces no new Platform Capability and makes no change to frozen architecture. Architecture Review approval is required before it can become an implementation input.
