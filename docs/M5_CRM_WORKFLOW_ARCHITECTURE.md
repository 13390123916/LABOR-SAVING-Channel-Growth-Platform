# M5 CRM Workflow Architecture

Document responsibility: prepare the future CRM business workflow while preserving the frozen Lead Center, Dealer Center, Authentication, Security, and Analytics boundaries.

Status: `PREPARATION DRAFT / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.0.2 CRM & Lead Architecture Design`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

This document applies `Freeze First -> Validate Second -> Execute Last`.

- CRM is a future operating capability, not a replacement for Lead Center or Dealer Center.
- Lead Center remains the source of truth for Lead intake, attribution, lifecycle, assignment, quality, privacy, and CRM handoff.
- Dealer Center remains the source of truth for durable channel identity, lifecycle, region/cooperation relationships, and Dealer ownership.
- CRM workflow phases do not redefine canonical Lead or Dealer lifecycle states.
- This document defines no database model, schema, migration, ORM, API, runtime workflow, permission implementation, credential, or Admin UI.
- Any change to a frozen lifecycle, module boundary, permission/privacy rule, or core data model requires Architecture Review and existing ADR discipline.

## 1. CRM Business Purpose

CRM exists to make human business follow-up accountable, continuous, and reviewable after a Lead enters the platform. It coordinates work around a Lead, Dealer, future Customer relationship, or Opportunity without becoming the canonical owner of those business objects.

CRM addresses these business problems:

- Follow-up responsibilities are unclear or transferred without traceability.
- Calls, meetings, messages, tasks, and decisions are fragmented.
- Qualification context is lost between Lead intake and Sales or Partner operations.
- Opportunities, quotations, and conversion decisions lack a consistent review history.
- Management cannot identify overdue actions, stalled opportunities, ownership gaps, or escalation needs.
- Dealer and customer relationship activities cannot be reviewed without mixing activity records into canonical object facts.

### 1.1 Relationship with Lead Center

Lead Center owns the Lead. CRM consumes an authorized Lead handoff and records follow-up work.

```text
Lead Center
-> approved CRM handoff
-> CRM follow-up / task / opportunity activity
-> outcome returned to Lead Center under an approved mapping
```

CRM must not independently change Lead source, deduplication, privacy status, canonical lifecycle, or assignment facts. A CRM outcome may propose a Lead transition, but the canonical transition remains governed by Lead Center.

### 1.2 Relationship with Dealer Center

Dealer Center owns the durable Dealer relationship. CRM records calls, visits, tasks, opportunities, negotiation activity, and outcomes around that Dealer.

```text
Dealer Center
-> CRM relationship activity
-> governed decision evidence
-> Dealer Center lifecycle decision
```

CRM does not approve, activate, suspend, archive, classify, tier, or transfer ownership of a Dealer. It may supply evidence to an authorized Dealer decision.

## 2. CRM Workflow Model

The M5 CRM workflow is a cross-domain operating flow, not a single canonical status field:

```text
Lead
-> Qualification
-> Assignment
-> Follow-up
-> Opportunity
-> Quotation
-> Conversion
-> Customer Relationship
```

| Phase | Business status meaning | Primary ownership | Entry condition | Exit condition | Human approval point |
| --- | --- | --- | --- | --- | --- |
| Lead | Authorized Lead context is available for CRM work | Lead Owner | Lead exists under Lead Center governance | Handoff scope and responsible queue are confirmed | Required for sensitive-data access or exceptional handoff |
| Qualification | Business need, fit, urgency, authority, and next action are being assessed | Lead Owner or assigned Sales Owner | Contact purpose and minimum context are available | Qualification result and rationale are recorded | Required for exceptional qualification or Partner-to-Dealer conversion proposal |
| Assignment | One accountable owner receives the next CRM responsibility | Manager or authorized assigner | Work is eligible for routing | Primary owner accepts or the assignment is escalated | Required for reassignment, cross-region routing, or Dealer routing |
| Follow-up | Calls, meetings, messages, and tasks progress the business conversation | Sales Owner | Owner and next action are defined | Opportunity criteria are met or the Lead is closed/returned | Manager review for SLA breach, sensitive exception, or stalled work |
| Opportunity | A concrete, reviewable business opportunity is being developed | Sales Owner | Need, organization, scope, and expected next decision are sufficiently clear | Quotation is justified, opportunity is declined, or more qualification is required | Required for high-risk exception or Partner/Dealer scope impact |
| Quotation | A controlled commercial proposal is coordinated and tracked | Sales Owner with approved commercial authority | Opportunity scope and quotation authority are confirmed | Proposal is issued, revised, withdrawn, accepted, or declined | Explicit commercial approval required; CRM is not the price or contract source |
| Conversion | The outcome is reviewed and source objects receive governed transition proposals | Sales Owner and Manager | Decision evidence is available | Lead/Dealer/Customer-related source owners accept the mapped outcome | Explicit human confirmation required |
| Customer Relationship | Ongoing relationship activities continue after conversion | Relationship Owner to be approved | A valid conversion and accountable relationship owner exist | Relationship continues, is handed over, paused, or closed | Ownership transfer and high-risk closure require approval |

