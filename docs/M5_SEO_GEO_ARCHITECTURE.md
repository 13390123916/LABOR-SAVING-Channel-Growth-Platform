# M5 SEO / GEO Growth Platform Architecture

Document responsibility: prepare the SEO/GEO growth-capability architecture while preserving frozen platform ownership, existing URL architecture, Entity governance, publication gates, and the M4 runtime lock.

Status: `PREPARATION DRAFT / ARCHITECTURE REVIEW REQUIRED`\
Phase: `M5.1 SEO/GEO Growth Platform Architecture Design`\
Runtime boundary: `LOCKED / BLOCKED / NOT AUTHORIZED`

## 0. Governance Boundary

This document applies `Freeze First -> Validate Second -> Execute Last`.

- SEO/GEO is a growth capability that consumes approved public facts and content.
- CMS remains the content maintenance and publication-workflow owner.
- Entity and module owners remain the authority for Company, Brand, Product, Industry, Partner, and other facts.
- Lead Center remains the canonical owner of captured Leads, attribution, lifecycle, assignment, quality, and privacy.
- CRM remains the operational activity layer; Dealer Center remains the Dealer owner; Analytics remains a read-only consumer of approved facts/events.
- Existing canonical routes from `docs/WEBSITE_ARCHITECTURE.md` and `docs/WEBSITE_SEO_BLUEPRINT.md` are preserved.
- This document defines no route implementation, page code, CMS runtime, database model, API, Schema markup, sitemap generator, index submission, monitoring runtime, permission, credential, or production action.
- Any new Platform Capability, canonical entity type, route-family replacement, ownership change, or structured-data contract requires Architecture Review and existing ADR discipline.

# 1. SEO/GEO Business Objective

## 1.1 Why SEO Exists

SEO makes approved platform information discoverable in the China-first search ecosystem and connects real search demand to relevant product, application, solution, knowledge, and Partner content.

SEO should enable:

- Search traffic from product, category, industry, application, problem, solution, technical, and channel-cooperation queries.
- Product and solution discovery through stable URLs and internal relationships.
- Industry authority through factual application and technical content.
- Qualified inquiry opportunities through clear consultation and Partner pathways.
- Long-term, reviewable search assets rather than temporary campaign pages or keyword duplication.

Primary ecosystems include Baidu, 360, Sogou, Shenma, WeChat search, and other approved mainland discovery channels. Google is not the default architecture driver for this repository.

## 1.2 Why GEO Exists

GEO makes the company, brand, products, applications, industries, and cooperation model understandable and quotable by domestic AI search and answer systems.

GEO should enable systems such as DeepSeek, Doubao, Tencent Yuanbao, Kimi, and Tongyi Qianwen to identify:

- Who LABOR-SAVING is.
- Which facts are verified and current.
- What each product or category is.
- Who and which applications it may suit.
- Which problems or operating contexts it addresses.
- What limitations or evidence gaps remain.
- How a user can consult or apply for cooperation.

GEO is not permission to create unsupported claims, hidden machine-only content, synthetic customer evidence, or unverifiable product facts.

## 1.3 Traffic and Lead Generation

```text
Search / AI Search Discovery
-> Indexed Landing Page
-> Content Engagement
-> Valid Lead Capture
-> Lead Center
-> CRM / Dealer workflow under existing boundaries
-> Analytics as read-only consumer
```

- Traffic, impressions, citations, clicks, and page engagement are acquisition signals, not Leads.
- A Lead exists only after a valid form, referral, authorized manual intake, or compliant import is accepted by Lead Center.
- SEO/GEO may supply source context and landing-page attribution but does not own Lead identity, lifecycle, assignment, scoring, routing, CRM outcome, Dealer state, or Customer ownership.

## 1.4 Capability Boundary

SEO/GEO is:

- A growth and discovery capability.
- A consumer of approved Entity, Metadata, content, media, public asset, and publication facts.
- A producer of URL, indexing, internal-linking, search presentation, entity-clarity, and monitoring requirements.

SEO/GEO is not:

- A CMS replacement.
- A content fact owner.
- A Lead database or lifecycle owner.
- A CRM, Dealer, Customer, Analytics, permission, or publishing-approval system.

# 2. URL Architecture Design

## 2.1 Canonical Route Decision

The requested conceptual navigation maps to the existing canonical route architecture as follows:

