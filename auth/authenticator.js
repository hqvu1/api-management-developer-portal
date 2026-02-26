const {
    DefaultAzureCredential,
    ManagedIdentityCredential,
    ClientSecretCredential,
    InteractiveBrowserCredential,
} = require("@azure/identity");

// Options may include tenantId, clientId, clientSecret, and useManagedIdentity
async function getArmToken(options = {}) {
    let credential;

    const clientId = options.clientId || process.env.AZURE_CLIENT_ID;
    const tenantId = options.tenantId || process.env.AZURE_TENANT_ID;
    const clientSecret = options.clientSecret || process.env.AZURE_CLIENT_SECRET;
    const useManagedIdentity = options.useManagedIdentity || process.env.USE_MANAGED_IDENTITY === "true";

    if (useManagedIdentity) {
        credential = clientId
            ? new ManagedIdentityCredential(clientId)  // User-assigned MI
            : new ManagedIdentityCredential();          // System-assigned MI
    } else if (clientSecret) {
        credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    } else if (tenantId || clientId) {
        // Use interactive browser authentication (developer/manual mode)
        credential = new InteractiveBrowserCredential({
            tenantId: tenantId,
            clientId: clientId,
            loginStyle: "popup",
        });
        console.log("Please sign in via the browser window that will open...");
    } else {
        credential = new DefaultAzureCredential();
    }

    // Request ARM token for the Management API
    const scope = "https://management.azure.com/.default";
    const response = await credential.getToken(scope);

    if (response && response.token) {
        console.log(
            "Successfully acquired token with expiration at",
            response.expiresOnTimestamp
                ? new Date(response.expiresOnTimestamp).toLocaleString()
                : "unknown"
        );
        return `${response.tokenType} ${response.token}`; // Returns the actual token string
    } else {
        throw new Error("Failed to acquire token. Empty response.");
    }
}

module.exports = getArmToken;
