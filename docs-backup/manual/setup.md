A working Figgy installation has two main parts:

- Figgy Cloud
- Figgy CLI
    
Setup in your organization requires setting up Figgy Cloud *first*. If you're still evaluating Figgy and don't want to
go through the trouble of installing Figgy Cloud, you can experiment with Figgy through our
free [Sandbox](/docs/getting-started/sandbox). The Sandbox is a hosted Figgy Cloud installation designed for public
experimentation and consumption. Once you're ready to adopt Figgy, continue below:
    
    
## Figgy Cloud

Figgy Cloud is a suite of services that "keep the trains running on time" in your AWS accounts. These services 
maintain the integrity of your configuration tree, support the FiggyCLI, and provide facilities for
configuration backup and restoration. Deploying Figgy starts with deploying Figgy Cloud, and to do so, you will need to
decide what type of Figgy Cloud deployment makes the most sense for your organization. Below you'll find explanations of 
the different deployment options. 

[I'm ready to pick the right Figgy Cloud for me!](/docs/manual/figgy-cloud/index.md)

    
## Figgy CLI

The FiggyCLI is a CLI utility that integrates with your SSO provider and Figgy Cloud installation to provide users
with fundamental Figgy functionality needed for users day-to-day workflow. FigglyCLI is 
[simple to install](/docs/getting-started/install.md) but requires a Figgy Cloud backend for to work
in your organization. 


### Configuring Figgy CLI
Configuring the Figgy CLI is as simple as running.

    figgy --configure
    
    
You will be guided through configuration. Before running `--configure` you'll need to know what type of authentication 
you'll be using: Bastion, Google SSO, or OKTA SSO. See [Figgy Deployment](/docs/manual/figgy-cloud/index/)

<br/>

## Distributing Figgy

If you are rolling Figgy out across an organization it might be easiest to auto-configure some sane defaults for users.
Sane defaults can be written to the figgy defaults file: `~/.figgy/config`. Users will be presented with options to 
keep or override any defaults defined in the `~/.figgy/config` file when running `figgy --configure`. Without this *optional* 
defaults file, users will be prompted to manually enter all configurations required by your selected 
Figgy Cloud installation below:

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