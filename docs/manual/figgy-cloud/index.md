## Deploying Figgy

Before you deploy Figgy into your environment you must decide which authentication method works best for your
organization. Once you have selected, continue to the associated setup guide based on your selection.

The different deployment options available are:

### Bastion Authentication

A Figgy Bastion configuration turns one of your AWS accounts into your Figgy 'SSO' provider. It's the simplest configuration
and can be installed in under an hour. Users who authenticate with Figgy will authenticate with this account and will have 
no access, except permissions to assume roles in _other_ Figgy-enabled accounts through temporary AWS STS sessions.

<br/>![Bastion Auth](/docs/images/deployment/bastion-auth.png)<br/>

There is no limit to the number of accounts you can integrate with your Bastion account. Users will be provided
a single long-lived AWS Keypair to authenticate with the bastion account. From there, MFA can be enabled and users
will be required input an MFA token when generating temporary sessions in other accounts.
[Sign me up!](/docs/manual/figgy-cloud/bastion/)
<br/>
<br/>



### Google Auth

Figgy can integrate directly with Google Admin Console to provide Federated access to your AWS accounts through 
SAML based authentication with Google as your identity provider (IDP). If you don't want to manage any AWS user accounts
and you already leverage Google Apps this can be an elegant solution to managaing AWS access for your organization. 

<br/>![Google Auth](/docs/images/deployment/google-sso.png)<br/>

To read about this solution check out the docs! [Sign me up!](/docs/manual/figgy-cloud/google/)

<br/>
<br/>

### OKTA

OKTA is a true SSO solution and the ideal Identity Provider to integrate with Figgy. OKTA has built-in SAML support 
for AWS through an internal OKTA application that is well documented and easy to configure. If you're using OKTA we 
highly recommend you select this integration.

<br/>![Okta Auth](/docs/images/deployment/okta-sso.png)<br/>

To read about this solution check out the below docs!
[Sign me up!](/docs/manual/figgy-cloud/okta/)


### Standard AWS IAM

Figgy is designed for deep and convenient SSO integrations with OKTA, Google, or through AWS Bastion accounts. 
We **strongly** recommend selecting one of these use cases for virtually ALL use cases. 

That being said; we recognize the cloud is complicated and often teams are faced with complex technical debt or unique business 
constraints that may affect the opportunity to integrate through one of the above SSO solutions. If this applies to you, 
or if you want to do some light experimentation with Figgy in a _single_ account, the below integration option will work for you.

<br/>![Standard Auth](/docs/images/deployment/standard-auth.png)<br/>


This type of authentication might be ideal for small organizations that have a single AWS account and maintain all of 
their environments in this account. 

Standard AWS authentication essentially bypasses the following Figgy security and convenience features:

- SSO authentication
- Temporary session credentials for all sessions
- MFA support
- Figgy Vault

Instead this integration relies *entirely* on the user's locally configured AWS profiles. This integration was originally
designed to simplify and support CICD pipeline deployments. 

[I understand that this isn't ideal, but Sign me up!](/docs/manual/figgy-cloud/standard/)

