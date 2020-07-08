Figgy supports a simple slack webhook integration that can be easily enabled or disabled on a per-account basis. Each
integrated Figgy account can distribute notifications to different channels as desired. To enable the integration, generate
a valid webhook url (or multiple URLs if you want to integrate different channels per account). 

Slack has a guide [HERE](https://api.slack.com/messaging/webhooks)

Once you have your Slack webhook URLs ready, you will want to set the appropriate webhook url in each `figgy/terraform/vars/{env}.tfvars`
file. Next re-run `terraform apply` for each Terraform workspace associated with each Figgy-integrated account. 
Behind the scenes Figgy will update a parameter in AWS Parameter Store at the path: `/figgy/integrations/slack/webhook-url`. You
can check this parameter value to validate successful configuration.

!!! warning "It can take up to 15 minutes for newly configured webhooks to write to Slack channels. A local cache must expire first." 

Simply unset the Terraform `webhook_url` variable for any accounts you do not want to integrate with Slack.

## Types of Slack Notifications:

---

#### Successful Fig replication:

Successful Fig replication messages will be pushed to Slack in the following scenarios:

- An existing configuration configured as a _source_ of replication has been updated and therefore was 
synchronized with all configured downstream figs.
- A previously un-shared configuration has been configured as a replication source and hsa been replicated to the configured
destination.

Virtually never, but potentially:

- A source and destination were detected as out-of-sync and were resynchronized by a background process that looks 
for configurations in bad state.

This final scenario should never occur except in extremely rare cases where either a bug has been introduced
into Figgy, or an outside enviornment related processes affects Figgy's ability to maintain state. For instance, if your run
out of Lambda concurrency in your AWS account and are being _significantly_ throttled.

---

#### Configuration Deleted

Any configuration that has been deleted from ParameterStore will result in a push notification to Slack with the following
information.

- Fig name, i.e. `/app/hello-world/log-level`
- ID of user who performed the delete.
- Environment where the delete was performed.

!!! hint "To disable these events, set the parameter: `/figgy/integrations/slack/notify-deletes` to a value of `false`"
