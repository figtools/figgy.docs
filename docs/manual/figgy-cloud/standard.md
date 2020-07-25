!!! warning "Figgy is designed for deep and convenient SSO integrations with OKTA, Google, or through AWS Bastion accounts. We **strongly** recommend selecting one of these other options for virtually ALL use cases." 


## Figgy Standard

If you've already read through [Selecting a Deployment Type](/manual/figgy-cloud/) and you understand what you're giving up 
when using Figgy standard, continue reading here. No judgement here, let's get you set-up. 

The Figgy AWS Standard deployment by far the simplest deployment configuration. Figgy offloads all user-management to you.
As part of this deployment, Figgy will provision a set of groups -- one for each selected role-type you configure. You will be responsible for 
adding individuals to each group based on their desired role(s). Each user will need a set of long-lived AWS Access Keys
for each integrated account. 

**This solution works well when you have one or two AWS accounts but becomes increasingly difficult to maintain as your AWS account footprint grows.**

Let's get started. 


## Configure Figgy

- Make a private fork of <a href="https://github.com/figtools/figgy/tree/master" target="_blank">Figgy</a> and clone it locally. 

```console
git clone https://github.com/your-org/figgy.git
```

Next change directory into `figgy/terraform/`

**To prepare Figgy for deployment you're going to need to tweak these files:**

1. 00_main.tf
1. 01_configure_figgy.tf
1. vars/{env}.tfvars files

### Configure Terraform
Lets' start with `00_main.tf`

If you have any familiarity with [Terraform](https://www.terraform.io/) this should be a cinch. All you need to do is configure this file 
as you normally would any other [Terraform AWS provider](https://www.terraform.io/docs/providers/aws/index.html). 
One important distinction is that this code base is a Terraform multi-environment codebase. You will be using this same Terraform configuration to deploy Figgy Cloud to
every AWS account you want to integrate with Figgy. Keep that in mind -- hard-coding a single profile or access key is
probably not a good idea.

Once your main.tf is configured you should be able to do something like this:
```
terraform init
terraform workspace new dev
terraform workspace select dev
``` 
These commands might differ slightly depending on your selected Terraform configurations.

### Configure Figgy
Open up your `01_configure_figgy.tf` file. There are some important options in here. The comments in the file
should make it fairly clear what each option means. If you need more clarity, see our 
[configuration reference](/manual/configuration/figgy-cloud/). Since you're doing the "Standard Deployment", make sure to set:

```terraform
    auth_type = "standard"
```

**Be sure to take extra care when mapping up your `roles` to `/namespaces`. If you make a typo you're going to experience
issues with Figgy**


### Fill out vars/ files
This step could vary depending on how you use Terraform and may need to be wired up in Terraform Enterprise or elsewhere.
Regardless, if you look in the `vars/` directory you will see sample `.tfvars` files that you will need to fill in. There
will be one `.tfvars` file for each account you are integrating. If there are extras, delete them.

!!! tip "Don't forget to set  `create_deploy_bucket = false` in `01_configure_figgy.tf`, if you're using your own bucket. You will want to put the appropriate bucket name in each of the vars/* files for each account."

**env_alias**
This is the environment name users will be referencing your account by when running commands like 
`figgy config get --env dev`, so it's a good idea to select short aliases for each environment. 

**webhook_url** is optional, but if you want you can add a Slack webhook url where Figgy can post notifications for configuration changes.

> You may want to rename some of these files so they appropriately match your selected environment names.

## Deploy Figgy

The order you deploy these configurations to each account does not matter. But for the sake of this walk-through, lets start
with the `dev` account.

You'll want to run `terraform apply` for each environment. Each environment is associated with a `vars/env-name.tfvars` file. 

**Here's what a workflow would look like:**

=== "DEV"
    ```
    terraform init
    terraform workspace new dev
    terraform workspace select dev
    terraform apply -var-file=vars/dev.tfvars
    ```

=== "QA"
    ```
    terraform workspace new qa
    terraform workspace select qa
    terraform plan -var-file=vars/qa.tfvars
    terraform apply -var-file=vars/qa.tfvars
    ```

=== "STAGE"
    ```
    terraform workspace new stage
    terraform workspace select stage
    terraform plan -var-file=vars/stage.tfvars
    terraform apply -var-file=vars/stage.tfvars
    ```

You get the drift!

## Grant Access

#### If you don't have the AWS CLI installed, install it: 

    pip install awscli
            -or-
    brew install awscli

In each account you should see new groups that have been created, each named `figgy-{ROLE_TYPE}` where ROLE_TYPE is the 
name of the role you selected when you filled out [01_configure_figgy](#configure-figgy)

Add your user to one or more of these groups. Keep in mind, if your user is in multiple groups it will be granted access to the 
sum of all access across both groups. There is no concept of "impersonating" different roles with the standard installation.

Let's assume you're logged into your DEV account. If you don't have AWS access keys generated yet, you'll want to go ahead and do that. 
Next, run: 

```console
aws configure --profile dev
```

Follow the prompts. This will configure your AWS CLI installation with a "profile" for your DEV account. You may repeat
this step as may times and across as many accounts as you like. 


## Test Figgy

If you don't have the FiggyCLI installed, [install it](/getting-started/install/)

For each account, test your access by running:

```console
figgy config get --profile {PROFILE}
```

for each `profile` you selected earlier. 

With this configuration you will _always_ need to provide the `--profile` option. This option superecedes ALL other forms
of authentication and replaces the `--env` parameter. 

Below is an example of what you should see:

<br/>
<video autoplay loop muted class="video"><source src="/images/videos/demo-profile.mp4" type="video/mp4"></video>
<br/>
