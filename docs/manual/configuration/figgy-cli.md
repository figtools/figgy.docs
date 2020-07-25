The FiggyCLI can walk the user through configuration with the [Configure](/commands/other/configure/) command.
This is great for many use-cases but may not be ideal when distributing Figgy across your organization. Below you will 
find a reference file for auto-configuring the FiggyCLI for users. Users will _still_ need to run `figgy --configure` to
setup Figgy on their local machine to select some user-specific options. 

## Distributing Figgy

If you are rolling Figgy out across an organization it might be easiest to auto-configure some sane defaults for users.
Sane defaults can be written to the figgy defaults file: `~/.figgy/config`. When users run `figgy --configure` they will
have the option to keep or overwrite any defaults in this file. Without this defaults file users will be prompted to
manually enter all configurations required by your selected Figgy Cloud installation below:

All configs listed below are optional. Feel free to remove items irrelevant to your deployment.

File: `~/.figgy/config` 
```ini
[FIGGY]
mfa_enabled = true
auto_mfa = false
colors_enabled = true
report_errors = true
aws_region = us-east-1

[OKTA]
app_link = https://your-domain.okta.com/home/amazon_aws/FaKeStUfF123145faf11zf/123
factor_type = GOOGLE

[GOOGLE]
identity_provider_id = N0tre9le3
service_provider_id = 12345678010

[BASTION]
profile = bastion-sandbox-devops
```

## Figgy Config Options

## [Figgy]

#### mfa_enabled

Enables MFA for this user and will prompt them to enter an MFA code when authenticating. The type of 
MFA varies depending on sign-on integration. For instance, Google Admin Console integrations support 
SMS MFA, virtual MFA, or captchas. 

#### auto_mfa

Figgy can automatically generate multi-factor codes on the user's behalf rather than prompting
the user to input them manually. If `auto_mfa` is set to true, when the user runs `figgy --configure`
they will be prompted to input their MFA secret. The MFA secret will be stored securely in their OS keychain and 
will be tapped and used for one-time password code generation.

<br/>
<video autoplay loop muted class="video"><source src="/images/videos/totp-demo.mp4" type="video/mp4"></video>
<br/>

#### colors_enabled

Enable / Disable colors in the FiggyCLI. For Windows installations you will typically set this to `false`.

#### report_errors

Figgy will _never_ report errors without first showing the user the full stack trace to be reported and prompting 
them to continue. Please enable `report_errors`, it enables the Figgy team to quickly and efficiently address and patch bugs. 

#### aws_region

At this time Figgy can only target one region at a time. Figgy can always be re-configured to swap to a new region. 
Future enhancements will provide intuitive and quick multi-region swapping support.

## [OKTA]

#### app_link

The OKTA Application Embed link. See [Configuring OKTA](/manual/figgy-cloud/okta/)

#### factor_type

Figgy supports two different multi-factor authentication types with OKTA integrations. 

* GOOGLE - Google Authenticator (Recommended) [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US) [IOS](https://apps.apple.com/us/app/google-authenticator/id388497605)
* OKTA - [OKTA MFA](https://help.okta.com/en/prod/Content/Topics/Security/MFA.htm)
    * Okta Verify
    * SMS Push
    
> Existing testing for OKTA Verify / SMS Push MFA type has been limited. Please consider partnering and helping us improve this experience!

## [GOOGLE]

#### identity_provider_id

Google Identity Provider Id is a unique ID associated with your Google Account. When Google SSO was originally configured
for your installation you found this ID [here](/manual/figgy-cloud/google/#configure-aws-saml-application)

#### service_provider_id

The Google Service Provider Id is linked to your unique SAML application install in your Google Admin Console account. If
you delete and re-install your SAML application your Service Provider Id will change. Find it [here](/manual/figgy-cloud/google/#configure-aws-saml-application)

## [BASTION]

### profile

The `profile` property must map to a profile configured in your `~/.aws/credentials` and `~/.aws/config` files that 
is linked to the AWS Access Key and AWS Secret Access Key associated with your provisioned Bastion account user.

Bastion configurations read these credentials and use them to generate temporary sessions into other Figgy integrated
AWS accounts.