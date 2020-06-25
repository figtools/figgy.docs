---
title: Cleanup
has_children: false
nav_order: 7
parent: Config
grand_parent: Commands
nav_no_fold: true
---

## Cleanup

Usually leveraged after running sync, cleanup will compare your desired state as defined in your 
figgy.json with the current configurations in AWS Parameter Store. You will be prompted on whether or not you wish to 
delete orphaned configurations (configs that exist in AWS but do not exist in your figgy.json file).

<br/>![Cleanup]({{ '/docs/assets/images/gifs/cleanup.gif' | relative-url }})<br/>