### 2.1 Workflow Transition Rules

- Each phase change needs an actor, effective time, reason, supporting activity/evidence, previous phase, next phase, and Audit requirement.
- Phase progression is not automatically linear; return for clarification or requalification must be explicit and traceable.
- No phase may be skipped merely because an imported or campaign-sourced record appears high value.
- `Quotation` records coordination and decision history; it does not own product facts, price policy, contract terms, approval authority, or accounting.
- `Conversion` is not a public success claim and must not automatically create a Customer or Dealer object.
- `Customer Relationship` is a future operating view. The canonical owner of a future Customer business object remains an open architecture decision.

### 2.2 Outcome Handling

CRM preparation recognizes these outcome categories without defining schema values:

- Advance to the next workflow phase.
- Return for additional qualification.
- Reassign with documented authority and reason.
- Pause pending customer, Partner, Dealer, product, commercial, or compliance input.
- Close as converted, declined, invalid, duplicate, unreachable, or no longer active under an approved mapping.

Outcome categories must map back to canonical Lead and Dealer decisions rather than creating conflicting states.

## 3. CRM Ownership Model

Ownership means accountability for the current object or work item. It does not itself grant permission.

| Ownership role | Owns | Does not own |
| --- | --- | --- |
| Lead Owner | Lead review, Lead next action, and Lead Center handoff accountability | Dealer relationship, CRM opportunity, or unrestricted contact-data access |
| Sales Owner | CRM follow-up, tasks, opportunity progression, and communication continuity | Canonical Lead source/lifecycle, Dealer lifecycle, pricing authority, or permission policy |
| Dealer Owner | Durable Dealer relationship continuity and Dealer review coordination | Individual CRM tasks, Lead source facts, or automatic commercial approval |
| Manager Role | Assignment governance, escalation, workload review, approval checkpoints, and exception review | Automatic ownership of every Lead, Dealer, or Opportunity |

### 3.1 Single Ownership Principle

- Each Lead, CRM Opportunity, CRM Task, and Dealer relationship must have no more than one primary accountable owner at a time.
- Different objects may have different primary owners; single ownership does not collapse Lead Owner, Sales Owner, and Dealer Owner into one person.
- Contributors, reviewers, and watchers may support work but are not co-primary owners.
- Ownership transfer requires previous owner, new owner, reason, effective time, assigning authority, unresolved-work handoff, and Audit evidence.
- Temporary absence or escalation must use delegation or reassignment rules approved during Architecture Review.
- Ownership never overrides RBAC Scope, privacy, region, assignment, or high-risk action approval.

## 4. CRM Activity Model

CRM activities are operational evidence around source business objects. They are not canonical Lead, Dealer, Product, Customer, price, or contract facts.

### 4.1 Tasks

Tasks represent accountable future work, such as contact, information collection, internal review, meeting preparation, quotation coordination, or follow-up.

Preparation requirements:

- One primary task owner.
- Business purpose and linked source context.
- Due expectation and priority definition to be approved.
- Completion, cancellation, reassignment, and escalation rationale.
- No task may authorize a Lead, Dealer, quotation, contract, or permission change.

### 4.2 Follow-up Records

Follow-up records capture a factual summary of a completed interaction, its outcome, and next action.