```text
/
|-- /partner/
|-- /products/
|-- /applications/
|-- /solutions/
|-- /knowledge/
|-- /about/
|   |-- /about/company/
|   |-- /about/certifications/
|   `-- /about/contact/
```

| Concept in M5 request | Canonical route | Decision |
| --- | --- | --- |
| Products | `/products/` | Preserve |
| Solutions | `/solutions/` | Preserve as planned route family; content/entity owner requires review before expansion |
| Industries | `/applications/` | Preserve existing application/industry route family; do not create competing `/industries/` canon |
| Resources | `/knowledge/` | Preserve existing knowledge route family; do not create competing `/resources/` canon |
| Dealers | `/partner/` | Preserve Partner acquisition route; do not expose Dealer operational records under `/dealers/` |
| Company | `/about/` and `/about/company/` | Preserve; do not create competing `/company/` canon |
| Contact | `/about/contact/` | Preserve; do not create competing `/contact/` canon |

`/distributor/` and `/join/` remain compatibility or campaign paths, not primary SEO pages. `/partner/` remains the primary commercial route.

## 2.2 Route Ownership and Purpose

| Route family | Canonical fact/content owner | Content purpose | Indexing strategy | Primary internal relationships |
| --- | --- | --- | --- | --- |
| `/` | CMS using approved Platform Assets and Entity facts | Brand, product, industry, solution, knowledge, and Partner discovery hub | Index only reviewed public output | Partner, Product, Application, Solution, Knowledge, About |
| `/partner/` | Partner System / CMS | Channel-growth proposition and Partner Lead entry | Index approved canonical Partner pages; compatibility paths redirect or remain non-canonical | Product, Application, Knowledge, About/contact |
| `/products/` | Product System / Product owner with CMS | Product listing, category, detail, selection, and consultation | Index only eligible Product and category outputs under publication gates | Application, Solution, FAQ, Download, Partner |
| `/applications/` | Industry/Application content owner with CMS | Industry context, work problems, equipment direction, limitations, consultation | Index only substantive, reviewed application pages | Product, Solution, Knowledge, Partner |
| `/solutions/` | Owner unresolved; CMS may maintain approved content after intake | Cross-product or cross-industry solution explanation | Route family remains planned; no index eligibility until entity/content ownership and evidence gates are approved | Product, Application, Knowledge, Lead entry |
| `/knowledge/` | CMS / Content System and canonical content entities | Article, Case, FAQ, Video, Download, and technical authority | Index substantive published items; no thin or unsupported content | Product, Application, Solution, Partner |
| `/about/` | Platform Assets / CMS | Company, Brand, certification, contact, and trust facts | Index only verified public facts; certification pages require evidence | Product, Partner, Knowledge, Contact |

URL architecture defines public discovery paths, not canonical business ownership. Entity IDs remain stable even if a slug or URL changes under approved redirect/canonical governance.

## 2.3 URL Principles

- English lowercase slugs with hyphens and trailing slash conventions remain authoritative.
- One intent and one canonical URL per public page.
- Slug changes require reviewed redirect, canonical, internal-link, sitemap, and monitoring impact.
- Query parameters, campaign variants, filters, search results, and compatibility paths must not create competing canonical pages.
- Route existence does not imply index eligibility; publication, fact, quality, and release gates apply.
- Regional or Dealer pages must not become doorway pages, imply exclusivity, or expose operational Dealer data.

# 3. Content Entity Architecture

The requested entity chain is a searchable knowledge view. It does not automatically create new canonical Entity types.

```text
Company
-> Brand
-> Product
-> Category
-> Application
-> Industry
-> Resource
```

## 3.1 Searchable Entity Decisions

| Searchable concept | Canonical authority | Purpose | SEO value | Relationship | Authority signals |
| --- | --- | --- | --- | --- | --- |
| Company | Platform Assets / approved Company Profile | Identify the legal/business organization and public contact context | Branded discovery and trust | Owns/operates Brand and public Platform identity | Verified name, domain, contact, address/region where approved, approved credentials and public sources |
| Brand | Platform Assets / Brand Assets | Identify LABOR-SAVING consistently across pages and media | Entity disambiguation and branded search | Belongs to Company; associated with approved Products and content | Consistent naming, logo authorization, official domain, approved profiles and assets |
| Product | Product System / Product owner | Express a confirmed product object, category, application fit, limitations, and consultation path | Product/category/model discovery | Belongs to Category; relates to Application, Industry, FAQ, Download, Article, Partner | Stable Entity ID, verified facts, source status, publication gates, approved media and content version |
| Category | Product System classification view | Group Products by stable product meaning | Category search and model discovery | Contains eligible Products; relates to Applications and FAQs | Governed slug/name, confirmed member Products, substantive category explanation |
| Application | Industry/Application content owner, unresolved where distinct | Explain an operating context, problem, conditions, and relevant products | Problem and use-case discovery | Connects Product/Solution to Industry | Reviewed technical context, limitations, applicable products, source evidence |
| Industry | Existing Industry Entity governance | Describe sector context and recurring operating problems | Industry authority and long-tail discovery | Contains Applications; relates to Products, Solutions, Articles, Cases | Stable Industry Entity, reviewed facts, authorized cases, relevant technical content |
| Resource | Content System umbrella over Article, FAQ, Case, Video, Download | Provide evidence, explanation, answers, and downloadable support | Topic authority, FAQ discovery, AI citation | Supports Product, Application, Industry, Partner, Company | Authorship/owner, sources, review status, update date, authorized media/downloads, factual consistency |

## 3.2 Entity Relationship Rules

- Use stable Entity relationships rather than hand-written duplicate page lists.
- Company and Brand facts come from Platform Assets, not SEO copy.
- Product facts come from Product System and approved sources, not search demand.
- Category is currently a governed Product classification/view, not a newly approved independent Entity.
- Application and Solution ownership must be resolved before new canonical entity types or route-scale expansion.
- Resource is an umbrella discovery concept; canonical Article, FAQ, Case, Video, and Download entities retain their types.
- Lead, CRM, Dealer operational, Customer, permission, and Analytics records are not public searchable entities by default.

# 4. Product SEO Structure

## 4.1 Product Discovery Architecture

```text
Product Listing
-> Product Category
-> Eligible Product Detail
-> Industry / Application Page
-> FAQ Content
-> Verified Technical Specification
-> Related Resources
-> Customer Lead or Partner Lead entry
```

Product Detail URL, canonical, Product Schema eligibility, sitemap inclusion, and Related Product output remain gated by:

```text
published
+ schemaEligible
+ contentValidated
+ releaseApproved
```

No Product page may invent parameters, prices, delivery, certification, availability, customer cases, performance results, or suitability.

## 4.2 Page Roles

| Page/content type | Search purpose | Required relationship |
| --- | --- | --- |
| Product page | Explain a confirmed product, audience, applicable direction, limitations, and consultation | Category, Application/Industry, FAQ, Resources, Partner |
| Category page | Explain product class and connect eligible models | Product members, applications, FAQs, selection guidance |
| Industry application page | Explain industry problem, conditions, applicable equipment direction, and limitations | Products, Solutions, Knowledge, consultation |
| FAQ content | Answer a specific product, application, selection, limitation, or cooperation question | Source Entity and deeper page |
| Technical specification | Present only verified, source-owned technical facts with version/status context | Product and approved Download/source material |
| Related resources | Provide articles, downloads, videos, cases, and FAQs through Entity relationships | Product/Application/Industry relationship IDs |

## 4.3 Discovery Paths

| User discovery mode | Landing strategy | Next relationship |
| --- | --- | --- |
| Keywords | Product/category or precise knowledge page matching real intent | Category -> Product -> consultation |
| Applications | `/applications/` page describing real work context and conditions | Application -> Product/Solution -> Lead entry |
| Industries | Industry/Application page with sector-specific problems and limits | Industry -> Application -> Product/Knowledge |
| Problems | FAQ, Article, or Application page answering a concrete operational question | Problem content -> Product/Solution -> consultation |
| Solutions | Reviewed `/solutions/` content only after owner/evidence readiness | Solution -> Product/Application/Resource -> Lead entry |

Product SEO must support Partner discovery without replacing `/partner/`: eligible Product pages retain a governed channel-cooperation path to the primary Partner route.

# 5. GEO Entity Strategy

## 5.1 Entity Signals

| Signal | Required understanding | Authority source |
| --- | --- | --- |
| Company identity | Official organization name, platform role, public contact and business context | Platform Assets / approved Company Profile |
| Brand identity | LABOR-SAVING name, official domain, approved visual/profile relationships | Brand Assets and approved public profiles |
| Product authority | Confirmed products/categories, facts, applications, limitations, documents, and update state | Product System and source-approved Product content |
| Industry expertise | Factual industry problems, operating conditions, constraints, and applicable directions | Industry/Application entities and reviewed technical content |
| Application knowledge | What the application is, who it suits, what problem it addresses, limits, and next step | Approved Application/Industry/Product relationships |
| Geographic relevance | Mainland China service context and only verified regional facts | Platform Assets and approved business sources; never inferred Dealer exclusivity |

## 5.2 Knowledge Relationship

```text
Company
-> Brand
-> Products
-> Applications
-> Industries
-> Reviewed Resources and Authority Signals
```

The arrows express governed relationships, not ownership inheritance. Company does not directly author Product facts; Product does not create Industry facts; GEO does not become the authority source.

## 5.3 GEO Content Unit

Each core unit should answer:

1. What is it?
2. Who is it for?
3. What problem does it address?
4. What limitations, conditions, or evidence gaps apply?
5. What is the next consultation or cooperation step?

GEO readiness requires concise factual summaries, consistent Entity names, relationship clarity, source status, approved update dates, authorized media/documents, and explicit limitations. Advertising language, keyword stuffing, fabricated authority, and machine-only facts are prohibited.

# 6. Search Indexing Strategy

## 6.1 Sitemap Strategy

- Include only canonical, public, index-eligible URLs.
- Partition future sitemap outputs by stable page family when scale justifies it: core, Partner, Product, Application/Solution, and Knowledge.
- Exclude drafts, internal review, unsupported placeholders, compatibility paths, search/filter results, and entities failing publication gates.
- Use reviewed content modification time, not build or deployment time, as freshness evidence.
- Sitemap generation and submission remain future Search Runtime work and are not implemented here.

## 6.2 Internal Linking

- Links derive from approved Entity relationships, page purpose, and Topic Cluster membership.
- Product connects to Category, Application/Industry, FAQ, Resource, and Partner.
- Application/Industry connects to relevant Product, Solution, Knowledge, and Lead entry.
- Knowledge connects back to its source Product/Application/Industry/Partner context.
- `/partner/` remains the primary Partner conversion route.
- Avoid orphan pages, indiscriminate site-wide links, unrelated keyword anchors, and hard-written relationship copies.

## 6.3 Canonical Principles

- One canonical URL represents each indexable page intent.
- Compatibility, campaign, parameter, and duplicate-content paths must reference or redirect to the approved canonical under future implementation rules.
- Pagination, faceting, search results, localized variants, and syndicated content require explicit canonical/indexing design before implementation.
- A canonical declaration cannot make unapproved, thin, or unsupported content index-eligible.

## 6.4 Content Freshness

- Freshness reflects a reviewed factual/content change, not a deployment timestamp.
- Significant updates require source revalidation, owner review, version/update evidence, internal-link review, and indexing impact assessment.
- Time-sensitive, certification, contact, product, policy, and download facts need named review cadence and expiry handling.
- Stale content may require re-review, controlled update, consolidation, redirect, or archive.

## 6.5 Duplicate Prevention

- Preserve the canonical route vocabulary rather than creating `/industries/`, `/resources/`, `/dealers/`, `/company/`, or `/contact/` duplicates.
- Consolidate overlapping intent instead of creating thin keyword or regional doorway pages.
- Keep Product, Category, Application, Solution, Article, FAQ, and Partner page purposes distinct.
- Reuse facts from canonical owners; do not copy and independently edit specifications, company identity, or cooperation terms across pages.
- Duplicate candidates require human review before merge, redirect, archive, or canonical change.

## 6.6 Index Monitoring

Future monitoring should cover:

- Sitemap acceptance and submitted/indexed differences.
- Crawl access, robots effects, HTTP status, redirect, and canonical selection.
- Excluded, duplicate, soft-error, stale, and orphan URL patterns.
- Product publication-gate and sitemap reconciliation.
- Page-family visibility, query intent, AI-search citations/mentions where observable, and Lead-source quality in aggregated form.
- Unauthorized content, fact drift, misleading snippets, or unexpected Dealer/customer exposure.

Monitoring observes and escalates. It does not automatically publish, change canonical URLs, submit unsupported pages, or modify Lead lifecycle.

# 7. Lead Conversion Relationship

```text
Search Traffic
-> Landing Page
-> Content Engagement
-> Valid Lead Capture
-> Lead Center
```

| Stage | Owner | Boundary |
| --- | --- | --- |
| Search Traffic | SEO/GEO acquisition view | Impression, citation, click, and session are not Leads |
| Landing Page | Canonical content/entity owner with CMS publication governance | Must contain approved facts, purpose, internal links, and appropriate CTA |
| Content Engagement | Analytics as authorized read-only consumer | Engagement may inform aggregate review; it does not prove identity, intent, or quality |
| Lead Capture | Lead Center acceptance boundary | Requires real submission/referral/manual/import context and applicable privacy purpose |
| Lead Center | Canonical Lead owner | Owns identity, attribution, lifecycle, assignment, quality, privacy, and CRM handoff |

SEO/GEO creates acquisition opportunity. It may pass source channel, landing URL, source Entity, campaign context, and consent-purpose context to Lead Center. It must not score, route, approve, assign, convert, export, or publish Lead data.

Downstream relationships remain:

```text
Lead Center
-> CRM operational activity
-> Dealer Center where an approved Dealer decision applies
-> future Customer owner where approved
-> Analytics consuming authorized facts/events only
```

# 8. AI Search / GEO Readiness

## 8.1 Structured Information

- Stable Entity names and identifiers.
- Clear definitions, audiences, problems, conditions, limitations, and next steps.
- Consistent headings, FAQ units, tables where useful, and relationship links.
- Source status, owner, reviewed version, and meaningful update date.
- Future structured-data contracts only after field authority and eligibility are approved.

## 8.2 Entity Clarity

- Disambiguate Company, Brand, Product, Category, Application, Industry, Solution, Resource, Partner Program, Dealer, Lead, and CRM concepts.
- Keep public content entities separate from private operational objects.
- Use one preferred name and approved aliases without creating competing facts.
- Ensure each relationship points to an authoritative source rather than circular SEO copy.

## 8.3 Authority and Trust Signals

- Verified official domain, Company and Brand facts.
- Confirmed Product facts and eligible publication state.
- Approved technical documents, authorized media, and attributable content ownership.
- Real limitations, conditions, evidence status, and correction/update history.
- Approved certifications or cases only when evidence and public-use authorization exist.
- Clear contact and consultation pathways without unsupported claims.

## 8.4 Content Consistency

- CMS workflow and canonical owners approve fact changes before SEO/GEO output.
- Product specifications, Company identity, Brand assets, Partner terms, and contact facts must not diverge across pages.
- GEO summaries cannot introduce facts absent from approved source content.
- Conflicts stop publication and return to the appropriate owner for review.

No Schema markup, AI feed, `llms.txt`, knowledge export, or Search Runtime output is implemented by this architecture draft.

# 9. Architecture Consistency Review

The reviewed M5 decisions remain preserved:

- `M5_DEALER_CHANNEL_ARCHITECTURE.md`: Dealer Center owns Dealer facts; public Dealer content is not inferred from operational records.
- `M5_PARTNER_MANAGEMENT_MODEL.md`: Partner Management remains orchestration, and `/partner/` remains the public Partner acquisition path.
- `M5_CRM_WORKFLOW_ARCHITECTURE.md`: CRM owns activities and evidence, not public Entity facts or Lead state.
- `M5_LEAD_LIFECYCLE_MODEL.md`: SEO/GEO traffic is a source context; Lead Center accepts and governs real Leads.
- `M5_LEAD_CRM_BOUNDARY_DECISION.md`: Lead Center is canonical, CRM is operational, Customer ownership remains undecided, and Analytics is read-only.

SEO/GEO introduces no ownership conflict and no new Platform Capability in M5.1 preparation.

# 10. Open Questions

Architecture Review must resolve:

1. **CMS ownership boundary:** which SEO/GEO fields are CMS-maintained, owner-derived, system-derived, or Search Runtime-owned?
2. **Product information ownership:** who approves each specification, limitation, application relationship, document, and update/expiry event?
3. **Content approval workflow:** which roles approve factual content, SEO, GEO, legal/compliance, and release readiness, and where is separation of duties required?
4. **SEO content governance:** who owns keyword intent, consolidation, redirect, archive, canonical change, and stale-content decisions?
5. **GEO entity authority source:** which source is authoritative for Company, Brand, Product, Application, Industry, Solution, Partner, and contact facts?
6. **Multi-language strategy:** the current repository is CN-first and does not implement i18n; does any future language require an independent `.com` platform and separate architecture?
7. **Regional SEO strategy:** which verified regional facts justify pages, how are doorway pages prevented, and how is Dealer scope represented without exclusivity claims?
8. **Dealer content responsibility:** should any public Dealer locator/profile capability exist, and if so which owner approves visibility, facts, privacy, status, and expiry?
9. **Future structured data strategy:** which types, eligibility gates, field authorities, validation, versioning, and correction workflow apply before implementation?
10. **Solution ownership:** is Solution a canonical Entity, an approved content composition, or another governed view, and which module owns it?
11. **Application/Industry distinction:** are Application and Industry separate canonical entities or views within one domain?
12. **Route aliases:** should `/industries/`, `/resources/`, `/dealers/`, `/company/`, or `/contact/` ever exist as redirects, campaigns, or independent routes?
13. **Index monitoring ownership:** who reviews China search coverage, AI citations, canonical drift, stale content, and escalation outcomes?
14. **AI-search delivery:** are `llms.txt`, answer feeds, knowledge exports, or platform submissions appropriate, and what authority/security gates apply?
15. **Lead attribution handoff:** which SEO/GEO source fields are necessary, consent-compatible, and stable enough for Lead Center and Analytics?

Architecture Review approval is required before this preparation draft can become an implementation input.
