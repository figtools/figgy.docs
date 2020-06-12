---
title: Caching
has_children: true
nav_order: 4
parent: Architecture
---

## Caching

Figgy leverages multiple levels of cache to maximize performance. 


<br/>![Caching]({{ '/docs/assets/images/architecture/caching.png' | relative-url }})<br/>

### Remote cache:

DynamoDB is leveraged as a remote cache for Figgy. It is deployed as part of your standard Figgy deployment. 

DynamoDB was chosen for the following reasons:
- Highly performant
- Serverless
- Supports native IAM authentication & authorization
- Native streaming data integrations which are useful for our use cases
- Supports record TTLs for auto-cache expiration
- Inexpensive and immensely scalable

The `figgy-config-cache` DyanmoDB Table will be provisioned in every Figgy integrated AWS environment and is required. 
Without this cache Figgy would be required to continually query the AWS ParameterStore APIs which are rate-limited by default.
Paginating these APIs is a very slow operation and would greatly affect Figgy CLI performance.

Like the Figgy audit log, the remote `figgy-config-cache` is maintained and updated by a series of CloudTrail events triggered
by change operations on ParameterStore values. 


### Local cache: `~/.figgy/cache/`

Figgy leverages a local cache for storing various user configured preferences and and non-secret data such as a 
list of currently active Parameter Names. On each execution, the Figgy CLI consults the remote ParameterStore configuration 
cache to query a list of updates that have occurred since the last time the Figgy CLI was executed. Only new changes are
selected and returned. The local cache is then updated with these new values. These values are used to inform the auto-complete
recommendations while using Figgy and the [Browse](/docs/commands/config/browse.html) Tree.

Anonymous usage metrics are also logged in a local cache. These metrics are always logged locally, but are only reported if the 
user has enabled anonymous usage metric reporting. 

### Local encrypted cache: `~/.figgy/vault/`

Also known as the "Figgy vault", the Figgy CLI caches SSO and AWS STS temporary session credentials in a local encrypted
cache so they may be used for subsequent Figgy executions. STS credentials expire in 12 hours or less and will be renewed.
SSO session duration is based on the remote parties session duration configurations (OKTA / Google), and will be refreshed
as needed.


A cache of all known ParameterStore paths (e.g. /app/foo/value1) is cached in ~/.figgy/devops/cache/other/config-cache.json.
This cache is continually updated for every Figgy config resource execution and refreshed clean once every week. 
This cache is used to populate auto-complete prompts in the Figgy and build the Browse Tree


