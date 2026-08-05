# M5 Dealer Channel Architecture

Document responsibility: prepare the future Dealer channel business-capability blueprint without changing the frozen M3.6 Dealer Center architecture or authorizing runtime implementation.

Status: `PREPARATION DRAFT / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.0 Business Capability Architecture Preparation`\
Runtime boundary: `LOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

This document applies `Freeze First -> Validate Second -> Execute Last`.

- `docs/DEALER_CENTER.md` remains the canonical Dealer domain owner.
- Dealer remains distinct from Customer, User, Lead, Partner Program content, and CRM Record.
- The frozen Dealer lifecycle is reused exactly; no parallel canonical lifecycle is introduced.
- This document defines business review dimensions and future capability requirements only.
- It does not define database tables, ORM models, fields, APIs, CRUD, state-machine code, permissions, migrations, or Admin UI.
- Any change to a frozen module boundary, lifecycle, permission model, privacy rule, or core data model requires Architecture Review and the existing ADR discipline.

## 1. Dealer Business Model

Dealer is the long-lived channel-growth business object. It represents an organization being assessed, approved, operated, suspended, or retained as channel history. It is not the public Partner Program, an application Lead, a login identity, or a CRM activity record.

The business flow is:

```text
Partner Program / Channel Campaign
-> Partner Lead
-> Lead qualification and conversion decision
-> Dealer Prospect
-> Dealer lifecycle management
-> CRM activities and tasks
-> Analytics consumption
```

Dealer Center owns:

- Stable Dealer identity and business relationship history.
- Dealer type and classification views.
- Lifecycle state and state-transition accountability.
- Region, industry, product-interest, and cooperation-scope relationships.
- Partner Lead conversion and Customer Lead assignment boundaries.
- Business ownership, review, suspension, archive, and audit requirements.

Dealer Center does not own:

- Partner page content, Metadata, Schema, FAQ, or CTA, which belong to CMS and the Partner content system.
- Lead collection, Lead fields, deduplication, or Lead assignment execution, which belong to Lead Center.
- Calls, visits, opportunities, tasks, quotations, or communication history, which belong to future CRM capability.
- Authentication, RBAC implementation, public brand facts, Analytics definitions, contracts, pricing, rebates, settlement, or legal authorization.

Business value must be evaluated through verified channel fit, accountable operations, compliant Lead handling, and measurable contribution. No Dealer classification or lifecycle state may be presented as a promise of revenue, exclusivity, authorization, pricing, or contract outcome.

## 2. Dealer Lifecycle

The canonical lifecycle remains:

```text
Prospect
-> Qualified
-> Negotiating
-> Approved
-> Active
-> Suspended
-> Archived
```

| State | Business meaning | Minimum review expectation |
| --- | --- | --- |
| Prospect | Potential channel organization not yet qualified | Source and accountable review owner are known |
| Qualified | Basic qualification and cooperation fit have been reviewed | Qualification evidence and reviewer decision are traceable |
| Negotiating | Cooperation scope, region, product direction, service capability, or materials are under discussion | Open conditions and responsible parties are recorded in CRM, not Dealer status text |
| Approved | Internal cooperation review passed, but stable operation has not started | Approval authority and decision evidence are recorded |
| Active | Effective channel relationship may receive governed Lead assignments and enter operating reviews | Ownership, scope, compliance, and operational readiness are current |
| Suspended | Normal operation or Lead assignment is paused | Reason, authority, impact, and review/exit condition are recorded |
| Archived | Historical object no longer participating in assignment or operations | History and attribution remain available under retention and audit rules |

Lifecycle controls:

- Status transitions require an accountable actor, timestamp, reason, source evidence, and Audit record.
- `Approved` and `Active` are internal management states, not legal authorization or contract evidence.
- Suspension must stop new operational assignment within the future runtime design, but this document does not implement that behavior.
- Archive preserves history and attribution; it is not physical deletion.
- Re-entry, exception, or reverse-transition rules remain an Architecture Review question and must not be inferred by implementation.

## 3. Dealer Qualification Model

Qualification determines whether a Prospect is suitable to move to `Qualified`. It is a human-governed business review, not an automated approval score.

### 3.1 Qualification Dimensions

| Dimension | Review question | Evidence boundary |
| --- | --- | --- |
| Organization identity | Is the organization and responsible contact sufficiently identified for business review? | Use verified business materials; do not collect unrelated sensitive personal data |
| Channel-role fit | Does the organization fit a supported channel role? | Compare against Partner intent and Dealer classification; do not infer authorization |
| Region and market fit | Is the proposed operating region or market scope clear enough to assess? | Region data does not establish exclusivity |
| Industry and customer fit | Are served industries and customer resources relevant to the platform's target market? | Self-declared claims require review and must not become public facts automatically |
| Product and solution fit | Is the product or solution direction compatible with confirmed platform offerings? | Do not invent product parameters or availability |
| Commercial and service capability | Can the candidate support appropriate sales, technical, service, or project activities? | Required thresholds and proof remain business-review inputs |
| Compliance and conduct | Are material compliance risks, misleading claims, or prohibited commitments absent? | Exceptions require explicit review and audit |
| Data quality and consent | Is the intake complete, traceable, and permitted for the stated follow-up purpose? | Lead privacy and retention rules apply |

### 3.2 Qualification Decision

The review produces one of three preparation-level outcomes:

- **Sufficient for qualification:** the authorized reviewer may propose `Prospect -> Qualified`.
- **More evidence required:** the Dealer remains `Prospect`; missing evidence and the next owner are recorded.
- **Not suitable or non-compliant:** the source Lead may become `Invalid`, and any existing Dealer Prospect may be retained or archived according to an approved retention decision.

These are review outcomes, not new Dealer lifecycle states. Thresholds, mandatory evidence, exception authority, and review cadence require Business Review approval before implementation design.

## 4. Dealer Classification

Dealer classification is multi-dimensional. It must not collapse cooperation intent, operating role, region, capability, and lifecycle into one label.

### 4.1 Operating Role

Supported role families inherited from the frozen Dealer boundary include:

- Agent.
- Distributor.
- Regional cooperation partner.
- Automation integrator.
- Industrial robotics integrator.
- Equipment trader.
- MRO service provider.

An organization may have more than one reviewed operating role. Role classification describes business fit; it does not grant permissions, exclusivity, or legal status.

### 4.2 Cooperation Intent

Cooperation intent is sourced from the Partner Program and Partner Lead:

- Regional agency.
- Industry agency.
- Channel distribution.
- Project cooperation.

Intent is an intake and negotiation input. It must not be treated as approved Dealer scope until the relevant business review is complete.

### 4.3 Additional Classification Views

- Region or market coverage.
- Served industry.
- Product or solution interest.
- Customer/resource profile.
- Sales, technical, service, or project capability focus.
- Lead source and conversion path.
- Current lifecycle state.

Each view needs an owner, fact source, review status, and change audit. Final controlled vocabularies remain open for Architecture Review; this blueprint does not define schema enums.

## 5. Dealer Level / Tier Strategy

Tiering is an internal operating-segmentation capability, not a legal, contractual, authorization, or public-ranking system.

The future tier strategy should:

- Use verified, reviewable inputs rather than a single revenue figure.
- Consider capability readiness, operating engagement, Lead handling quality, coverage contribution, data quality, and compliance.
- Separate current performance from future potential.
- Apply a defined review period and evidence window.
- Allow human review, documented exceptions, and appeal/escalation.
- Record the evaluator, evidence period, decision rationale, and next review date.
- Avoid automatically changing permissions, Dealer lifecycle, Lead entitlement, commercial policy, or public claims.

No tier names, thresholds, weights, benefits, or downgrade rules are frozen in M5.0. Those items require Business Review, compliance review, and Architecture Review because they can affect operating policy and long-term data semantics.

## 6. Dealer Ownership Model

Ownership expresses business accountability. It does not replace User identity, RBAC scope, or approval authority.

| Ownership role | Responsibility | Boundary |
| --- | --- | --- |
| Primary relationship owner | Accountable for relationship continuity, review coordination, and next action | Normally an authorized Partner Manager; assignment alone does not grant unrestricted access |
| Qualification reviewer | Assesses qualification evidence and records a recommendation | Must be authorized for the relevant review action |
| Approval authority | Decides approval, activation, suspension, or exceptional recovery where policy requires | Must be distinct from ordinary editing when separation of duties applies |
| Regional or specialist collaborator | Supports region, industry, product, technical, or service review | Collaboration does not create co-ownership or regional exclusivity by default |
| CRM activity owner | Owns specific follow-up, task, visit, or opportunity activity | CRM ownership does not change Dealer canonical ownership automatically |
| Lead assignee | Handles a particular assigned Lead | Lead assignment is scoped to the Lead and does not transfer Dealer ownership automatically |

Ownership rules:

- Every active review or operating relationship needs one accountable primary owner.
- Ownership changes require reason, effective time, assigning authority, previous/new owner, and Audit evidence.
- Region, department, and assignment scopes must reuse the frozen Auth/RBAC model.
- Approval, export, suspension, archive, and high-risk reassignment require explicit authorization.
- A Dealer organization is never a User. Future external collaboration identity must remain separate from internal Admin identity.

## 7. Dealer Performance Evaluation

Performance evaluation supports internal review and Analytics. It must not overwrite Dealer facts, create public claims, or automatically determine lifecycle, tier, permissions, or commercial rights.

### 7.1 Evaluation Domains

| Domain | Example review signals | Source owner |
| --- | --- | --- |
| Qualification quality | Evidence completeness, fit review, exception frequency | Dealer Center / review evidence |
| Engagement | Agreed operating reviews, enablement participation, response continuity | CRM and governed operational records |
| Lead handling | Acceptance, response timeliness, disposition completeness, compliant follow-up | Lead Center and CRM |
| Market coverage | Verified region, industry, or solution activity | Dealer facts and approved operational evidence |
| Contribution | Qualified opportunities and governed conversion events | Analytics consuming Lead/Dealer facts |
| Data quality | Record completeness, currency, duplicate/exception handling | Dealer Center and governance review |
| Compliance | Export, privacy, claim, authorization, and conduct exceptions | Security, Audit, and approved review evidence |

### 7.2 Evaluation Controls

- Metric definitions and fact owners must be approved before scoring.
- Sensitive personal data must not be exposed to Analytics when aggregated or minimized data is sufficient.
- Review periods, minimum sample sizes, missing-data treatment, weights, and thresholds remain open.
- Negative decisions require traceable evidence and a human review path.
- Analytics consumes facts and events; it does not modify Dealer lifecycle or ownership.

## 8. Future System Capability Requirements

The following are future capability requirements, not implementation authorization:

1. **Dealer registry:** governed identity, lifecycle, classification, source, region, and relationship views.
2. **Qualification workspace:** evidence checklist, reviewer assignment, missing-evidence handling, decision rationale, and escalation.
3. **Lifecycle control:** authorized transition requests, approval separation, suspension/archive handling, and immutable audit trail.
4. **Ownership management:** primary owner, scoped collaborators, reassignment workflow, coverage review, and overdue ownership alerts.
5. **Lead handoff:** Partner Lead conversion traceability and governed Customer Lead assignment to eligible Active Dealers.
6. **CRM linkage:** Dealer-linked activities, tasks, opportunities, communications, and outcomes without copying CRM records into Dealer facts.
7. **Classification and tier review:** controlled vocabularies, evidence periods, human decisions, exceptions, and history.
8. **Performance review:** approved metric catalogue, evaluation periods, evidence lineage, commentary, and review decisions.
9. **Permission and audit:** stable Dealer Resource actions, scope/ownership checks, high-risk approval, export control, and complete Audit evidence.
10. **Privacy and retention:** data minimization, sensitive-field access, desensitization, archive, retention, and compliant export boundaries.
11. **Analytics handoff:** authorized, traceable Dealer attribution and conversion events that cannot rewrite Dealer facts.
12. **Operational readiness:** monitoring, logging, incident handling, backup/restore, rollback, and reconciliation criteria before any runtime release.

### Architecture Alignment Decision

This blueprint is aligned with the frozen module model and introduces no new Platform Capability. It prepares review detail inside Dealer Center and its existing Lead, CRM, CMS, Platform Assets, Auth/RBAC, Security/Audit, and Analytics dependencies.

Architecture Review approval is required before this blueprint can become an implementation input.
