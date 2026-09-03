> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Enterprise Connections

> Connect your Organization to your existing enterprise authentication system

## Setting up SSO with Okta

### Part 1: Okta Setup

Reference Documentation: [Link](https://auth0.com/docs/authenticate/identity-providers/enterprise-identity-providers/okta#create-okta-workforce-enterprise-connection-in-auth0)

1. Sign into Okta and go to Admin console from top right.
2. Select Applications from the left and click on **Create an Application Integration**.
3. In the create application wizard, select: **OIDC** and **Web Application**.
4. Add [https://auth.vectorshift.ai/login/callback](https://auth.vectorshift.ai/login/callback) as the **login callback URI** and hit save.
5. Copy the **client ID** and **client secret** from the new window that opens up. Also copy the okta domain from the drop down on top right (may end with `.okta.com` or `.oktapreview.com`).
6. Go to Directory and assign the newly created Application to people/groups (Can also be done from Application page → Assignments).

### Part 2: VectorShift Setup

1. Go to your organization account with Enterprise permissions.
2. Click account from top-left and select Organization Overview.
3. Select Enterprise Connections and pull down Okta.
4. Paste Okta domain that we copied in Step 5 of Okta Setup.
5. Paste the client ID and secret copied at Step 5 of Okta Setup in the enterprise form.
6. Add email suffix in domain alias (example: vectorshift.ai). All logins from emails with this suffix will redirect to your Okta account for verification. In case there are more than one, add all entries separated by commas (no spaces in between) - example: `vectorshift1.ai`, `vectorshif2.ai`.
7. Hit save and you’re done.
