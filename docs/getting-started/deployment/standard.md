
> Figgy is designed for deep and convenient SSO integrations with OKTA, Google, or through AWS Bastion accounts. We **strongly** recommend selecting one of these other options for virtually ALL use cases. 


## Figgy Standard

If you've already read through [Deploying Figgy](/deployment/index.html) and you understand what you're giving up 
when using Figgy standard, continue reading here. No judgement here, let's get you set-up. 

The Figgy AWS Standard deployment by far the simplest deployment configuration. Figgy offloads all user-management to you.
As part of this deployment, Figgy will provision a set of groups -- one for each selected role-type you configure. You will be responsible for 
adding individuals to each group based on their desired role(s). Each users will need a set of long-lived AWS Access Keys
for each integrated account. 

#### This solution works well when you have one or two AWS accounts but becomes increasingly difficult to manage as your AWS account footprint grows.

Let's get started. 

Steps: 

1. [Configure Figgy](#configure-figgy)
1. [Deploy Figgy](#deploy-figgy)
1. [Grant Access](#grant-access)
1. [Test FiggyCLI](#test-figgy)

## Configure Figgy

First, clone [Figgy](https://github.com/figtools/figgy) locally.

```console
    $   git clone https://github.com/figtools/figgy.git
```

Next change directory into `figgy/terraform/figgy`

**To prepare Figgy for deployment you're going to need to tweak these files:**

1. 00_main.tf
1. 01_configure_figgy.tf
1. vars/{env}.tfvars files

### Configure Terraform
Lets' start with `00_main.tf`

If you have any familiarity with Terraform this should be a cinch. All you need to do is configure this file 
as you normally would for any other Terraform workspace. One important distinction is that this code base is a Terraform 
multi-environment codebase. We will be using this same Terraform configuration to deploy Figgy across
every account you want to integrate with Figgy. Keep that in mind -- hard-coding a single profile or access key is
probably not a good idea unless you are deploying Figgy to a single account.

Once your main.tf is configured you should be able to do something like this:
```
terraform init
terraform workspace new dev
terraform workspace select dev
``` 
Depend on your selected Terraform configuration these commands might differ slightly.

### Configure Figgy Install
Open up your `01_configure_figgy.tf` file. There are some important options in here. The comments in the file
should make it fairly clear what each option means. Since you're doing the "Standard Deployment", make sure to set

```hcl
    auth_type = "standard"
```

**Be sure to take extra care when mapping up your `roles` to `/namespaces`. If you make a typo you're going to experience
issues with Figgy*


### Fill out vars/ files
This step could vary depending on how you use Terraform and may need to be wired up in Terraform Enterprise or elsewhere.
Regardless, if you look in the `vars/` directory you will see sample `.tfvars` files that you will need to fill in. There
will be one `.tfvars` file for each account you are integrating. If there are extras, delete them.

Be thoughtful, if you are reusing a bucket and set `create_deploy_bucket = false` in `01_configure_figgy.tf` then you will
want to put the appropriate bucket name in each of these files for each account.

`run_env` must match to the environment names you set in your `02_configure_bastion` file in the `env -> accountId` map.

`webhook_url` is optional, but if you want you can add a Slack webhook url where Figgy can post notifications for configuration changes.

You may want to rename some of these files so they appropriately match your selected environment names.


## Deploy Figgy

The order you deploy these configurations to each account does not matter. But for the sake of this walk-through, lets start
with the `dev` account.

You'll want to run `terraform apply` for each environment. Each environment is associated with a `vars/env-name.tfvars` file. 

Here's what a workflow would look like:

```
terraform workspace select dev
terraform plan -var-file=vars/dev.tfvars
terraform apply -var-file=vars/dev.tfvars
```

DEV complete. Now QA:

```
terraform workspace select dev
terraform plan -var-file=vars/dev.tfvars
terraform apply -var-file=vars/dev.tfvars
```

You get the drift!
<br/>

## Grant Access

#### If you don't have the AWS CLI installed, install it: `pip install awscli` or `brew install awscli`

In each account you should see new groups that have been created, each named `figgy-{ROLE_TYPE}` where ROLE_TYPE is the 
name of the role you selected when you filled out [01_configure_figgy](#configure-figgy-install)

Add your user to one or more of these groups. Keep in mind, if your user is in multiple groups it will be granted access to the 
sum of all access across both groups. There is no concept of "impersonating" different roles with the Standard installation.

Let's assume you're logged into your DEV account. If you don't have AWS access keys generated yet, you'll want to go ahead and do that. 
Next, run: 

```console
    $   aws configure --profile dev
```

Follow the prompts. This will configure your AWS CLI installation with a "profile" for your DEV account. You may repeat
this step as may time and across as many accounts as you like. 


## Test Figgy

[Install Figgy](/getting-started/install.html)

For each account, test your access by running:

```console
    $   figgy config get --profile {PROFILE}
```

For each `profile` you selected earlier. 

With this configuration you will _always_ need to provide the `--profile` option. This option superecedes ALL other forms
of authentication and replaces the `--env` parameter. 

Below is an example of what you should see:

<br/>![Edit](/images/gifs/get-with-profile.gif)<br/>