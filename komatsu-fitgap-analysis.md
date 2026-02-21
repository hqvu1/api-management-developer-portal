# Komatsu API Marketplace Portal — Fit/Gap Analysis

> Repository: [hqvu1/api-management-developer-portal](https://github.com/hqvu1/api-management-developer-portal)
> Reference: KNA Project #802 — Komatsu API Marketplace (Phase 1)
> Generated: 2026-02-21

---

## Executive Summary

> **Yes, use this repo as your base** — it covers ~60–70% of Phase 1 requirements out of the box. The APIM developer portal is purpose-built for exactly this use case (API discovery, documentation, Try-It, subscriptions, OAuth/AAD auth, RBAC).

**The remaining work falls into three buckets:**

1. **Branding & UI** — Apply Komatsu design system to themes, styles, and templates *(medium effort)*
2. **Custom integrations** — AEM content authoring, Global Admin registration workflow, KX Member Network SSO, welcome email *(high effort — these are the main custom builds)*
3. **Compliance & infrastructure** — WCAG audit, SOC 2/GDPR, DNS, Azure hosting, Bicep IaC *(infra/process effort)*

---

## 🟢 Strong Fits — What the Repo Already Covers

| Komatsu Requirement | Repo Capability | Notes |
|---|---|---|
| API discovery & browsing | `src/components/apis/` | Full API listing and detail views |
| API documentation & "Try It" | `src/components/operations/` | Embedded Swagger/Try-It console built-in |
| Products & subscriptions | `src/components/products/`, `productService.ts` | Subscription management is native |
| OAuth 2.0 authentication | `src/services/oauthService.ts` | Full OAuth2/OIDC support |
| Azure Entra ID (AAD) integration | `aadService.ts`, `aadServiceV2.ts`, `armAuthenticator.ts` | AAD v1 & v2 with MSAL — directly maps to Global Admin |
| RBAC roles | `src/services/roleService.ts` | Role-based access built-in |
| User registration & management | `src/components/users/`, `usersService.ts` | Sign-up, sign-in, profile flows |
| API metadata (version, owner, contact) | `src/models/`, `apiService.ts` | Native APIM metadata surfacing |
| News & Announcements content | `src/components/content/` | Dynamic content management |
| Responsive design | Portal is SPA with theming | Existing responsive structure |
| Custom branding/theming | `src/themes/`, `src/styles/` | Full theme customization support |
| Multi-environment (dev/qa/prod) | `config.design.json`, `config.runtime.json`, `config.publish.json` | Separate environment configs built-in |
| Static site publishing | `src/publishing/`, `webpack.publisher.js` | Static site generation for hosting |
| CI/CD pipelines | `.github/workflows/`, `.pipeline/` | GitHub Actions + Azure Pipelines |
| Unit test coverage | Mocha `.spec.ts` files | 70% coverage requirement is achievable |
| IaC compatibility | Webpack, config-driven | Deployable via Bicep/Terraform alongside |
| GraphQL API support | `src/services/graphqlService.ts` | Native GraphQL exploration |
| Analytics & telemetry | `src/telemetry/`, `analyticsService.ts` | Built-in usage tracking |
| Service Now / support integration | Extensible via custom widgets | Custom widget scaffold available |

---

## 🟡 Gaps — What Needs Custom Work

| Komatsu Requirement | Gap | Effort |
|---|---|---|
| **Komatsu branding (design standards)** | The portal is unbranded out of the box — full Komatsu UI/UX design must be applied to `src/themes/`, `src/styles/`, and templates | 🟡 Medium |
| **AEM content authoring integration** | No AEM connector exists — requires custom integration with Adobe Experience Manager for dynamic content | 🔴 High |
| **Multi-language support (i18n)** | APIM portal has limited i18n; non-English translations need to be wired in externally (per assumptions) | 🟡 Medium |
| **Automated welcome email** | No email service built-in — requires Azure Communication Services or SendGrid integration | 🟡 Medium |
| **User registration → Global Admin workflow** | Registration flow exists but the approval handoff to Global Admin/KPS must be built as a custom integration | 🔴 High |
| **Cost/pricing plan per API** | No native "Cost Plan" page per API — needs custom component | 🟡 Medium |
| **Use cases page per API** | No native use-case content section — needs custom component | 🟡 Medium |
| **Sandbox isolation per API** | Sandbox is dependent on API providers (per assumptions) — portal can link to external sandboxes but not provision them | 🟡 Medium (external dependency) |
| **WCAG compliance** | Existing portal is not guaranteed WCAG AA compliant — requires audit and remediation | 🟡 Medium |
| **SOC 2 / GDPR compliance** | Compliance is an infrastructure + process concern, not a portal feature — needs security review on top of portal | 🟡 Medium |
| **PII encryption at rest** | Depends on Azure APIM and storage config, not the portal code directly | 🟠 Low (infra) |
| **Custom DNS** | Infrastructure concern — portal is deployable to any domain but DNS config is external | 🟠 Low (infra) |
| **KX Member Network integration** | No built-in SSO bridge to KX Member Network — needs custom auth routing | 🟡 Medium |
| **Power BI analytics dashboard** | Marked as Phase 2 — not in scope for Phase 1 | ⬜ Out of scope |
| **Admin API key/credential management console** | Marked as Phase 2 — not in scope | ⬜ Out of scope |
| **Changelog & release notifications** | Marked as Phase 2 | ⬜ Out of scope |
| **Global search** | Marked as Phase 2 | ⬜ Out of scope |

---

## 🔴 Key Risks to Address

| Risk | Detail |
|---|---|
| **No anonymous access allowed** | The portal supports anonymous browsing by default — this must be explicitly disabled/configured |
| **Global Admin integration complexity** | The KPS/Softura-managed Global Admin is an external system; the registration handoff and RBAC sync will need careful design |
| **AEM content integration** | This is a significant custom build — AEM is not a standard APIM portal integration |
| **WCAG / SOC 2 / GDPR audits** | These are non-trivial and require dedicated testing and potentially architectural changes |
| **Paperbits dependency** | The repo is built on [Paperbits](https://paperbits.io/) (the open-source CMS engine) — customization requires understanding this framework layer as well |

---

## 📦 Phase 1 Scope Coverage Summary

| Category | Coverage | Notes |
|---|---|---|
| Accessibility, Design & UI | 🟡 Partial | Responsive SPA exists; Komatsu branding + WCAG audit needed |
| Content & Categorization | 🟡 Partial | API pages exist; Use Cases and Cost Plan pages need custom build |
| Authentication & Authorization | 🟢 Strong | OAuth2, AAD/Entra ID, RBAC all built-in |
| Registration | 🟡 Partial | User flows exist; Global Admin handoff needs custom integration |
| API Features | 🟢 Strong | Try-It, Swagger, API metadata, sandbox linking all supported |
| Support Integration | 🟡 Partial | Extensible via custom widget; Service Now needs custom connector |
| Security & Compliance | 🟡 Partial | Auth/encryption supported; SOC 2/GDPR/WCAG require audit |

---

## 🗓️ Mapping to Project Timeline

| Month | Activities | Repo Relevance |
|---|---|---|
| **Month 1** | Project setup, requirements, API discovery sessions | Fork repo, configure environments, define customization scope |
| **Months 2–3** | Build marketplace portal, EARB prep | Apply Komatsu branding, build custom components (Use Cases, Cost Plan), integrate Global Admin |
| **Month 4** | SIT, UAT, performance testing, production deployment | Run Playwright E2E tests, Mocha unit tests (70% coverage), deploy via IaC |
| **Month 4.5** | Hypercare, documentation, AMS handover | Complete runbook, reference architecture, knowledge transfer docs |

---

## 🛠️ Recommended Custom Build Items (Phase 1)

The following items require net-new development on top of the base repo:

1. **Komatsu Design System Integration**
   - Apply brand colors, typography, logo to `src/themes/` and `src/styles/`
   - Update all page templates in `templates/`

2. **Global Admin Registration Integration**
   - Custom registration form that triggers an approval workflow to Global Admin (KPS/Softura)
   - RBAC role sync between Global Admin and APIM portal (Admin, Developer, Tester roles)

3. **AEM Content Authoring Bridge**
   - Custom data provider in `src/services/` to pull dynamic content from Adobe Experience Manager
   - Replace static content blocks in News & Announcements with AEM-managed content

4. **API Detail Page Enhancements**
   - Add **Use Cases** tab per API (custom component in `src/components/apis/`)
   - Add **Cost Plan** tab per API (custom component)
   - Add API owner, version, and contact metadata display

5. **KX Member Network SSO Bridge**
   - Custom authenticator in `src/authentication/` to handle SSO redirect from KX Member Network
   - Map KX identity tokens to APIM portal session tokens

6. **Welcome Email Automation**
   - Azure Communication Services or SendGrid trigger on user registration
   - Quick-start guide email template

7. **Disable Anonymous Access**
   - Configure portal to require authentication for all routes
   - Redirect unauthenticated users to sign-in page

8. **WCAG AA Compliance Remediation**
   - Accessibility audit of all components
   - Keyboard navigation, ARIA labels, color contrast fixes

9. **Service Now Integration**
   - Custom help/support widget linking to Service Now for defect tracking
   - Replace or extend `src/components/help/`

10. **Onboarding 3 Initial APIs**
    - SAP Warranty API
    - Parts Punchout API
    - Equipment Management API

---

## 📋 Assumptions Alignment

| Assumption (from STR) | Alignment with Repo |
|---|---|
| UI/UX design provided by Komatsu UI/UX | ✅ Repo is themeable — design can be applied |
| API technical documentation provided by API providers | ✅ Portal renders OpenAPI/Swagger docs automatically |
| Non-English translations provided externally | ✅ i18n hooks exist; translations injected externally |
| Sandbox provided by API providers | ✅ Portal can link to external sandbox environments |
| Global Admin user registration is external to portal | ✅ Registration can be decoupled; custom handoff integration needed |
| Single-region deployment for Phase 1 | ✅ Portal is deployable to a single Azure region |

---

## ⬜ Phase 2 / Out of Scope Features (for Reference)

These features are excluded from Phase 1 but should inform platform selection:

- Power BI Usage Analytics Dashboard
- Admin Console for full API lifecycle management
- API key/credential generation, rotation, and revocation
- Azure DevOps publishing pipeline integration
- Credential analytics logging and dashboard
- Credential expiration notification system
- Executive BI dashboards on KPIs
- Real-time alerting and incident management
- In-portal changelog and release notifications
- Global search
- Status page integration (KX Status Page)

---

*This document was auto-generated from repository and requirements analysis on 2026-02-21.*