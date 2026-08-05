# M5 Lead / CRM Boundary Decision

Document responsibility: define the Lead Center and CRM ownership boundary before future implementation while preserving frozen platform architecture and prior M5 preparation decisions.

Status: `PREPARATION DECISION DRAFT / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.0.3 Lead / CRM Boundary Architecture Review`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

This document applies `Freeze First -> Validate Second -> Execute Last`.

- Lead Center remains the canonical owner of Lead identity and state.
- CRM remains a cross-domain operating capability, not a master-data layer.
- Dealer Center remains the canonical owner of Dealer identity and lifecycle.
- Customer canonical ownership remains undecided.
- The frozen Lead lifecycle and the CRM operating pipeline remain independent models.
- This document creates no database model, schema, field, ORM, migration, API, event bus, runtime workflow, permission, credential, automation engine, or Admin UI.
- Any future change to a frozen lifecycle, module boundary, core data model, permission/privacy rule, or Platform Capability requires Architecture Review and existing ADR discipline.

# 1. Lead Center Responsibility

Lead Center owns the complete canonical Lead record from valid intake through final Lead disposition.

| Responsibility | Lead Center ownership decision |
| --- | --- |
| Lead identity | Creates and preserves the stable Lead identity and its traceable source relationship |
| Lead capture | Accepts valid website submissions, referrals, authorized manual intake, and compliant imports; anonymous traffic is not a Lead |
| Lead attribution | Owns first/recent source, channel, page, source entity, campaign context, Lead type, and intent separation |
| Lead lifecycle | Owns canonical state and transition acceptance under the frozen lifecycle |
| Lead assignment | Owns the primary Lead Owner/queue assignment and governed reassignment record |
| Lead quality | Owns duplicate/spam candidates, qualification context, quality review, invalid reason, and evidence lineage |
| Privacy controls | Owns purpose, data minimization, sensitive-field handling, desensitization/archive requests, and Lead export boundary |

The frozen canonical Lead lifecycle remains:

```text
New
-> Contacted
-> Qualifying
-> Assigned
-> Won / Invalid
```

### Why Lead Center Remains Canonical

- Lead is a business-data entry domain with its own identity, attribution, privacy, quality, assignment, lifecycle, and Audit obligations.
- Source and consent context exist before CRM work and must survive even when CRM activities are absent, closed, or transferred.
- Multiple CRM activities or opportunities may refer to one Lead; none should redefine the Lead's canonical identity.
- Keeping transition acceptance in Lead Center prevents CRM stage changes from silently rewriting acquisition, qualification, or final Lead disposition.
- Dealer conversion and future Customer acceptance require cross-domain decisions; CRM evidence alone cannot create or own those canonical objects.

CRM may propose a Lead outcome and provide evidence. Lead Center decides whether the proposal satisfies an allowed canonical transition.

# 2. CRM Responsibility

CRM owns the operational work performed around an authorized Lead, Dealer, future Customer relationship, or Opportunity.

| Responsibility | CRM ownership decision |
| --- | --- |
| Follow-up activities | Records accountable interaction outcomes, next actions, and follow-up continuity |
| Tasks | Owns work items, task owner, due expectation, completion/cancellation, reassignment, and escalation evidence |
| Communication history | Records necessary, factual, privacy-governed summaries of calls, meetings, messages, and other approved channels |
| Opportunity coordination | Owns opportunity activity, progression evidence, review context, and return/pause/close recommendations |
| Sales workflow | Coordinates qualification activity, CRM work assignment, follow-up, opportunity, quotation coordination, and conversion review |
| Conversion evidence | Preserves the activities, decisions, approvals, and outcome rationale supporting a conversion proposal |

### Why CRM Is an Operational Layer

- CRM records what operators do; Lead Center and Dealer Center own what their canonical objects are.
- Activity history may be corrected or extended without changing source identity, attribution, lifecycle, region, or permission facts.
- CRM stages organize work and may progress differently from the canonical Lead lifecycle.
- An Opportunity or quotation can be paused, declined, reopened, or replaced without recreating the source Lead or changing Dealer identity.
- CRM coordinates quotation status but does not own price policy, product facts, contract terms, legal authorization, settlement, or accounting.
- CRM conversion evidence supports decisions; it does not automatically approve a Lead, create a Dealer, create a Customer, or transfer ownership.

