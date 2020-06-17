---
title: Manage Application Configs
has_children: false
nav_order: 1
parent: How To
---

## Manage your Application Configs

One of the best features of using Figgy is knowing exactly _what_ configurations each of your applications needs to run
at any point in time. Every commit is essentially bound to a set of configurations that must exist for the associated version
of the application to run.

By doing this, users are granted these features:
    - Break CICD builds before the deploy step by detecting missing configurations
    - Promoting sets of configurations to higher environments (no more tedious copy-pasta).
    - Application dependency mapping is clear, making it easy to answer "What does this application talk to?"


To support this functionality, figgy requires a JSON file (typically called `figgy.json`) stored somewhere in version
control alongside your source-code. This file can be automatically generated through reflection or static code analysis.

For a reference on all supported `figgy.json` options, see: [Declarative Configuration](/docs/advanced/delcarative-configuration.html)


## S