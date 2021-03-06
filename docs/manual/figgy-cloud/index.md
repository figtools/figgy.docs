## Deploying Figgy

Figgy Cloud supports four different authentication strategies, each of which slightly change the deployment footprint in
your AWS environment. Below you will find a list of all support authentication strategies supported by Figgy. 
Once you have selected the best fit, continue to the associated setup guide based on your selection.

### Bastion Authentication

As the simplest Single Sign-on configuration, and one that can be set-up within an hour, the Figgy Bastion configuration 
turns one of your AWS accounts into your own Figgy SSO provider. Users authenticating with Figgy will be authenticating
with a single SSO Bastion account. From this account, users will then assume roles into _other_ Figgy-enabled accounts 
via temporary AWS STS sessions.

<br/>![Bastion Auth](/images/deployment/bastion-auth-2.png)<br/>

There is no limit to the number of accounts you can integrate with your bastion account. Users will be provided
a single long-lived AWS keypair to authenticate with the bastion account. From there, multi-factor authentication can 
be enabled and users will be required input an MFA token when generating temporary sessions in other accounts.
[Sign me up!](/manual/figgy-cloud/bastion/)
<br/>
<br/>



### Google Auth

Figgy can integrate directly with Google Admin Console to provide Federated access to your AWS accounts through 
SAML based authentication with Google as your identity provider (IDP). If you don't want to manage any AWS user accounts
and  already leverage Google Apps, this can be an elegant solution to managaing AWS access for your organization. 

<br/>![Google Auth](/images/deployment/google-sso-2.png)<br/>

To read about this solution check out the docs! [Sign me up!](/manual/figgy-cloud/google/)

<br/>
<br/>

### OKTA

OKTA is a true SSO solution and the ideal Identity Provider to integrate with Figgy. OKTA has built-in SAML support 
for AWS through an internal OKTA application that is well documented and easy to configure. If you're using OKTA we 
highly recommend you select this integration.

<br/>![Okta Auth](/images/deployment/okta-sso-2.png)<br/>

To read about this solution check out the below docs!
[Sign me up!](/manual/figgy-cloud/okta/)


### Standard AWS IAM

Figgy is designed for deep and convenient SSO integrations with OKTA, Google, or through AWS Bastion accounts. 
We **strongly** recommend selecting one of these use cases for virtually ALL use cases. 

That being said; we recognize the cloud is complicated and often teams are faced with complex technical debt or unique business 
constraints that may affect the opportunity to integrate through one of the above SSO solutions. If this applies to you, 
or if you want to do some light experimentation with Figgy in a _single_ account, the below integration option will work for you.

<br/>![Standard Auth](/images/deployment/figgy-standard.png)<br/>


This type of authentication might be ideal for small organizations that have a single AWS account and maintain all of 
their environments in this account. 

Standard AWS authentication essentially bypasses the following Figgy security and convenience features:

- SSO authentication
- Temporary session credentials for all sessions
- MFA support
- Figgy Lockbox

Instead this integration relies *entirely* on the user's locally configured AWS profiles. This integration was originally
designed to simplify and support CICD pipeline deployments. 

[I understand that this isn't ideal, but Sign me up!](/manual/figgy-cloud/standard/)

