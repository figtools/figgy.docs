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

### What metrics am I opting into sharing with Figgy?

In order to provide the best Figgy experience, users can optionally enable anonymous usage data collection. **This is
entirely optional and can be defaulted to off**. 

The data collected is the following:
- Current installed Figgy Version
- Command types run: [get, put, delete, sync, etc], and the # of times each command has been run.
- A random GUUID associated with your user. No personal data is collected.

The data is cached in a file at this location: `~/.figgy/cache/other/usage-metrics-cache.json`. Feel free to take a look.
The data is reported to `https://api.figgy.dev/v1/log-metrics` once per day.
You can find the code for usage tracking here: [Anonymouse Usage Tracking](https://github.com/mancej/figgy/blob/master/cli/figgy/svcs/observability/anonymous_usage_tracker.py)

