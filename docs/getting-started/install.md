# Installation
Installing Figgy is _easy_.


### One-liner installs for each OS

**MacOs**
```bash
    bash <(curl -sL "https://raw.githubusercontent.com/figtools/figgy-cli/master/scripts/install-mac.sh")
```

**Linux**
```bash
    bash <(curl -sL "https://raw.githubusercontent.com/figtools/figgy-cli/master/scripts/install-linux.sh")
```


**Windows**
```powershell 
    iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/figtools/figgy-cli/master/scripts/install-windows.ps1'))
```
<br/>

### Package manager installs
**MacOs**

    $    brew install figtools/figgy/figgy
            


**Windows, Linux, or Mac** (requires Python 3.7 - not recommended for most use cases, but good for CICD)

    $    pip3 install figgy-cli


### Manual install        

**Any OS - Manual install from .zip file**

- [Download Mac](https://www.figgy.dev/releases/cli/latest/darwin/figgy.zip)
- [Download Linux](https://www.figgy.dev/releases/cli/latest/linux/figgy.zip)
- [Download Windows](https://www.figgy.dev/releases/cli/latest/windows/figgy.zip)


!!! note "Windows ONLY"
    Be sure to use standard x86 PowerShell or the Windows Command Prompt. The PowerShell Integrated Scripting Environment experiences issue with receiving Figgy user input. 

<br/>

## Configuring Figgy
Configuring the Figgy CLI is as simple as running.

    figgy --configure
    
    
You will be guided through configuration. Before running `--configure` you'll need to know what type of authentication 
you'll be using: Bastion, Google SSO, or OKTA SSO. See [Figgy Deployment](/docs/getting-started/deployment/select-type/)

<br/>

## Distributing Figgy

If you are rolling Figgy out across an organization it might be easiest to auto-configure some sane defaults for users.
Sane defaults can be written to the figgy defaults file: `~/.figgy/config`.

All configs listed below are optional. Feel free to remove items irrelevant to your deployment.

File: `~/.figgy/config` 
```ini
[FIGGY]
mfa_enabled = true
auto_mfa = false
colors_enabled = true
report_errors = true
aws_region = us-east-1

[OKTA]
app_link = https://your-domain.okta.com/home/amazon_aws/FaKeStUfF123145faf11zf/123
factor_type = GOOGLE

[GOOGLE]
identity_provider_id = N0tre9le3
service_provider_id = 12345678010

[BASTION]
profile = bastion-sandbox-devops
```