# 3. Responsibility Matrix

| Capability | Owner |
| --- | --- |
| Lead Capture | Lead Center |
| Lead Identity | Lead Center |
| Lead Attribution | Lead Center |
| Lead Lifecycle | Lead Center |
| Lead Assignment | Lead Center |
| Activity History | CRM |
| Opportunity | CRM |
| Quotation Coordination | CRM; authoritative pricing, approval, and contract ownership remain outside this decision |
| Conversion Evidence | CRM produces evidence; canonical source/destination owners accept the outcome |
| Customer Relationship | `UNDECIDED`; options assessed in Section 6 |

Additional boundary decisions:

| Capability | Owner |
| --- | --- |
| Dealer identity, lifecycle, region, and relationship ownership | Dealer Center |
| Partner Program content and acquisition proposition | Partner System / CMS |
| Identity and access decisions | Authentication / RBAC |
| Privacy policy, high-risk actions, export, and Audit governance | Security / Permission / Audit |
| Attribution and measurement definitions | Analytics, consuming authorized source facts |

# 4. Lead Lifecycle vs CRM Pipeline Separation

## 4.1 Lead Lifecycle

**Owner:** Lead Center.

| Lead state | Meaning | Transition authority |
| --- | --- | --- |
| New | Valid Lead exists and has not completed first contact | Lead Center under authorized intake/review rules |
| Contacted | A real contact result has been accepted | Authorized Lead Owner; CRM activity may supply evidence |
| Qualifying | Fit, need, intent, region, or cooperation context is under review | Authorized Lead Owner or qualification reviewer |
| Assigned | Lead Center has accepted one accountable Lead Owner/queue assignment | Authorized Lead assigner; reassignment is separately governed |
| Won | Valid cooperation or business opportunity outcome is accepted | Lead Center after required human and destination-owner review |
| Invalid | Duplicate, unreachable, non-target, prohibited, or otherwise invalid reason is accepted | Authorized Lead reviewer; reason and Audit evidence required |

Lead lifecycle state answers: **what is the current canonical disposition of this Lead?**

## 4.2 CRM Pipeline

**Owner:** CRM for operational activity and stage coordination.

```text
Lead Context
-> Qualification Activity
-> CRM Work Assignment
-> Follow-up
-> Opportunity
-> Quotation Coordination
-> Conversion Review
-> Relationship Activity
```

| CRM stage | Meaning | Activity progression |
| --- | --- | --- |
| Lead Context | Authorized Lead facts are available for CRM work | Confirm purpose, privacy scope, and responsible work queue |
| Qualification Activity | CRM captures interactions and evidence supporting qualification | Record questions, responses, evidence gaps, and next action |
| CRM Work Assignment | One Sales Owner is accountable for CRM work | Accept, reassign, or escalate the operational workload |
| Follow-up | Calls, meetings, messages, and tasks progress the conversation | Complete next actions or return for qualification |
| Opportunity | A concrete business opportunity is being coordinated | Develop scope, decision path, risks, and required approvals |
| Quotation Coordination | Approved commercial participants coordinate proposal status | Prepare, review, issue, revise, withdraw, accept, or decline under external authority |
| Conversion Review | CRM compiles outcome evidence and proposes source/destination changes | Obtain human approval and destination-owner acceptance |
| Relationship Activity | Ongoing activity continues after an accepted conversion | Link to the approved Customer/Dealer owner without taking canonical ownership |

CRM pipeline stage answers: **what operational work is currently being performed?**

`CRM Work Assignment` is not the canonical Lead `Assigned` state. It assigns CRM work to a Sales Owner; Lead Center independently owns Lead assignment.

## 4.3 Synchronization Without Ownership Conflict

Synchronization follows a proposal-and-acceptance model:

1. Lead Center provides an authorized Lead snapshot and handoff context.
2. CRM opens operational work without copying canonical ownership.
3. CRM records activities, tasks, Opportunity progression, and evidence.
4. CRM emits a conceptual outcome proposal when Lead or Dealer state may need review.
5. The canonical owner validates the proposal against its lifecycle, permissions, privacy, and approval rules.
6. The canonical owner accepts or rejects the transition.
7. CRM reconciles its pipeline view to the accepted source state without rewriting it.

