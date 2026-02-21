# React SPA vs APIM Developer Portal Repo — Recommendation

> Repository: https://github.com/hqvu1/api-management-developer-portal  
> Date: 2026-02-21

Creating a new React SPA **can** be a better choice for the Komatsu portal **if** you want full control over UX, accessibility, branding, i18n, and custom integrations (AEM, Global Admin workflows). But it’s a trade-off: you’ll be rebuilding a lot of what APIM’s portal gives you “for free” (API catalog rendering, subscriptions, Try-It console integration patterns, etc.).

Below is a practical decision guide.

---

## When a new React SPA is the better choice (your case likely fits)

React SPA is a strong fit if you need:

- **Strict Komatsu design system adoption** (pixel-perfect UI, reusable component library, consistent UX)
- **WCAG compliance as a first-class requirement** (easier with modern React tooling + audits)
- **AEM integration** for dynamic content authoring (you’ll likely build custom content services anyway)
- **Custom registration + approval workflow** into Global Admin (non-standard for APIM portal)
- **A modern app architecture** (React Router, TanStack Query, typed API clients, component testing)
- **Long-term flexibility** for Phase 2 items (admin console, notifications, dashboards, credential management UX)

---

## When keeping/customizing this repo is still the better choice

Stay with the existing APIM developer portal codebase if:

- You want the **fastest path** to a working portal with minimal custom features.
- You want to leverage built-in APIM portal capabilities like:
  - API catalog + operations browsing
  - subscription flows/product concepts aligned with APIM
  - portal publishing model
- You’re okay with the **Knockout/Paperbits architecture** and its customization model.

---

## Key “don’t underestimate” items you must rebuild in a React SPA

If you go React SPA, plan to implement (or integrate) these that the APIM portal already has patterns for:

1. **API catalog ingestion**
   - Pull APIs/Products/Operations from APIM (Management API) or from a curated catalog service.
2. **Try-It console**
   - Embed Swagger UI / Redoc + “Try It” with OAuth2 flows and CORS considerations.
3. **Subscriptions & onboarding**
   - Workflow for requesting access, approval, issuing keys/tokens, and linking to “applications/integrations”.
4. **RBAC + per-role experiences**
   - Admin / Developer / Tester experiences, route protection, feature flags.
5. **Telemetry & adoption KPIs**
   - Audit logs, usage events, analytics pipeline.

---

## Recommended architecture if you build a new React SPA

To keep it enterprise-grade and compliant:

### Frontend (React)

- React + TypeScript
- React Router
- Component library aligned with Komatsu design system (or build one)
- Accessibility tooling: `eslint-plugin-jsx-a11y`, `axe-core` testing

### Backend-for-Frontend (highly recommended)

Even if you *could* call APIM from the browser, a BFF makes security/compliance much easier:

- Token handling / session management
- Calling APIM management endpoints securely
- Integrations: AEM, ServiceNow/ASK, email service
- RBAC enforcement

This BFF could be:

- Node.js (NestJS/Express)
- .NET
- Azure Functions (if lightweight)

---

## A good compromise option (often best)

Use APIM’s portal **as the API “engine”** but build your own **React marketplace** experience:

- React SPA = the primary Komatsu-branded marketplace UI
- APIM developer portal = optional fallback / admin tooling / legacy capability
- BFF provides a clean abstraction so you’re not tightly coupled to APIM portal internals

This reduces risk while still meeting branding + workflow requirements.

---

## Questions that decide the best path quickly

1. Do you need **AEM authoring** to drive most portal content (news, use cases, API docs pages)?
2. Will Global Admin onboarding be a **hard requirement in Phase 1** (not just future)?
3. Do you need **WCAG AA compliance certification** for go-live?
4. Do you need **custom domain + no anonymous access + strict RBAC** on every route?

If you answer “yes” to 2–3 of these, a new React SPA + BFF is usually the cleaner path.

---

*This document is a recommendation summary derived from the earlier fit/gap and architecture discussions.*