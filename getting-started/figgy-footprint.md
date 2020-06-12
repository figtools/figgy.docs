---
title: Figgy Footprint
has_children: false
parent: Deploying Figgy
nav_order: 5
---

## What does Figgy deploy?

Figgy is a lot more than just a CLI, it's part of a larger config management ecosystem that must be deployed across
your AWS accounts. Since you should never take provisioning resources in your AWS accounts lightly, we will discuss
_exactly_ what to expect when deploying Figgy into your environment. 

Below is a diagram of the entire Figgy Ecosystem. You will see OKTA, Google, and AWS as Identity Providers in this 
diagram; however, depending on your configuration, two of those will not exist for your deployment.

<br/>![Figgy Ecosystem]({{ '/docs/assets/images/deployment/figgy-ecosystem.png' | relative-url }})<br/>

Your _ecosystem_ depends on how you configure Figgy. Every Figgy deployment will require the following
resources to be provisioned in each integrated AWS account. As always, you can and **should** look over the Terraform
code in our public repository to see what to expect. You can find it here: 
<a href="https://github.com/mancej/figgy/tree/master/terraform/figgy" target="_blank">Figgy Infrastructure Code</a>

### Resources required for Figgy operation:
* 6 AWS Lambdas
* 3 AWS DynamoDB Tables
* AWS Cloudwatch Log Groups
* AWS IAM Roles & Polices required by the above Lambdas
* Figgy-specific ParameterStore parameters stored under the `/figgy` namespace.

**Other resources based on your configuration options:**
- AWS IAM Roles
- AWS IAM Policies
- AWS KMS Keys

**For Google & OKTA SSO Configurations:**
- 1 trusted Identity Provider - you will need to provide the IDP metadata

**For OKTA Integrations:**
- 1 (Optional) AWS IAM User

Optional, you can provide or the Figgy infra-as-code can do it:
- 1 AWS S3 Bucket for Figgy Lambdas to be deployed to
- AWS Cloudtrail must be enabled - Cloudtrail events are the backbone of Figgy's event pipeline

Figgy is designed to protect your sensitive applications and secrets. All Figgy resources are provisioned with a
focus on minimum privilege. 

<br/>![Figgy Footprint]({{ '/docs/assets/images/deployment/figgy-footprint.png' | relative-url }})<br/>

<br/><br/>

### Figgy optional anonymous usage data collection

In order to provide the best Figgy experience, users can optionally enable anonymous usage data collection. **This is
entirely optional and can be defaulted to off**. 

The data collected is the following:
- Current installed Figgy Version
- Command types run: [get, put, delete, sync, etc], and the # of times each command has been run.
- A random GUUID associated with your user. No personal data is collected.

The data is cached in a file at this location: `~/.figgy/cache/other/usage-metrics-cache.json`. Feel free to take a look.
The data is reported to `https://api.figgy.dev/v1/log-metrics` once per day.
You can find the code for usage tracking here: [Anonymouse Usage Tracking](https://github.com/mancej/figgy/blob/master/cli/figgy/svcs/observability/anonymous_usage_tracker.py)