Controls:

- Source object identifier, source version/status, actor, time, reason, evidence reference, and approval result must remain traceable in future design.
- CRM may not infer acceptance from its own stage progression.
- Lead Center may reject a CRM proposal without deleting CRM activity history.
- Dealer Center may accept a Dealer decision only under its frozen lifecycle and ownership rules.
- Analytics receives accepted, authorized events and cannot resolve synchronization conflicts.

# 5. Event Flow Architecture

The following events are conceptual governance handoffs, not runtime event schemas or implementation authorization.

```text
Traffic
-> Lead Capture
-> Lead Center
-> CRM Activity
-> Opportunity
-> Conversion Event
-> Customer
```

| Transition | Source | Owner | Event meaning | Approval requirement |
| --- | --- | --- | --- | --- |
| Traffic -> Lead Capture | Website, SEO/GEO entry, campaign, referral, manual/import channel | Source channel for context; Lead Center for acceptance | A real submission or authorized intake occurs; anonymous traffic alone remains non-Lead | Normal intake validation; human review for import, referral, provenance, or privacy exception |
| Lead Capture -> Lead Center | Valid intake context | Lead Center | Lead identity, source, type, privacy purpose, and initial canonical state are accepted | Authorized intake rules; human review for duplicate, spam, sensitive, or incomplete cases |
| Lead Center -> CRM Activity | Authorized Lead handoff | Lead Center accepts handoff; CRM owns activity | CRM work begins with permitted Lead context and one operational owner | Human/authorized assignment where scope, region, sensitive data, Dealer, or exception risk exists |
| CRM Activity -> Opportunity | Follow-up and qualification evidence | CRM | A concrete business opportunity is proposed and operationally tracked | Human Opportunity acceptance; specialist/manager review for high-risk or unsupported scope |
| Opportunity -> Conversion Event | Opportunity and quotation outcome evidence | CRM proposes; canonical owners decide | CRM requests acceptance of a business outcome and relevant source/destination transitions | Explicit human approval and destination-owner acceptance |
| Conversion Event -> Customer | Accepted conversion evidence | Customer owner remains undecided | A canonical Customer relationship may be created or linked | Explicit approval by the selected Customer owner; no automatic creation |

Partner-specific branch:

```text
Partner Lead
-> qualification evidence
-> conversion proposal
-> Dealer Center acceptance
-> Dealer Prospect
```

Dealer Center, not CRM, accepts Dealer Prospect creation. The Partner Lead remains traceable and its canonical disposition remains a Lead Center decision.

# 6. Customer Ownership Options

No option is selected in M5.0.3.

## Option A: CRM Owns Customer

**Advantages**

- Direct continuity from conversion evidence to relationship activity.
- Fewer handoffs for Sales users.
- Simpler early operational navigation and ownership coordination.

**Risks**

- Couples canonical master data to an activity-oriented system.
- CRM stage or workflow changes could affect identity and lifecycle semantics.
- Customer data may later be duplicated across ERP, service, order, finance, or Dealer-facing systems.
- Expands CRM beyond the currently approved cross-domain operating boundary.

**Boundary impact**

- CRM becomes both operational layer and Customer master-data owner.
- Requires explicit Architecture Review of Customer identity, lifecycle, privacy, ownership, and integration boundaries.
- May require a major architecture decision because the current CRM boundary explicitly excludes canonical Customer ownership.

## Option B: Customer Center Owns Customer

**Advantages**

- Separates durable Customer identity/lifecycle from CRM activities.
- Provides a stable owner for Customer relationships across CRM, service, order, Dealer, Analytics, and future integrations.
- Matches the existing separation between Dealer business object and CRM activity.

**Risks**

- Introduces a new Platform Capability and additional governance/ownership complexity.
- Creates synchronization, duplication, and user-workflow overhead if boundaries are weak.
- Risks premature architecture without approved Customer business requirements.

**Boundary impact**

- Requires Platform Module Intake Gate, Architecture Review, roadmap placement, owner document, and likely ADR before adoption.
- CRM remains an operational consumer/producer of Customer-linked activities.
- Customer Center would need explicit boundaries with Dealer, Lead, CRM, ERP, Analytics, Security, and Platform Assets.

