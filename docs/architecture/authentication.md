
## Authentication

Figgy currently supports three main types of authentication. Regardless of which authentication method works best
for your use case, all three options enforce the following security best practices including:

- Single sign on
- Multi-factor authentication
- Temporary session credentials for all Figgy activity with a max duration of 12 hours
    - Encrypted temporary credential storage


The three main types of authentication are:

1. [Bastion](/deployment/bastion/)
1. [Google SSO](/deployment/google/)
1. [OKTA SSO](/deployment/okta/)

All of these enforce sign on through a single provider and do not require multiple sets of credentials to be maintained. 

## Local Session Caching

Figgy CLI will cache authenticated SSO sessions in its local encrypted 'vault' (`~/.figgy/vault/*`). 
Files in the vault are encrypted using a symmetric encryption key generated based from the user's password. 
If a user has a valid active SSO Session, Figgy CLI will reuse the existing session to generate new 
STS credentials as needed.

> Figgy does not greedily generate sessions. Sessions are generated as-needed to support requested CLI operations. 

**ONLY TEMPORARY CREDENTIALS ARE STORED IN THE FIGGY VAULT** 

## Local Password Storage

For Google and OKTA SSO configurations, the user's password will be saved in their local OS keychain under 
the `figgy` namespace. 

![Auth Keychain](/docs/images/architecture/auth-keychain.png)

The Figgy CLI will attempt to retrieve these credentials on the user's behalf when existing cached SSO sessions have expired.
The frequency of this is dependant on SSO provider configurations. Organizations configured to use the [Bastion](/deployment/bastion/)
authentication provider do not require passwords and instead use AWS API Keys. These low-power keys are stored in the user's 
`~/.aws/credentials` file like all other AWS credentials. 

We **strongly recommend** enabling multi-factor authentication for Bastion configurations. 

