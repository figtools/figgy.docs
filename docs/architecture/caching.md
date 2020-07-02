

## Caching

Figgy implements multiple levels of cache to maximize performance. 


<br/>![Caching](/docs/images/architecture/caching.png)<br/>

### Remote cache:

DynamoDB is leveraged as a remote cache for Figgy and is deployed as part of the standard [Figgy Footprint](/docs/getting-started/figgy-footprint/). 

DynamoDB was chosen for the following reasons:

- Serverless
- Highly performant
- Supports native AWS IAM authentication & authorization
- Native streaming data integrations which are useful for our use cases
- Supports record TTLs for auto-cache expiration
- Inexpensive and immensely scalable

The `figgy-config-cache` DyanmoDB Table will be provisioned in every Figgy integrated AWS environment and is required. 
Without this cache Figgy would be required to continually query AWS ParameterStore APIs which are rate-limited by default.
Paginating these APIs is a very slow operation and would greatly affect Figgy CLI performance.

Like the Figgy audit log, the remote `figgy-config-cache` table is maintained and updated by Lambdas triggered by AWS CloudTrail events.
These events are triggered by change operations on ParameterStore values. 


### Local cache: `~/.figgy/cache/`

A local cache is used for storing various user-configured preferences and non-secret data; including a list of 
currently active parameter names in each environment. On each run, the Figgy CLI queries a remote cache to retrieve a
list of updates since the last Figgy CLI execution before applying these changes to local cache. These values inform auto-complete
recommendations and the [Browse](/docs/commands/config/browse/) Tree.

Anonymous usage metrics are also logged in a local cache. These metrics are always logged locally, but are only reported if the 
user has enabled anonymous usage metric reporting. 

### Local encrypted cache: `~/.figgy/vault/`

Also known as the "Figgy Vault", the Figgy CLI caches SSO and AWS STS temporary session credentials in a local encrypted
cache. This encrypted cache is tapped as-needed in subsequent Figgy executions. SSO session duration is based on the 
remote party's (OKTA / Google) session duration configurations and will be refreshed when existing cached sessions expire.


