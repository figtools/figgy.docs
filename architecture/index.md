---
title: Architecture
has_children: true
nav_order: 7
has_toc: true
---

# Architecture

Figgy is a lot more than just a CLI, it's part of a larger config management ecosystem that must be deployed across
all integrated AWS accounts.  Below is a diagram of the entire Figgy Ecosystem. You will see OKTA, Google, 
and AWS as Identity Providers in this diagram; however, depending on your configuration, 
two of those will not exist for your deployment.

<br/>![Figgy Ecosystem]({{ '/docs/assets/images/deployment/figgy-ecosystem.png' | relative-url }})<br/>

Your _ecosystem_ depends on how you configure Figgy. Every Figgy deployment will require the following
resources to be provisioned in each integrated AWS account. As always, you can and **should** look over the Terraform
code in our public repository to see what to expect. You can find it here: 
<a href="https://github.com/figtools/figgy/tree/master/terraform/figgy" target="_blank">Figgy Infrastructure Code</a>


