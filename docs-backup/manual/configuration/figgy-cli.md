The FiggyCLI can walk the user through configuration with the [Configure](/docs/commands/other/configure/) command.
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