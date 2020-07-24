
## Login

Command:

    figgy login
        
Generates and caches STS sessions with authorized accounts and stores them in the figgy lockbox. If a user has MFA enabled,
the `login` command may be useful for reducing the number of MFA prompts a user would receive while using Figgy 
throughout the day. 

![Login](/images/gifs/login.gif)

<br/><br/>

### Login Sandbox

    figgy login sandbox
    
Logs the user into the he [Figgy Sandbox](/getting-started/sandbox/). This command will overwrite any existing
local figgy configuration - meaning, after running this command you'll have to rerun `figgy --configure` to 
reconnect to your own environment.

If you want a playground but don't want to lose your local figgy configurations, backup the following files
before running `figgy login sandbox`

        ~/.figgy/config
        ~/.figgy/cache/others/defaults.json
        
![Login Sandbox](/images/gifs/login-sandbox.gif)
<br/>