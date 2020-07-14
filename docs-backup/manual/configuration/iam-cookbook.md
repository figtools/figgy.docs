
## IAM Cookbook

On this page you will find some recommendations on how you can appropriately expand and customize your existing
Figgy deployment.

1. [Expanding user access](#expanding-user-access)
1. [Give your services **twig** access](#grant-appropriate-access-to-your-services)


## Expanding user access

When you deploy Figgy, IAM users, roles, and  policies will be dynamically generated based on your selections in the 
Figgy Terraform configuration files. These IAM roles and polices may overlap with preexisting users or roles that were
previously added to your AWS accounts for user access.

While Figgy is principally designed as a config management solution, we recognize that it's deeply integrated with your AWS accounts,
and a core tenant of the software is secure management of temporary AWS sessions. This makes Figgy an ideal solution for providing
temporary access credentials to your team. For this reason Figgy already supports the `iam export` command. This command will 
authenticate with your SSO provider and write temporary credentials to the user's `~/.aws/credentials` file. 
These temporary credentails can be picked up like any other AWS access keys stored in this file with the 
added benefit of auto-expiration. By making Figgy your local IAM access provider, you can reduce credential exposure 
and abandon all long live AWS Access Keys your users may be using. 

The default IAM policies configured by a standard Figgy deployment are least privilege and are not of any use outside the specific 
use-case that Figgy supports. However you may want to add more IAM roles or expand the existing default 
Figgy IAM policies in your Forked Figgy repository. 

To support updates from the root Figgy repository we recommend you make these any changes in **new** terraform files 
rather than editing existing Figgy deployments. 

For instance, suppose you wanted to grant all Figgy users S3 ReadOnly access to all S3 resources across all accounts, 
you could accomplish it like this:

First, create a new terraform file in `figgy/terraform/` named `custom_iam_s3.tf`

First, lets find the existing `AmazonS3ReadOnlyAccess` policy:

```terraform
data "aws_iam_policy" "s3_read" {
  arn = "arn:aws:iam::${var.aws_account_id}:policy/AmazonS3ReadOnlyAccess"
}
```

Next lets attach this policy to all existing roles.

```terraform
resource "aws_iam_role_policy_attachment" "s3_read_all_roles" {
  count = length(local.role_types)
  role = local.auth_type == "bastion"? aws_iam_role.bastion_user_role[count.index].name: aws_iam_role.sso_user_role[count.index].name
  policy_arn = data.aws_iam_policy.s3_read.arn
}
```

That's it! Now your Figgy users can export IAM credentials with S3Read access!

    $   figgy iam export --env dev
    $   aws s3 ls s3://
    
This is a simplistic example, but you can easily expand this example across specific roles or accounts to expand your own
IAM RBAC. 


## Grant appropriate access to your services

Glad to see you're all-in on Figgy and want to provide the appropriate level of IAM access to your services. Below is an example
policy for providing a service named `message-fetcher` the exact access it needs to read its configurations under: `/app/message-fetcher`.

Below there is a JSON and a HCL (Terraform) example.

You will need to replace `twig`, `replication_key_arn`, and `app_key_arn` with the appropriate references to KMS keys.
In this example. `twig` should be `/app/message-fetcher`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "KmsDecryptPermissions",
            "Effect": "Allow",
            "Action": [
                "kms:DescribeKey",
                "kms:Decrypt"
            ],
            "Resource": [
               "${replication_key_arn}", 
               "${app_key_arn}"
           ]
        },
        {
            "Sid": "ListKeys",
            "Effect": "Allow",
            "Action": [
                "kms:ListKeys"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Sid": "SSMPerms",
            "Effect": "Allow",
            "Action": [
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:GetParameterHistory",
                "ssm:GetParametersByPath",
                "ssm:DescribeParameters"
            ],
            "Resource": [
                "arn:aws:ssm:*:${account_id}:parameter/${twig}/*",
                "arn:aws:ssm:*:${account_id}:parameter/${twig}/*"
            ]
        }
    ]
}


```

Here is the equivalent of doing this through terraform

```terraform
resource "aws_iam_policy" "service_ssm_read" {
  name = "${var.my_service_name}-read-figs"
  policy = data.aws_iam_policy_document.aws_iam_policy_document.json
}

data "aws_iam_policy_document" "aws_iam_policy_document" {
  statement {
    sid = "KmsDecryptPermissions"
    actions = [
      "kms:DescribeKey",
      "kms:Decrypt"
    ]
    resources = [
      aws_kms_key.replication_key.arn,
      ## This references the `app` encryption key, you may need to adjust based on your design.
      aws_kms_key.encryption_key[0].arn,
    ]
  }

  statement {
      sid = "ListKeys",
      action =  [ "kms:ListKeys" ],
      resources = [ "*" ]
  }
  
  statement {
      sid = "AppRead",
    
      actions = [
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParameterHistory",
        "ssm:GetParametersByPath",
        "ssm:DescribeParameters"
      ], 
    
      resources = [
        "arn:aws:ssm:*:${account_id}:parameter/app/${app_namespace}/*",
        "arn:aws:ssm:*:${account_id}:parameter/app/${app_namespace}*"
      ]
  }
}
```


