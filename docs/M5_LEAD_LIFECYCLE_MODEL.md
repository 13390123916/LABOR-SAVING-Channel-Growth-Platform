# M5 Lead Lifecycle Model

Document responsibility: prepare an expanded Lead operating model while preserving the frozen M3.4 Lead Center canonical lifecycle and module boundaries.

Status: `PREPARATION DRAFT / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.0.2 CRM & Lead Architecture Design`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

- `docs/LEAD_CENTER.md` remains the canonical Lead domain owner.
- The current frozen canonical lifecycle remains `New -> Contacted -> Qualifying -> Assigned -> Won / Invalid`.
- The requested expanded M5 sequence is documented as a candidate workflow view, not an approved replacement lifecycle.
- CRM activity, Opportunity, Dealer, Customer relationship, Analytics, Authentication, and permission concerns remain outside Lead ownership.
- This document creates no database model, field, schema, migration, ORM, API, runtime, scoring engine, routing engine, permission, credential, or Admin UI.
- Replacing or reordering the frozen canonical Lead lifecycle requires Architecture Review and ADR discipline before any implementation design.

## 1. Lead Definition

Lead is a traceable business-data entry representing a real inquiry, application, referral, compliant import, or authorized manual intake that requires qualification and accountable follow-up.

Lead is:

- A record of business interest and contact purpose.
- A source-attributed entry into Sales or Partner qualification.
- A privacy-governed object with assignment, quality, lifecycle, and Audit requirements.
- A possible input to CRM and, for a qualified Partner Lead, a possible source for Dealer Prospect creation.

Lead is not:

- Website traffic, a page view, search impression, click, or anonymous campaign event.
- A Customer, Dealer, User, Partner Program, CRM Opportunity, quotation, contract, order, or public Entity.
- Proof of qualification, conversion, revenue, authorization, exclusivity, product fit, or commercial agreement.
- Public content and therefore does not produce public URL, Metadata, Schema, sitemap, or customer-case claims.
- A container for unnecessary sensitive personal information.

## 2. Lead Source Model

Lead source explains how a real Lead entered the platform. Source is distinct from Lead type, business intent, and qualification result.

| Source | Source meaning | Lead creation boundary |
| --- | --- | --- |
| SEO Traffic | Organic discovery through Baidu, 360, Sogou, Shenma, or other approved search entry | Traffic alone is not a Lead; a valid form, manual intake, referral, or compliant import creates the Lead |
| GEO Search | Discovery through domestic AI search or structured-answer channels | AI-search attribution does not prove intent or quality |
| Website Form | Valid submission from `/partner/`, product, industry, knowledge, or consultation entry | Purpose, required fields, consent/context, validation, and source page must be available |
| Dealer Referral | A Lead referred through an eligible Dealer relationship | Referring Dealer, purpose, contact basis, routing scope, and Audit requirements must be clear |
| Partner Lead | A Lead type representing channel cooperation interest | Partner Lead is a type, not a source; it retains its actual acquisition source |
| Campaign Source | Paid, social, event, QR, or approved campaign attribution | Campaign identity supports attribution only and must not overwrite submitted business facts |

Additional governed sources inherited from Lead Center may include Direct, Social, Manual, and compliant Import.

Source rules:

- Preserve first source and recent source according to the frozen attribution boundary.
- Keep source channel, source page, source entity, campaign context, Lead type, and cooperation intent conceptually separate.
- Dealer referral must not expose unrelated Dealer or customer data.
- Imported, manual, or campaign Leads require provenance and review; they do not receive automatic quality or priority.
- Source corrections require reason and Audit evidence.

## 3. Lead Lifecycle

### 3.1 Canonical Frozen Lifecycle

The current source-of-truth lifecycle remains:

```text
New
-> Contacted
-> Qualifying
-> Assigned
-> Won / Invalid
```

All current Lead lifecycle decisions must use this model until Architecture Review approves a change.

### 3.2 Candidate M5 Expanded Workflow

The requested M5 design candidate is:

```text
New
-> Captured
-> Qualified
-> Assigned
-> Contacted
-> Opportunity
-> Converted
-> Closed
```

This sequence is **not approved as the canonical Lead lifecycle** because it adds states and places `Contacted` after `Assigned`, which differs from the frozen Lead Center ordering. It may become either:

