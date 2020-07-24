This page should serve as a reference only. Please follow the appropriate FiggyCLoud [deployment guide](/manual/figgy-cloud/) first.


Configuring FiggyCloud requires modifying 2-3 Terraform files based on your selected deployment strategy. All configuration files 
referenced here are from our public [Figgy Cloud repository](https://github.com/figtools/figgy/tree/master/terraform)

## `00_main.tf`

This must be updated for all Figgy deployments.

This is a standard terraform configuration file that links your FiggyCloud deployment to targeted AWS accounts. 
Generally you will want to configure one Terraform "Workspace" for each AWS Account you intend to integrate with Figgy.

Reference Docs:

1. [Terraform AWS Provider Docs](https://www.terraform.io/docs/providers/aws/index.html)
1. [Terraform Backends](https://www.terraform.io/docs/backends/index.html)
1. [Terraform Workspaces](https://www.terraform.io/docs/state/workspaces.html)


## `01_configure_figgy.tf`

This must be updated for all Figgy deployments.

Options:

---
#### create_deploy_bucket

```terraform
    create_deploy_bucket = true
```

Set to 'true' if you want to Figgy to create an S3 bucket to support its deployment. The bucket-name must be configured
in the associated `.tfvars` file for each AWS Account / Terraform Workspace.

---
#### configure_cloudtrail
```terraform
    configure_cloudtrail = true
```

Figgy requires [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) to be enabled on every integrated AWS account. Figgy Cloud
deploys [Lambda](https://aws.amazon.com/lambda/) functions in each AWS account that consume CloudTrail events. If you already have
AWS CloudTrail enabled with events logging to an S3 bucket then you can stop here. If you want to enable CloudTrail yourself,
you will need to have a minimum policy like this associated with your CloudTrail Bucket:
 
```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AWSCloudTrailAclCheck",
                "Effect": "Allow",
                "Principal": {
                  "Service": "cloudtrail.amazonaws.com"
                },
                "Action": "s3:GetBucketAcl",
                "Resource": "arn:aws:s3:::${BUCKET_ID}"
            },
            {
                "Sid": "AWSCloudTrailWrite",
                "Effect": "Allow",
                "Principal": {
                  "Service": "cloudtrail.amazonaws.com"
                },
                "Action": "s3:PutObject",
                "Resource": "arn:aws:s3:::${BUCKET_ID}/AWSLogs/*",
                "Condition": {
                    "StringEquals": {
                        "s3:x-amz-acl": "bucket-owner-full-control"
                    }
                }
            }
        ]
    }
  }
```

References: 

1. [CloudTrail Docs](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-getting-started.html)

---
#### role_types

```terraform
  role_types = ["devops", "data", "dba", "sre", "dev"]
```

Each user that authenticates with Figgy must authenticate as a designated _role_. Each role specified 
directly corresponds to a provisioned IAM role in each Figgy-integrated AWS Account. Roles allow you to carve
up access across different ParameterStore namespaces around boundaries that map to specific user stories.
The FiggyCLI seamlessly swaps between different roles so don't be afraid to have users with more than 1 role if it
makes sense from a security standpoint. 

---
#### encryption_keys

```terraform 
    encryption_keys = ["app", "devops", "dba", "sre"]
```

**This is the most important parameter selection**

Each named encryption key specified will result in Figgy Cloud provisioning 1 KMS key per account. KMS keys cost $1 per month,
per account, per key, so if you have 5 accounts and 3 keys, you're looking at 15.00/mo indefinitely. Deprovisioning keys can 
be challenging once they have already been used to encrypt and store data, so avoid needlessly over-provisioning keys here.

As a best practice, you will want at least 1 KMS encryption key per type of "SecretOwner" you have. For instance, in the 
above example you these secret owner types: DevOps, DBA, SREs, and Data Engineers + Developers who have their own
application level secrets. In this case, it's a good idea to have a different key for DevOps / SRE / DBAs, and a shared 
encryption key between Developers / Data Engineers since they typically maintain application-specific secrets. Your use
case may be _complete different_ and that's totally O.K! 

So in total that would make 4 keys: `["app", "devops", "dba", "sre"]`

!!! warning "Important"
         Once you specify these KMS keys, you can add to them, but deleting any key _except_ the last key will cause
         Terraform to destroy and reprovision other keys. The _last_ thing you want is to destroy a KMS key by accident.
         Consider any added key permanent. Be extremely careful if you intend to delete a provisioned KMS key.
         
---
#### root_namespaces

```terraform
    root_namespaces = ["/shared", "/app", "/data", "/devops", "/sre", "/dba"]
```

Figgy obeys orders and will not have access to any namespaces except the ones you tell it to have access to. The list
provided here will give Figgy access to manage configurations under these namespaces. Figgy will also have access to the `/figgy`
namespace by default. 

**`/shared` is a non-optional namespace and is required by Figgy conventions**

---
#### service_namespace

```terraform
    service_namespace = "/app"
```

One required Figgy convention is specifying a "service namespace". All application configurations and secrets
will be stored under this namespace. Every service you deploy will pull its configurations from this namespace. More 
specifically, it will pull its configurations from its [Twig](/getting-started/concepts/#twig). 

Your selection here must map to one of the namespaces specified under `root_namespaces`

---
#### role_to_ns_access

```terraform
    role_to_ns_access = {
      "devops" = ["/app", "/devops", "/data", "/sre", "/shared"],
      "data" = ["/app", "/data", "/shared"],
      "sre" = ["/sre", "/app", "/data", "/shared"],
      "dev" = ["/app", "/shared"],
      "dba" = ["/dba", "/app", "/shared"]
    }
```

The above block will map each of you defined [roles](#role_types) to one or more [namespaces](#root_namespaces). Be careful
to not make any typos.

---
#### role_to_kms_access

```terraform
    role_to_kms_access = {
      "devops" = [ "devops", "app", "data" ]
      "data" = [ "data", "app" ]
      "dba" = [ "data", "app" ]
      "sre" = [ "app" ]
      "dev" = [ "app"]
    }
``` 

The above block will map each of you defined [roles](#role_types) to one or more [encryption keys](#encryption_keys). Be careful
to not make any typos.

---
#### auth_type

```terraform
    # Options: "okta", "google", "bastion", "standard"
    auth_type = "bastion"
```

Select the appropriate authentication type based on your selected [deployment type](/manual/figgy-cloud/)

---
#### replication_key_access_envs

```terraform
    replication_key_access_envs = ["dev"]
```

Figgy uses a special KMS key called the `replication_key` to share parameters from owner namespaces to the 
applications that need them. The `replication_key` is the most sensitive KMS key Figgy manages and 
should be reserved only for applications in most cases. However, when developing and testing locally users may need
access to the `replication_key` to properly run their applications. If they do, add the environments users will develop
against to this list. 

!!! warning "Never, ever, add higher environments to this list! Non-prod, and preferably the lowest environments only."


## `02_configure_bastion.tf`

This file must be configured if you are using the [Bastion](/manual/figgy-cloud/bastion/) deployment type.

---
#### bastion_account_number

```terraform
    bastion_account_number = "123467891011"
```

AWS Account Id for the AWS account where users will be provisioned and maintained.

---
#### mfa_enabled

```terraform
    mfa_enabled = true
```

Force Figgy bastion users to use Multi-factor authentication? Users will not be able to use the FiggyCLI unless they have
configured virtual MFA in the bastion AWS account.

---

#### associated_accounts

```terraform
    associated_accounts = tomap({
      "dev" : "123467891011",
      "qa" :  "123467891011",
      "stage": "123467891011",
      "prod" : "123467891011",
      "bastion" : "123467891011"
    })
```

Here you will need to specify a mapping of your Figgy environment alias to AWS Account Ids. Your Figgy account alias
must match the name of your `env_alias` variable in each of your `vars/*.tfvars` files. Details on configuring these files
can be found below.

---
#### bastion_users

```terraform
    bastion_users = tomap({
      "jordan.devops": ["devops", "dev", "dba", "sre", "data"]
      "jordan.dba": ["dba"]
      "jordan.sre": ["sre"]
      "jordan.data": ["dba", "data"]
      "jordan.dev": ["dev"]
    })
```

Define each user in this above block and map the [role_types](#role_types) they should have access to. These users will
only be provisioned in your designated [bastion account](#bastion_account_number).

---

## `vars/*.tfvars` Files

If you are using [Terraform Cloud](https://app.terraform.io/) (which is great!) then you will need to save these values as
variables in Terraform Cloud instead of specifying them here.

These `tfvars` files enable you to deploy FiggyCloud across many disparate accounts with a lot of copy-pasta. You will need
to create 1 `tfvars` file for each Figgy-integrated AWS account. The values in each file should be self explanatory.

#### env_alias

Short for "run environment". Each "run envionment" maps to a specific AWS account. When users run commands like:

```console
    figgy config get --env dev
``` 

They are targeting a `env_alias` with the `--env` flag. 


!!! hint
    It's a good idea to select a short and simple name for `env_alias`. Users will be specifying different environments
    regularly when using the FiggyCLI.




#### deploy_bucket

This bucket can exist or we can create it on your behalf. See [create_deploy_bucket](#create_deploy_bucket). Figgy
needs a bucket to deploy its Lambda artifacts in. 

```terraform
    deploy_bucket = "com.your-company.figgy-dev-deploy"
```
