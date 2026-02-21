# Skill Requirements to Maintain & Extend This Repo

> Repository: [hqvu1/api-management-developer-portal](https://github.com/hqvu1/api-management-developer-portal)
> Generated: 2026-02-21

---

## Overview

This document outlines all the skill sets required to change and maintain the **Azure API Management Developer Portal** repository — beyond TypeScript. Skills are grouped by category and prioritized by importance.

**Priority Legend:**
- 🔴 **Must-have** — Blocking without this knowledge
- 🟡 **Important** — Needed for most tasks
- 🟠 **Nice-to-have** — Useful for advanced tasks

---

## 1. 🌐 Frontend Fundamentals

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **HTML5 & CSS3** | Portal templates, component markup, custom widgets | 🔴 Must-have |
| **SCSS / PostCSS** | Styles in `src/styles/`, PostCSS config (`postcss.config.js`) | 🔴 Must-have |
| **KnockoutJS** | The core UI binding framework — `src/bindingHandlers/` uses KO observables | 🔴 Must-have |
| **React** | Some components are React-based (`src/components/react.components.d.ts`) | 🟡 Important |
| **DOM / Browser APIs** | Routing, polyfills (`src/polyfills.ts`), dynamic rendering | 🟡 Important |

---

## 2. 📦 Build Tooling

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **Webpack** | Multiple custom configs: `webpack.designer.js`, `webpack.runtime.js`, `webpack.publisher.js`, `webpack.build.js`, `webpack.develop.js`, `webpack.function.js`, `webpack.staticData.js` | 🔴 Must-have |
| **Node.js / npm** | Package management (`package.json`, `package-lock.json`), running scripts | 🔴 Must-have |
| **ESLint** | Code quality rules in `.eslintrc.cjs`, enforced via GitHub Actions (`eslint.yml`) | 🟡 Important |
| **PostCSS** | CSS processing pipeline (`postcss.config.js`) | 🟡 Important |
| **Babel / JS transpilation** | Module compatibility, polyfills | 🟠 Nice-to-have |

---

## 3. 🔐 Authentication & Identity Protocols

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **OAuth 2.0 / OIDC** | `src/services/oauthService.ts` — authorization code, implicit, client credentials flows | 🔴 Must-have |
| **Azure Active Directory (Entra ID)** | `aadService.ts`, `aadServiceV2.ts` — AAD v1 and v2 integration | 🔴 Must-have |
| **JWT tokens** | Token acquisition, refresh, and claims inspection | 🟡 Important |
| **Delegation model** | `delegationService.ts`, `staticDelegationService.ts` — APIM delegation for custom identity | 🟡 Important |
| **MSAL (Microsoft Auth Library)** | Underlying AAD auth library used in `aadServiceV2.ts` | 🟡 Important |

---

## 4. ☁️ Azure & API Management

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **Azure API Management (APIM)** | Core platform — understanding products, APIs, subscriptions, policies, and developer portal concepts | 🔴 Must-have |
| **Azure Resource Manager (ARM)** | `armService.ts` — direct ARM API calls for provisioning and management | 🔴 Must-have |
| **APIM REST API** | `backendService.ts`, `apiService.ts`, `productService.ts` — all communicate with APIM's management API | 🔴 Must-have |
| **Azure Blob Storage** | `filesystemBlobStorage.ts`, `apimMediaService.ts` — media and static asset storage | 🟡 Important |
| **Azure Portal / Resource Groups** | Deploying and configuring the portal in Azure | 🟡 Important |

---

## 5. 🧪 Testing

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **Mocha** | Unit test runner (`mocha.js`), `.spec.ts` files across services | 🔴 Must-have |
| **Playwright** | E2E testing framework (`playwright.config.ts`, `tests/` directory) | 🟡 Important |
| **Test mocking / stubs** | Services use mocks in `.spec.ts` files (e.g., `apiService.spec.ts`) | 🟡 Important |
| **Assertion libraries (e.g. Chai)** | Used alongside Mocha for unit assertions | 🟠 Nice-to-have |

---

## 6. 🚀 CI/CD & DevOps

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **GitHub Actions** | Workflows for CI (`mainCI.yml`), linting (`eslint.yml`), tests (`test.yml`), security (`codeql-analysis.yml`) | 🔴 Must-have |
| **Azure Pipelines** | `.pipeline/` directory — Azure DevOps-based deployment pipelines | 🟡 Important |
| **YAML** | All CI/CD pipeline configs are written in YAML | 🔴 Must-have |
| **CodeQL / GitHub Security** | `codeql-analysis.yml` — static analysis for security vulnerabilities | 🟠 Nice-to-have |
| **Shell scripting (Bash / .bat)** | `scripts.v3/` contains `.bat` and `.sh` scripts for migrations, export, cleanup | 🟡 Important |

---

## 7. 🌐 REST APIs & Protocols

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **REST API design & consumption** | All services (`apiService`, `productService`, etc.) consume APIM's REST API | 🔴 Must-have |
| **GraphQL** | `graphqlService.ts` — GraphQL API exploration support | 🟡 Important |
| **HTTP fundamentals** | Headers, status codes, CORS, caching (`ttlCache.ts`) | 🔴 Must-have |
| **OpenAPI / Swagger** | APIM exposes API schemas in OpenAPI format; the portal renders them | 🟡 Important |

---

## 8. 🎨 UI/UX & Portal Customization

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **CSS theming** | `src/themes/` — portal supports multiple visual themes | 🟡 Important |
| **Responsive design** | Portal must work across screen sizes | 🟡 Important |
| **Custom widget development** | `scaffolds/`, `src/components/custom-widget/` — build and register custom portal widgets | 🟡 Important |
| **Markdown** | `markdownService.ts` — content areas support Markdown authoring | 🟠 Nice-to-have |

---

## 9. 🛠️ Developer Tooling & Practices

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **Git & GitHub** | Branching, PRs, issue tracking, Actions | 🔴 Must-have |
| **VS Code** | `.vscode/` config included for workspace settings and debugging | 🟡 Important |
| **EditorConfig** | `.editorconfig` — consistent formatting across editors and contributors | 🟠 Nice-to-have |
| **Dependency management** | Keeping `package.json` and `package-lock.json` current and secure | 🟡 Important |
| **Semantic versioning** | Understanding npm package versioning for safe upgrades | 🟠 Nice-to-have |

---

## 10. 📊 Analytics & Telemetry

| Skill | Why It's Needed | Priority |
|-------|----------------|----------|
| **Application Insights / Azure Monitor** | `src/telemetry/` and `analyticsService.ts` — portal reports API usage metrics | 🟡 Important |
| **Google Tag Manager (GTM)** | `scripts.v3/gtm.js` — GTM integration for web analytics tracking | 🟠 Nice-to-have |

---

## 📋 Recommended Learning Priority Order

### 🔴 Start Here — Must-Have

1. **Webpack** — module bundling and multi-mode build system
2. **KnockoutJS** — primary UI data-binding framework
3. **Azure APIM** — core platform concepts (products, APIs, subscriptions, policies)
4. **OAuth 2.0 / AAD / Entra ID** — authentication flows throughout the portal
5. **GitHub Actions + YAML** — CI/CD pipeline management
6. **Mocha** — unit testing framework
7. **HTML / CSS / SCSS** — portal markup and styling

### 🟡 Level Up — Important

8. **React** — used in newer portal components
9. **Playwright** — end-to-end browser testing
10. **Azure ARM & Blob Storage** — resource management and media handling
11. **GraphQL** — API schema exploration support
12. **Azure Pipelines** — Azure DevOps CI/CD
13. **Bash / .bat scripting** — migration and automation scripts in `scripts.v3/`

### 🟠 Polish — Nice-to-Have

14. **CodeQL / security scanning** — static analysis in GitHub Actions
15. **Google Tag Manager / analytics** — portal usage tracking
16. **Markdown authoring** — portal content management
17. **CSS theming & responsive design** — portal visual customization

---

## 💡 Key Insight

> The biggest **unique** skill combination for this repo is:
> 
> **Azure API Management domain knowledge** (products, subscriptions, operations, policies, delegation)  
> **+**  
> **KnockoutJS** (for the design-time portal editor)
> 
> Most other skills (Webpack, OAuth, REST APIs) are broadly applicable web development knowledge that transfers across many projects.

---

*This document was auto-generated from repository analysis on 2026-02-21.*