1. A derived cross-domain workflow view mapped to Lead and CRM source states; or
2. A replacement canonical lifecycle only after Architecture Review and an approved architecture change.

No implementation may infer the answer.

### 3.3 Candidate Stage Definitions

| Candidate stage | Business meaning | Proposed accountable owner | Candidate entry condition | Candidate exit/review condition |
| --- | --- | --- | --- | --- |
| New | A potential intake has entered initial review | Intake queue owner | Real submission/referral/manual/import context exists | Intake validity, purpose, provenance, and duplicate review are complete |
| Captured | Minimum intake and source context are accepted | Lead Owner | Required business/contact/source context is sufficiently complete | Human or governed review determines qualification path |
| Qualified | Fit and intent are sufficient for accountable follow-up | Lead Owner / qualification reviewer | Qualification evidence and rationale are recorded | Assignment scope and owner are approved |
| Assigned | One primary Lead Owner is accountable | Authorized assigner and Lead Owner | Routing basis, scope, and access are valid | Owner accepts and follow-up starts or reassignment is escalated |
| Contacted | A real contact attempt/result is recorded | Lead Owner or Sales Owner | Authorized contact purpose and channel are available | Next action, failed-contact handling, or opportunity decision is recorded |
| Opportunity | A concrete business need or cooperation opportunity is under CRM management | Sales Owner | Need, organization, fit, and next decision are sufficiently clear | Conversion, disqualification, pause, or return for qualification is reviewed |
| Converted | A valid outcome is accepted by the canonical destination owner | Sales Owner plus accepting owner | Decision evidence and required approval exist | Source Lead and destination relationship mappings are reconciled |
| Closed | No further active Lead work remains | Lead Owner / Manager | Converted, invalid, duplicate, declined, unreachable, or otherwise closed rationale is approved | Retention, privacy, Audit, and future re-entry rules apply |

### 3.4 Alignment with Canonical States

| Candidate concept | Current canonical treatment | Alignment decision needed |
| --- | --- | --- |
| New / Captured | Generally remains `New` until current contact/review progression | Decide whether Captured is an event, quality gate, or state |
| Qualified | Closest to completion of `Qualifying` | Decide whether it is a state or qualification result |
| Assigned | Maps to current `Assigned` | Decide whether assignment occurs before or after first contact |
| Contacted | Current canonical `Contacted` occurs before `Qualifying` and `Assigned` | Resolve ordering conflict |
| Opportunity | Closest to current `Won` meaning of valid opportunity, but CRM should own opportunity activity | Decide source-of-truth boundary and mapping |
| Converted | Could map to current `Won` after destination acceptance | Define acceptance owner and conversion evidence |
| Closed | Could summarize `Won`, `Invalid`, or a future closure view | Decide whether closure is a derived terminal view or canonical state |

### 3.5 Transition and Review Rules

- Every transition needs an actor, time, reason, previous/next state or view, evidence, and Audit requirement.
- Duplicate and spam detection produces review candidates, never automatic deletion.
- Qualification, routing, Dealer assignment, conversion, invalidation, and exceptional closure require human governance.
- A score or campaign source cannot directly change lifecycle state.
- Opportunity and CRM activity must not overwrite Lead facts.
- Partner Lead conversion must preserve the source Lead when creating a Dealer Prospect.
- Customer or Dealer creation must require acceptance by the canonical destination owner.
- Re-entry, reversal, reopening, and exceptional transitions remain open Architecture Review decisions.

## 4. Lead Scoring Model

Lead scoring is a future decision-support capability. It is not an automatic qualification, routing, lifecycle, permission, Dealer-assignment, or conversion mechanism.

| Dimension | Review purpose | Guardrail |
| --- | --- | --- |
| Intent | Assess clarity and relevance of inquiry or cooperation intent | Do not infer intent solely from traffic source or page views |
| Company fit | Assess organization type, industry, operating role, and stated needs | Self-declared facts require review; no public claim is created |
| Product interest | Assess alignment with confirmed product/solution scope | Do not invent availability, specification, price, or suitability |
| Location | Assess service, Sales, or Dealer routing relevance | Location does not grant regional exclusivity or authorization |
| Engagement | Assess completed interactions and response continuity | Use only authorized, necessary, and reliable activity evidence |

