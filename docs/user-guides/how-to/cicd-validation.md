## Configuring CICD Validation

With Figgy you can easily setup build-time validation of application configurations to ensure services cannot be deployed
if they are missing a require configuration in their destined environment. 

The [validate](/docs/commands/config/validate/) command with the [--profile flag](/docs/commands/flags/profile/)
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

With these two files in place, run validate against the appropriate environment. 
> If validation fails, figgy will exit with a non-0 exit code.

```console
    $   figgy config validate --env dev --config path/to/figgy.json --profile dev   <-- your profile name here
```

You will get output something like this:

### Successful Validation
<br/>![Validate](/docs/images/gifs/validate-success.gif)<br/>



### Validation Failure
<br/>![Validate](/docs/images/gifs/validate-fail.gif)<br/>


[Example Validation with Github Action](https://github.com/figtools/figgy.python-reference/blob/master/.github/workflows/validate-cicd.yml)

[See Validate Working](https://github.com/figtools/figgy.python-reference/actions)
