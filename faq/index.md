---
title: FAQ
has_children: false
nav_order: 6
---

## FAQ

### What about AWS AppConfig? Isn't it it designed for application config management?

Yes! AWS AppConfig is a new AWS tool that sits on top of AWS ParameterStore and supports automated config rollouts, 
rollbacks, and different deployment strategies. AppConfig is totally compatible with Figgy since it uses ParameterStore as its
configuration backend.

Figgy & AppConfig perform different duties. Figgy is designed to help you maintain your application config tree and 
avoid common mistakes in config management pre-deployment. AppConfig kicks-in after or during your deployment.

<br/>

### Why does Figgy need access to my laptop keychain?

Figgy _only_ needs access to the `figgy` namespace of your laptop keychain. Figgy does not have access to any other
secrets stored in the keychain. When Figgy is deployed in one of its SSO configurations it will store your SSO password 
in your laptop keychain for safe keeping. Instead of having to type in your user, password, and MFA every single day
when you log in to Figgy, Figgy can pull your password from your keychain on your behalf to save you the keystrokes.

<br/>

### 