
## --profile flag

Example: 

```console
    figgy config validate --profile ${PROFILE}
```

Ignores all existing CLI configurations and authenticates the Figgy session with the AWS CLI profile provided. This profile
must exactly match a profile configuring in the users `~/.aws/config` and `~/.aws/credentials` files.

This command is ideal for use with the [validate](/commands/config/validate/) command during CICD pipeline builds.