Scoring controls:

- Scores are advisory inputs to human review.
- Dimensions, evidence sources, weights, thresholds, missing-data treatment, expiry, and recalculation rules require approval.
- Partner Lead and Customer Lead may require different reviewed models.
- Score changes require source lineage and explanation.
- Protected, unrelated sensitive, or speculative data must not be used.
- Low score must not cause automatic deletion, denial, archive, or loss of required follow-up.
- No score may be published as a customer, Dealer, market, or commercial claim.

## 5. Lead Routing Model

Routing recommends or assigns an accountable handling path under human governance.

| Routing dimension | Possible use | Required control |
| --- | --- | --- |
| Geographic | Route to an eligible region queue, Sales team, or Active Dealer review | Region scope, capacity, privacy, and no-exclusivity boundary |
| Product | Route to a qualified product/solution owner | Use confirmed product scope; avoid automated suitability claims |
| Dealer assignment | Propose Customer Lead assignment to an eligible Active Dealer | Dealer state, scope, conflict, consent/purpose, data minimization, and human approval |
| Sales ownership | Assign one primary Lead Owner or Sales queue | Workload, role/scope authorization, acceptance, SLA, and reassignment evidence |

Routing rules:

- Partner Leads default to a Partner Manager review path; Customer Leads default to a Sales review path unless approved routing says otherwise.
- One Lead has no more than one primary Lead Owner at a time.
- Routing candidates may be ranked, but assignment requires an authorized decision where business risk exists.
- Dealer assignment does not transfer canonical customer ownership or unrestricted personal data.
- Suspended or Archived Dealers are ineligible; Active status alone does not guarantee assignment.
- Routing must support no-match, conflict, overload, unavailable-owner, exception, and manual escalation outcomes.
- Reassignment requires reason, previous/new owner, authority, effective time, open-work handoff, and Audit evidence.

## 6. Dependencies

| Dependency | Lead input/output boundary |
| --- | --- |
| Website / CMS / SEO / GEO | Provide approved entry, source, and content context; traffic alone does not create a Lead |
| Lead Center | Canonical Lead identity, type, lifecycle, attribution, assignment, privacy, quality, export, and Audit owner |
| CRM | Consumes authorized Lead handoff and returns activity/outcome evidence; does not own canonical Lead states |
| Dealer Center | Accepts qualified Partner Lead conversion into Dealer Prospect and governs Customer Lead assignment boundary |
| Authentication / RBAC | Provides identity, Resource, Action, Scope, Ownership, and access decisions |
| Security / Audit | Governs privacy, export, high-risk actions, retention, and traceable evidence |
| Analytics | Consumes authorized, minimized attribution and conversion events without changing Lead facts |
| Future Customer owner | Accepts a converted Customer relationship under a future canonical boundary |

## 7. Open Questions

Architecture Review must resolve:

1. **Lead conversion boundary:** does conversion mean a valid Opportunity, accepted Dealer Prospect, accepted Customer relationship, transaction outcome, or another governed event?
2. **CRM ownership rules:** when do Lead Owner and Sales Owner diverge, and which owner may propose or accept lifecycle changes?
3. **Dealer assignment timing:** does Dealer routing occur before CRM qualification, after qualification, after first contact, or only after manager review?
4. **Partner Lead conversion point:** exactly when is Dealer Prospect created, and when does the source Partner Lead become `Won` or closed?
5. **SLA definition:** which response, contact, qualification, assignment, reassignment, and escalation expectations apply to each Lead type and priority?
6. **Human approval requirements:** which qualification, routing, conversion, invalidation, closure, import, export, and reassignment actions require explicit approval?
7. **Future automation boundaries:** may automation validate intake, recommend scores/routes, create reminders, or escalate SLA risk, and which decisions must remain human?
8. **Lifecycle alignment:** should the candidate expanded sequence be a derived workflow view or replace the frozen canonical lifecycle through approved architecture change?
9. **Contact/assignment ordering:** must first contact occur before assignment, after assignment, or under two distinct intake and Sales ownership steps?
10. **Closed semantics:** is Closed a derived view across `Won` and `Invalid`, a CRM phase, or a future canonical Lead state?

Architecture Review approval is required before this preparation draft can become an implementation input.
