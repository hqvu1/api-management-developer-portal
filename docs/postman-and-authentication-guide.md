# Postman & Authentication Guide

This guide explains how the developer portal frontend fetches data from Azure API Management (APIM), how to construct Postman requests against the Data API, and the available authentication methods.

---

## 1. Architecture Overview

The developer portal frontend communicates with APIM through two API clients defined in [`src/clients/`](../src/clients/):

| Client | File | Target |
|--------|------|--------|
| `MapiClient` | [`src/clients/mapiClient.ts`](../src/clients/mapiClient.ts) | ARM Management API (`management.azure.com`) |
| `DataApiClient` | [`src/clients/dataApiClient.ts`](../src/clients/dataApiClient.ts) | APIM Data API (`<service>.developer.azure-api.net/developer`) |

Both extend the abstract [`ApiClient`](../src/clients/apiClient.ts) base class and are consumed by the service layer in [`src/services/`](../src/services/).

### Key constants

Defined in [`src/constants.ts`](../src/constants.ts):

```typescript
export const managementApiVersion = "2023-03-01-preview";
export const dataApiVersion = "2022-04-01-preview";
```

### ARM token acquisition

The [`src/services/armService.ts`](../src/services/armService.ts) service handles ARM token fetching, which is also performed by [`auth/authenticator.js`](../auth/authenticator.js) in the tooling scripts.

---

## 2. Creating Postman Requests for the Data API

### Base URL

```
https://<service-name>.developer.azure-api.net/developer
```

Or use the `dataApiUrl` value from your portal's `config.runtime.json` if it is configured directly.

### API Version

Append `?api-version=2022-04-01-preview` to every request (see `dataApiVersion` in [`src/constants.ts`](../src/constants.ts)).

### Required Headers

| Header | Value |
|--------|-------|
| `Authorization` | `SharedAccessSignature uid=...&...` **or** `Bearer <ARM token>` |
| `Content-Type` | `application/json` |
| `Accept` | `application/json` |

### Guest vs. Authenticated Routes

- **Guest** (no user context): `/apis`, `/products`, `/tags`
- **Authenticated** (user-prefixed): `/users/{userId}/subscriptions`, `/users/{userId}/apis`

The `userId` is the APIM user identifier, e.g. `1` for the built-in admin user.

### Example Requests

#### List APIs

```
GET https://<service>.developer.azure-api.net/developer/apis?api-version=2022-04-01-preview
Authorization: SharedAccessSignature uid=1&...
```

#### Get API Details

```
GET https://<service>.developer.azure-api.net/developer/apis/<api-id>?api-version=2022-04-01-preview
Authorization: SharedAccessSignature uid=1&...
```

#### List Products

```
GET https://<service>.developer.azure-api.net/developer/products?api-version=2022-04-01-preview
Authorization: SharedAccessSignature uid=1&...
```

#### List User Subscriptions

```
GET https://<service>.developer.azure-api.net/developer/users/{userId}/subscriptions?api-version=2022-04-01-preview
Authorization: SharedAccessSignature uid=1&...
```

#### Get API Operations

```
GET https://<service>.developer.azure-api.net/developer/apis/<api-id>/operations?api-version=2022-04-01-preview
Authorization: SharedAccessSignature uid=1&...
```

#### Export API Spec (OpenAPI)

```
GET https://<service>.developer.azure-api.net/developer/apis/<api-id>?export=true&format=openapi&api-version=2022-04-01-preview
Authorization: SharedAccessSignature uid=1&...
```

#### Refresh Token / Identity

```
GET https://<service>.developer.azure-api.net/developer/identity?api-version=2022-04-01-preview
Authorization: Bearer <ARM token>
```

### Postman Environment Variables

| Variable | Example Value |
|----------|---------------|
| `serviceUrl` | `https://contoso.developer.azure-api.net/developer` |
| `apiVersion` | `2022-04-01-preview` |
| `armToken` | *(populated by pre-request script)* |
| `sasToken` | *(populated after generating SAS)* |
| `userId` | `1` |

### Postman Pre-Request Script (Auto-Refresh ARM Token)

```javascript
// Postman pre-request script – refreshes ARM token via client credentials
const tenantId = pm.environment.get("tenantId");
const clientId = pm.environment.get("clientId");
const clientSecret = pm.environment.get("clientSecret");

const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

pm.sendRequest({
    url: tokenUrl,
    method: "POST",
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    body: {
        mode: "urlencoded",
        urlencoded: [
            { key: "grant_type",    value: "client_credentials" },
            { key: "client_id",     value: clientId },
            { key: "client_secret", value: clientSecret },
            { key: "scope",         value: "https://management.azure.com/.default" },
        ]
    }
}, (err, res) => {
    if (!err) {
        pm.environment.set("armToken", res.json().access_token);
    }
});
```

---

## 3. Authentication Methods

### 3.1 Service Principal with Client Secret

1. Register an application in Microsoft Entra ID (Azure AD).
2. Create a client secret under **Certificates & secrets**.
3. Grant the service principal the **API Management Service Contributor** (or a narrower) RBAC role on the APIM resource.
4. Set environment variables:

   ```bash
   export AZURE_TENANT_ID=<tenant-id>
   export AZURE_CLIENT_ID=<app-client-id>
   export AZURE_CLIENT_SECRET=<client-secret>
   ```

5. The tooling in [`auth/authenticator.js`](../auth/authenticator.js) picks up `AZURE_CLIENT_SECRET` and uses `ClientSecretCredential` automatically.

