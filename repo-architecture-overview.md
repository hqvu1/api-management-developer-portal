# API Management Developer Portal — Architecture & Functionalities Overview

> Repository: [hqvu1/api-management-developer-portal](https://github.com/hqvu1/api-management-developer-portal)  
> Generated: 2026-02-21

---

## 🏗️ Overview

This is the **Azure API Management (APIM) Developer Portal** — a customizable, open-source web application that allows API consumers to discover, explore, and interact with APIs exposed through Azure API Management. It is built on **TypeScript**, uses **Webpack** for bundling, and is structured around three distinct operational modes.

---

## 🧩 Three Operational Modes

The portal architecture is split into three primary modes, each with its own entry-point module, startup file, and Webpack config:

| Mode | Module | Startup | Webpack Config | Purpose |
|------|--------|---------|----------------|---------|
| **Design** | `src/apim.design.module.ts` | `src/startup.design.ts` | `webpack.designer.js` | Visual/drag-drop portal editor (for admins) |
| **Publish** | `src/apim.publish.module.ts` | `src/startup.publish.ts` | `webpack.publisher.js` | Generates static output for deployment |
| **Runtime** | `src/apim.runtime.module.ts` | `src/startup.runtime.ts` | `webpack.runtime.js` | The live portal served to end-users |

Additional webpack configs: `webpack.build.js`, `webpack.develop.js`, `webpack.function.js`, `webpack.staticData.js`, `webpack.mockStaticData.js`.

---

## 📁 Top-Level Directory Structure

```
/
├── src/                  # Main application source code
├── scripts.v3/           # Migration/automation scripts for APIM v3
├── scaffolds/            # Boilerplate scaffolds for custom widgets
├── templates/            # Portal page templates
├── examples/             # Example customizations
├── tests/                # End-to-end tests (Playwright)
├── auth/                 # Authentication-related artifacts
├── community/            # Community contribution notes
├── js/                   # Supplementary JS assets
├── readme/               # Docs/images for the README
├── .pipeline/            # CI/CD pipeline definitions
├── .github/              # GitHub Actions workflows
└── environmentConstants.js  # Build-time environment constants
```

---

## 📂 `src/` — Core Application Structure

### 🔑 Entry Point Modules

- **`apim.design.module.ts`** — Registers all design-time widgets, editors, and services
- **`apim.publish.module.ts`** — Handles static site generation pipeline
- **`apim.runtime.module.ts`** — Powers the end-user-facing portal

### 🧱 Key Subdirectories

| Directory | Purpose |
|-----------|---------|
| `src/components/` | All UI widgets and page components |
| `src/services/` | Business logic and backend communication services |
| `src/models/` | Domain model definitions (API, Product, User, etc.) |
| `src/contracts/` | TypeScript interfaces/contracts for API communication |
| `src/authentication/` | Auth flows (AAD, OAuth, Basic, etc.) |
| `src/clients/` | HTTP client abstractions for APIM REST API |
| `src/persistence/` | Data persistence and storage abstraction |
| `src/publishing/` | Static site publishing logic |
| `src/routing/` | Client-side routing |
| `src/configuration/` | Runtime configuration management |
| `src/bindingHandlers/` | KnockoutJS binding handlers |
| `src/libraries/` | Shared internal libraries |
| `src/logging/` | Application logging utilities |
| `src/telemetry/` | Analytics and telemetry integration |
| `src/styles/` | Global and component CSS/SCSS |
| `src/themes/` | Portal theming support |
| `src/errors/` | Custom error types |
| `src/types/` | Global TypeScript type definitions |
| `src/admin/` | Admin-specific UI/components |

---

## 🧩 Components (`src/components/`)

The portal UI is composed of modular feature components:

| Component | Description |
|-----------|-------------|
| `apis/` | API listing, detail, and exploration views |
| `operations/` | API operation browser and "Try It" console |
| `products/` | Product listings and subscriptions |
| `users/` | User profile, registration, sign-in |
| `reports/` | API analytics/usage reports |
| `content/` | Content/page management widgets |
| `custom-widget/` | Custom widget runtime support |
| `custom-widget-list/` | Widget registry/management |
| `custom-html/` | Embeddable custom HTML widget |
| `code-editor/` | In-portal code editor |
| `file-input/` | File upload UI component |
| `tag-input/` | Tag input UI component |
| `pagination/` | List pagination component |
| `spinner/` | Loading indicator |
| `setup/` | First-run/setup wizard |
| `help/` | Help and documentation widget |
| `app/` | Root application shell |

---

## ⚙️ Services (`src/services/`)

Rich set of TypeScript services encapsulating business logic:

| Service | Purpose |
|---------|---------|
| `apiService.ts` | Fetch/manage APIs, operations, schemas |
| `productService.ts` | Manage API Products and subscriptions |
| `usersService.ts` | User management and registration |
| `oauthService.ts` | Full OAuth2/OIDC authorization flows |
| `aadService.ts` / `aadServiceV2.ts` | Azure Active Directory (Entra ID) auth |
| `delegationService.ts` | Delegation model support |
| `analyticsService.ts` | API usage analytics queries |
| `graphqlService.ts` | GraphQL API exploration support |
| `backendService.ts` | Backend entity CRUD |
| `armService.ts` | Azure Resource Manager API calls |
| `tenantService.ts` | APIM tenant settings |
| `identityService.ts` | User identity and claims |
| `policyService.ts` | API policy management |
| `tagService.ts` | Tag CRUD |
| `roleService.ts` | Role-based access control |
| `provisioningService.ts` | Resource provisioning |
| `markdownService.ts` | Markdown rendering |
| `ttlCache.ts` | In-memory TTL-based cache |
| `runtimeConfigurator.ts` | Runtime portal configuration loading |
| `publisherStaticDataProvider.ts` | Static data for publisher mode |
| `runtimeStaticDataProvider.ts` | Static data for runtime mode |
| `apimMediaService.ts` | Media blob management |
| `apimMediaPermalinkResolver.ts` | Resolves media permalink URLs |
| `staticDataHttpClient.ts` | HTTP client for static data |

---

## 🔐 Authentication

Supports multiple auth flows:

- **Azure Active Directory (AAD v1 and v2 / Entra ID)**
- **OAuth 2.0 / OIDC** (authorization code, implicit, client credentials)
- **Delegation model** (for custom identity providers)
- **Basic Authentication**

---

## 🧪 Testing

- **Unit tests**: Mocha (`mocha.js`) with `.spec.ts` files co-located with services  
  (e.g., `apiService.spec.ts`, `productsService.spec.ts`, `ttlCache.spec.ts`)
- **End-to-end tests**: Playwright (`playwright.config.ts`) in the `tests/` directory

---

## 🔧 Build & Tooling

| Tool | Role |
|------|------|
| **Webpack** (multiple configs) | Bundles design, runtime, publisher, static data modes |
| **TypeScript** (`tsconfig.json`) | Strongly-typed codebase |
| **ESLint** (`.eslintrc.cjs`) | Code linting |
| **PostCSS** (`postcss.config.js`) | CSS processing |
| **GitHub Actions** (`.github/`) | CI/CD automation |
| **Azure Pipelines** (`.pipeline/`) | Azure-based CI/CD |

---

## 📋 Summary

This is a **full-featured, modular SPA (Single Page Application)** built with TypeScript, designed to be deployed alongside Azure API Management. It supports:

1. **Developers** browsing APIs, products, and trying them out
2. **Admins** designing and customizing the portal via a visual editor
3. **Publishers** generating a static site for hosting
4. **Custom widgets** for extending the portal
5. **Multiple auth strategies** including AAD, OAuth2, and delegation

---

*This document was auto-generated from repository analysis on 2026-02-21.*