

## Validate

Validates the configurations defined in your `figgy.json` file exist in the targeted environment. The validate command
is ideal to use in your CICD pipline or as a pre-commit git hook to ensure users don't commit code without storing
their required configurations. 

This command is extra-useful when accompanied by the [--profile](/commands/flags/profile/) flag during [CICD builds](/user-guides/how-to/cicd-validation.html).


#### Successful Validation
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/validate-success.mp4" type="video/mp4"></video>
<br/>


#### Validation Failure
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/validate-failure.mp4" type="video/mp4"></video>
<br/>