- Distinguish factual statements, customer/partner statements, internal assessment, and future action.
- Record only information necessary for the stated business purpose.
- Avoid unsupported promises, speculative product claims, or sensitive personal information.
- Corrections must preserve history rather than silently overwrite evidence.

### 4.3 Communication History

Communication history may reference calls, meetings, email, approved enterprise messaging channels, or in-person interactions.

- Channel, time, participants, purpose, summary, outcome, and next action require accountable capture.
- Message content retention, attachment handling, recording consent, and external-channel integration remain open compliance decisions.
- CRM must not claim that a message was delivered or accepted without reliable evidence.

### 4.4 Opportunity Activities

Opportunity activities coordinate discovery, requirement clarification, solution discussion, internal review, quotation preparation, decision follow-up, and outcome recording.

- Opportunity activity does not redefine Product facts or invent availability, certification, pricing, delivery, or customer cases.
- Quotation and contract artifacts require separately approved ownership and authority.
- Opportunity outcome may inform Analytics only through approved, traceable, and privacy-minimized events.

## 5. CRM Boundary

### CRM Owns

- Follow-up records and communication history.
- Tasks, reminders, next actions, and escalations.
- Opportunity activity and stage coordination.
- Quotation coordination status and references, not authoritative pricing or contract content.
- CRM work ownership and handoff evidence.
- Conversion evidence and proposed outcome mappings.
- Ongoing relationship activity after conversion, pending a canonical Customer ownership decision.

### CRM Does Not Own

- Lead creation, source attribution, canonical Lead lifecycle, deduplication, privacy, or Lead assignment facts: Lead Center owns them.
- Dealer identity, classification, tier, lifecycle, region scope, approval, activation, suspension, or archive: Dealer Center owns them.
- Analytics definitions, attribution logic, dashboards, or source-fact correction: Analytics consumes approved facts.
- User identity, Role, Permission, Resource, Action, Scope, or access decisions: Authentication/RBAC owns them.
- Security policy, Audit retention, export authority, consent rules, or permission changes: Security/Audit governance owns them.
- Product facts, public content, pricing policy, contracts, settlement, accounting, service delivery, or legal authorization.

## 6. Dependencies

| Dependency | Required CRM input | CRM output boundary |
| --- | --- | --- |
| Lead Center | Authorized Lead context, source, status, assignment, privacy scope | Activity and outcome evidence; canonical changes remain Lead Center decisions |
| Dealer Center | Dealer identity, lifecycle, owner, region/cooperation scope | Relationship activity and decision evidence only |
| CMS / Platform Assets | Approved content and public facts | References without modifying source facts |
| Authentication / RBAC | Identity, Action, Resource, Scope, Ownership authorization | No permission or identity mutation |
| Security / Audit | Privacy, export, high-risk approval, retention, and evidence rules | Traceable activities and high-risk action evidence |
| Analytics | Approved metric and event contracts | Minimized, authorized workflow events that cannot rewrite CRM facts |
| Future Customer owner | Canonical Customer identity and lifecycle decision | Relationship activity linkage only |

## 7. Open Questions

Architecture Review must resolve:

1. **Lead conversion boundary:** which CRM evidence is sufficient to propose `Won`, and which owner accepts the canonical Lead transition?
2. **CRM ownership rules:** when may Lead Owner and Sales Owner differ, and who approves transfer or temporary delegation?
3. **Dealer assignment timing:** may an Active Dealer receive a Customer Lead before CRM qualification, or only after an approved routing review?
4. **Partner Lead conversion point:** when does a qualified Partner Lead establish a Dealer Prospect, and when does the source Lead become `Won`?
5. **SLA definition:** which response, follow-up, reassignment, escalation, and stale-work expectations apply by Lead type and priority?
6. **Human approval requirements:** which opportunity, quotation, conversion, reassignment, closure, export, and exception actions require manager or specialist approval?
7. **Future automation boundaries:** which reminders or routing suggestions may be automated, and which transitions must remain human decisions?
8. **Customer ownership:** which future module owns canonical Customer identity, lifecycle, account relationship, and archive rules?
9. **Quotation boundary:** which owner controls price, proposal version, commercial approval, expiry, withdrawal, and contract handoff?
10. **Activity retention:** what retention, correction, attachment, communication-channel, and privacy rules apply?

Architecture Review approval is required before this preparation draft can become an implementation input.