## Option C: External ERP / Business System Owns Customer

**Advantages**

- Reuses an established enterprise customer/account authority where one exists.
- Reduces duplicate commercial, order, finance, tax, or settlement master data.
- Keeps CRM focused on pre-sale and relationship activity.

**Risks**

- External availability, latency, identifier quality, access, and integration constraints become critical dependencies.
- ERP customer semantics may begin only after transaction or account creation and may not cover pre-sale relationships.
- Integration failure can block reconciliation or leave CRM with stale relationship context.
- Privacy, regional access, retention, and system-of-record conflicts may be harder to govern.

**Boundary impact**

- Requires an approved integration boundary, identifier mapping, conflict resolution, failure handling, security review, and audit model.
- CRM may hold only linked operational context, not a competing Customer master.
- A repository-local pre-customer or relationship concept may still be required, subject to Architecture Review.

# 7. Automation Boundary

## 7.1 Allowed Future Automation Candidates

Automation may assist operators after architecture, security, privacy, evidence, and implementation approval:

- Assignment suggestions based on approved region, product, workload, Lead type, and scope rules.
- Lead scoring assistance using approved, explainable, non-sensitive dimensions.
- Reminder and overdue-task generation.
- SLA-risk notification and escalation suggestions.
- Duplicate or incomplete-record candidates for human review.
- Next-action suggestions based on recorded workflow context.
- Synchronization mismatch alerts between accepted canonical state and CRM pipeline view.

Allowed automation must be explainable, traceable, reversible, permission-aware, and unable to bypass human approval.

## 7.2 Not Allowed Without Governance Approval

- Automatic Lead approval, Dealer approval, Opportunity approval, quotation approval, or Customer creation.
- Automatic canonical lifecycle transition.
- Automatic Lead, Sales, Dealer, or Customer ownership transfer.
- Automatic Partner Lead-to-Dealer conversion.
- Automatic Customer Lead assignment to a Dealer without approved routing and human governance.
- Automatic invalidation, deletion, archive, desensitization, import, export, or public claim generation.
- Automatic permission, Role, Scope, privacy, or retention change.
- Automatic conversion acceptance based only on score, campaign source, CRM stage, or activity volume.

# 8. Architecture Consistency Decision

The reviewed M5 documents remain aligned:

- `M5_DEALER_CHANNEL_ARCHITECTURE.md`: Dealer Center owns Dealer facts and lifecycle; CRM owns related activity only.
- `M5_PARTNER_MANAGEMENT_MODEL.md`: Partner Management remains orchestration across Partner Program, Lead, Dealer, CRM, and Analytics.
- `M5_CRM_WORKFLOW_ARCHITECTURE.md`: CRM remains the operational activity and evidence layer.
- `M5_LEAD_LIFECYCLE_MODEL.md`: the frozen Lead lifecycle remains canonical; the expanded sequence remains a candidate workflow pending review.

This boundary decision introduces no new Platform Capability and does not select a Customer owner.

# 9. Open Architecture Questions

Architecture Review must resolve:

1. Which Customer ownership option, if any, is adopted?
2. What exact evidence and authority allow CRM to propose Lead `Won` or `Invalid`?
3. When do Lead Owner and Sales Owner differ, and how are conflicts resolved?
4. When may a Customer Lead be proposed for Active Dealer assignment?
5. When does a Partner Lead create a Dealer Prospect, and when does the Lead reach `Won`?
6. Is the expanded M5 Lead sequence a derived view or a future canonical lifecycle change?
7. What SLA rules apply by Lead type, priority, source, and assigned owner?
8. Which workflow, quotation, conversion, reassignment, closure, and exception steps require manager or specialist approval?
9. Which automation candidates are sufficiently explainable and low-risk for future approval?
10. Which system owns authoritative quotation, price, contract, order, and post-conversion service facts?
11. How are event proposal rejection, retry, reconciliation, and stale-version conflicts governed?
12. What Customer/Lead/CRM activity retention, privacy, correction, and archive rules apply?

Architecture Review approval is required before this preparation decision can become an implementation input.