**OAuth2 client credentials flow** (for Postman):

```
POST https://login.microsoftonline.com/<tenant>/oauth2/v2.0/token
Body (x-www-form-urlencoded):
  grant_type=client_credentials
  client_id=<app-client-id>
  client_secret=<client-secret>
  scope=https://management.azure.com/.default
```

---

### 3.2 Managed Identity – System-Assigned

1. Enable the system-assigned managed identity on your Azure compute resource (App Service, VM, Container App, Azure Function, etc.).
2. Grant the identity the **API Management Service Contributor** RBAC role on the APIM resource.
3. Set the environment variable:

   ```bash
   export USE_MANAGED_IDENTITY=true
   ```

`AZURE_CLIENT_ID` must **not** be set (or left empty) so that the system-assigned identity is used.

In [`auth/authenticator.js`](../auth/authenticator.js) the relevant code path is:

```javascript
if (useManagedIdentity) {
    credential = clientId
        ? new ManagedIdentityCredential(clientId)  // User-assigned MI
        : new ManagedIdentityCredential();          // System-assigned MI
}
```

In [`scripts.v3/utils.js`](../scripts.v3/utils.js) the `getAccessToken` method calls:

```bash
az login --identity
```

---

### 3.3 Managed Identity – User-Assigned

1. Create a user-assigned managed identity in the Azure portal.
2. Assign the identity to your compute resource.
3. Grant the identity the **API Management Service Contributor** RBAC role on the APIM resource.
4. Set environment variables:

   ```bash
   export USE_MANAGED_IDENTITY=true
   export AZURE_CLIENT_ID=<client-id-of-user-assigned-mi>
   ```

In [`scripts.v3/utils.js`](../scripts.v3/utils.js) the `getAccessToken` method calls:

```bash
az login --identity --username <AZURE_CLIENT_ID>
```

---

### 3.4 DefaultAzureCredential (Auto-Detection)

When neither `USE_MANAGED_IDENTITY` nor `AZURE_CLIENT_SECRET` is set, [`auth/authenticator.js`](../auth/authenticator.js) falls back to `DefaultAzureCredential`, which tries credential sources in this order:

1. Environment variables (`AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID`)
2. Workload Identity (Kubernetes)
3. Managed Identity (when running in Azure)
4. Azure CLI (`az login`)
5. Azure PowerShell
6. Azure Developer CLI

This is the recommended approach for flexible local development and CI/CD pipelines.

---

### 3.5 Generating SAS Tokens (SharedAccessSignature)

The Data API uses SharedAccessSignature (SAS) tokens for authenticated user requests. Generate one from the ARM Management API:

```
POST https://management.azure.com/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.ApiManagement/service/<name>/users/{userId}/token?api-version=2023-03-01-preview
Authorization: Bearer <ARM token>
Content-Type: application/json

{
  "properties": {
    "keyType": "primary",
    "expiry": "2099-12-31T23:59:59Z"
  }
}
```

The response contains a `value` field with the SAS token in the form:

```
uid=1&ex=2099-12-31T23%3A59%3A59.0000000Z&sn=<signature>
```

Use this as the `Authorization` header value (prefixed with `SharedAccessSignature `).

---

### 3.6 Extracting Tokens from the Browser (Quick Approach)

1. Open the developer portal in the browser and sign in.
2. Open DevTools → **Network** tab.
3. Trigger any API call (e.g., navigate to **APIs**).
4. Inspect a request to `*.developer.azure-api.net` and copy the `Authorization` header value.

This is useful for quick ad-hoc Postman testing but the token expires and must be refreshed manually.

---

## 4. Comparison: Service Principal vs. Managed Identity

| Feature | Service Principal + Secret | Managed Identity |
|---------|---------------------------|-----------------|
| Secret management | Required (store & rotate secrets) | None (Azure-managed) |
| Secret rotation | Manual | Automatic |
| Works locally | Yes | Requires Azure compute or emulation |
| Works in Azure | Yes | Yes (best practice) |
| Required env vars | `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` | `USE_MANAGED_IDENTITY=true` (+ optionally `AZURE_CLIENT_ID` for user-assigned) |
| Best use case | Local dev, CI/CD pipelines | Production workloads in Azure |

---

## 5. Quick Reference

### Base URLs

| Purpose | URL |
|---------|-----|
| ARM Management API | `https://management.azure.com/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.ApiManagement/service/<name>` |
| Data API | `https://<service>.developer.azure-api.net/developer` |

### API Versions

| API | Version |
|-----|---------|
| ARM Management API | `2023-03-01-preview` (see `managementApiVersion` in [`src/constants.ts`](../src/constants.ts)) |
| Data API | `2022-04-01-preview` (see `dataApiVersion` in [`src/constants.ts`](../src/constants.ts)) |

### Auth Headers

| Method | Header |
|--------|--------|
| ARM Bearer | `Authorization: Bearer <token>` |
| SAS | `Authorization: SharedAccessSignature uid=...&ex=...&sn=...` |

### Common Data API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/apis` | GET | List all APIs |
| `/apis/{apiId}` | GET | Get API details |
| `/apis/{apiId}/operations` | GET | List API operations |
| `/products` | GET | List products |
| `/users/{userId}/subscriptions` | GET | List user subscriptions |
| `/identity` | GET | Refresh user identity/token |
| `/tags` | GET | List tags |
