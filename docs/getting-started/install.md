

# Installation
Installing Figgy is _easy_.


#### Automatic Install

**MacOs**

    $    brew install figtools/figgy/figgy
        
**Windows, Linux, or Mac** (requires Python 3.7)

    $    pip3 install figgy-cli

**Any OS - Install from .zip file**

- [Download Mac](https://www.figgy.dev/releases/cli/latest/darwin/figgy.zip)
- [Download Linux](https://www.figgy.dev/releases/cli/latest/linux/figgy.zip)
- [Download Windows](https://www.figgy.dev/releases/cli/latest/windows/figgy.zip)


#### Manual Install from Zip

**MacOs / Linux**
```console
    # Linux Example (change download URL for MacOs)
    mkdir -p ~/tools/figgy
    
    # Download Figgy
    cd tools/figgy/ && curl https://www.figgy.dev/releases/cli/latest/linux/figgy.zip > figgy.zip

    # Unzip Figgy
    unzip figgy.zip

    # Add figgy to path
    export PATH=$PATH:$(pwd)

    # Test Figgy
    figgy --version
```

You will want to update your PATH in ~/.bashrc or ~/.zshrc as well. Done!

**Windows**
```powershell 
    # powershell
   
    # Download Figgy
    Invoke-WebRequest -Uri https://www.figgy.dev/releases/cli/latest/windows/figgy.zip -OutFile figgy.zip 

    # Unzip
    Expand-Archive .\figgy.zip

    # Add DIR to path
    cd figgy/ 
    $DIR=pwd

    # Add Dir to path
    $ENV:PATH="$ENV:PATH;$DIR"

    # Test Figgy
    figgy --version
```

You'll want to add the installation directory to your path [permanently](https://codingbee.net/powershell/powershell-make-a-permanent-change-to-the-path-environment-variable): 

!!! note ""
    Be sure to use standard x86 Powershell or the Windows Command Prompt. The Powershell Integrated Scripting Environment experiences issue with receiving Figgy user input. 

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