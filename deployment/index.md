---
title: Deploying Figgy
has_children: true
parent: Getting Started
nav_order: 6
---

## Deploying Figgy

Before you deploy Figgy into your environment you must decide which authentication method works best for your
organization. Once you have selected, continue to the associated setup guide based on your selection.

The different deployment options available are:

### Bastion Authentication

A Figgy Bastion configuration turns one of your AWS accounts into your Figgy 'SSO' provider. It's the simplest configuration
and can be installed in under an hour. Users who authenticate with Figgy will authenticate with this account and will have 
no access, except permissions to assume roles in _other_ Figgy-enabled accounts through temporary AWS STS sessions.

<br/>![Bastion Auth]({{ '/docs/assets/images/deployment/bastion-auth.png' | relative-url }})<br/>

There is no limit to the number of accounts you can integrate with your Bastion account. Users will be provided
a single long-lived AWS Keypair to authenicate with the bastion account. From there, MFA can be enabled and they
will need to input an MFA token to generate temporary sessions other accounts.
[Sign me up!](/docs/deployment/bastion.html)
<br/>
<br/>



### Google Auth

Figgy can integrate directly with Google Admin Console to provide Federated access to your AWS accounts through 
SAML based authentication with Google as your identity provider (IDP). If you don't want to manage any AWS user accounts
and you already leverage Google Apps this can be an elegant solution to managaing AWS access for your organization. 

<br/>![Google Auth]({{ '/docs/assets/images/deployment/google-sso.png' | relative-url }})<br/>

To read about this solution check out the docs! [Sign me up!](/docs/deployment/google.html)

<br/>
<br/>

### OKTA

OKTA is a true SSO solution and the ideal Identity Provider to integrate with Figgy. OKTA has built-in SAML support 
for AWS through an internal OKTA application that is well documented and easy to configure. If you're using OKTA we 
highly recommend you select this integration.

<br/>![Okta Auth]({{ '/docs/assets/images/deployment/okta-sso.png' | relative-url }})<br/>

To read about this solution check out the below docs!
[Sign me up!](/docs/deployment/okta.html)