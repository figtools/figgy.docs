---
title: Validate
has_children: false
nav_order: 13
parent: Config
---

## Validate

Validates the configurations defined in your `figgy.json` file exist in the targeted environment. The validate command
is ideal to use in your CICD pipline or as a pre-commit git hook to ensure users don't commit code without storing
their required configurations. 


#### Successful Validation
<br/>![Validate]({{ '/docs/assets/images/gifs/validate-success.gif' | relative-url }})<br/>



#### Validation Failure
<br/>![Validate]({{ '/docs/assets/images/gifs/validate-fail.gif' | relative-url }})<br/>
