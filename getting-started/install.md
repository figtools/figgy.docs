---
title: Installing Figgy
has_children: false
nav_order: 1
parent: Getting Started
---


# Installation
Installing Figgy is _easy_.

*MacOs*

    $    brew install figtools/figgy/figgy
        
*Windows, Linux, or Mac* (requires Python 3)

    $    pip3 install figgy-cli



The homebrew installation is a little slow because it requires installing a brand new virtual environment and all dependencies. 
I hope to make this experience better in the future. 




## Configuring Figgy
Configuring the Figgy CLI is as simple as running.

    figgy --configure
    
    
You will be guided through configuration. Before running `--configure` you'll need to know what type of authentication 
you'll be using: Bastion, Google SSO, or OKTA SSO. See [Figgy Deployment](/docs/deployment/index.html)


## Distributing Figgy

If you are rolling Figgy out across an organization it might be easiest to auto-configure some sane defaults for users.
Sane defaults can be written to the figgy defaults file: `~/.figgy/config`.

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