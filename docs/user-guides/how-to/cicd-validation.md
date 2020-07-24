## Configuring CICD Validation

With Figgy you can easily setup build-time validation of application configurations to ensure services cannot be deployed
if they are missing a required configuration in their destined environment. 

The [validate](/commands/config/validate/) command with the [--profile flag](/commands/flags/profile/)
is the secret to configuring CICD build validation.

To set-up CICD validation you'll want to write out a hydrated `~/.aws/credentials` and matching `~/.aws/config` file
with appropriate access levels to each environment.

Here is an example `~/.aws/credentials` file:

```console
[dev]
aws_access_key_id = SOME_KEY
aws_secret_access_key = SOME_SECRET
[prod]
aws_access_key_id = SOME_KEY
aws_secret_access_key = SOME_SECRET
[stage]
aws_access_key_id = SOME_KEY
aws_secret_access_key = SOME_SECRET
```

With a matching `~/.aws/config` file:

```console
[profile dev]
region = us-east-1
output = json
[profile prod]
region = us-east-1
output = json
[profile stage]
region = us-east-1
output = json
```

With these two files in place, run validate against the appropriate environment. <ins>If validation fails, figgy will exit with a non-0 exit code.</ins>

```console
    figgy config validate --env dev --config path/to/figgy.json --profile dev   <-- your profile name here
```


### Successful Validation
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/validate-success.mp4" type="video/mp4"></video>
<br/>


### Validation Failure
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/validate-failure.mp4" type="video/mp4"></video>
<br/>

### Live examples

[Example Validation with Github Action](https://github.com/figtools/figgy.python-reference/blob/master/.github/workflows/validate-cicd.yml)

[See Validate Working](https://github.com/figtools/figgy.python-reference/actions)
