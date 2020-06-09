---
title: Sandbox Playground
has_children: false
nav_order: 3
parent: Getting Started
---

## Figgy Playground

There's a free [Figgy Sandbox](https://www.figgy.dev/tabs/sandbox/) you can use to experiment with Figgy. Go ahead, open
up that Sandbox link in a new window, lets' have some fun!

> First, let's make sure your Figgy CLI is installed:

*MacOs*

    $    brew tap mancej/figgy
        
    $    brew install figgy

*Windows & Linux*

    $    pip install figgy-cli


## Login to the Sandbox
    $   figgy login sandbox

Follow the prompts, select your user role:

- DevOps (Highest privilege)
- DBA / DATA
- SRE / DEV (Lowest privilege)

No single role can do everything, so feel free to try different roles! 

All changes you make in the Figgy Sandbox will be broadcast to all people perusing our
 [Figgy Sandbox](https://www.figgy.dev/tabs/sandbox/) page.
 
 
### Login 
 
<br/>![Login Sandbox]({{ '/docs/assets/images/gifs/login.gif' | relative-url }})<br/>

> You can always run `figgy --help` or `figgy config --help` to see what Figgy can do

## Basics: 1 Get a fig
    $   figgy config get --env dev

Get a config, any config, from our DEV environment. Depending on the config you select you may or may-not have access
to that configuration. 