
# Events

As discussed in [Figgy Basics](/docs/getting-started/basics.html), many of Figgy's features are driven by Events.

### The following event types are tracked:

1. CloudTrail SSM Events: [Source](https://github.com/figtools/figgy/blob/0e007cf28f882995855fac2d94204998ac48c411/terraform/figgy/lambda_ssm_stream_replicator.tf#L18)
    - PutParameter
    - DeleteParameter
    - DeleteParameters

1. DynamoDb Stream Events: [Source](https://github.com/figtools/figgy/blob/0e007cf28f882995855fac2d94204998ac48c411/terraform/figgy/lambda_dynamo_stream_replicator.tf#L17)
    - Any change to `FiggyConfigReplication` DyanmoDB Table.
    
These event streams trigger a number of features in Figgy including:

- Maintaining records in the `figgy-config-cache` table. The Figgy CLI regularly queries this table inform its local cache.
These names support the auto-complete functionality and browse tree in the Figgy CLI.

- Triggering `source` -> `destination` replication. If a source record is updated, Figgy will automatically trigger replication
to all destinations. Likewise, if a new `source` -> `destination` record is added, a DDB stream event will trigger immediate
replication. 

- Maintaining the Figgy audit log. The `figgy-config-auditor` table maintains a history of all parameter changes over time.
Every change to a parameter in ParameterStore results in a new record inserted into this table. Figgy is
able to support point-in-time restores by leveraging the history of events stored in this table.

### Why all this effort to leverage events?

**To improve the collaboratve user experience**

Figgy is designed to support the collaboration of users across disparate teams. Live events enable the Figgy CLI to update 
configuration state virtually instantly. For instance, if Aravind adds a new parameter to ParameterStore, events will 
trigger that update our remote cache that informs Figgy's local state. If Shauna runs `figgy config get` 1 second later she
will see Aravind's new parameter. 

**To keep desired state in-sync with actual state**

Many features of Figgy are designed around users defining the **desired state** of their configurations. Leveraging native
AWS events to drive these changes ensures remote state remains in sync with desired state as quickly as possible. 

**Event Sourcing**

Event Sourcing is a design pattern where a log of events is the source-of-truth of your application state. To fix bad 
application state, a series of events are replayed rather than attempting to restore from a "snapshot" of data at some point in the past.
This pattern enables Figgy to replay events to rebuild both current state _and_ historical state in disaster recovery scenarios. 
Essentially, because all events are captured, we can track all changes over time, and restore any, or all, ParameterStore values 
to any point-in-time in the past.


## Event Flow

The `put` and `sync` commands enable users to add or overwrite values in ParameterStore. These values trigger events that are 
pushed to the CloudWatch event bus via CloudTrail. All ParameterStore changes are consumed by the three Lambda functions
depicted below. 

1. Config Cache Manager - Listens to PS Change events and maintains a cache of PS Names (not values) that is used to inform
functionality in the Figgy CLI.

1. Parameter Stream Replicator - Listens to PS Change events. If the changed value is a `source` of repliation, this function
will re-trigger replication to all downstream `destinations`.

1. Parameter Store Auditor - Listens to PS Change events and logs changes to our `figgy-config-auditor` DynamoDB table.

<br/>![PutOrSync](/docs/images/architecture/events-put-sync.png)<br/>

<br/>

## Replication Event Flow

Replication can be triggered one of three ways:

1. A `source` of replication is updated, thereby triggering downstream updates.
1. A new record defining `source` -> `destination` replication is inserted into the `service-config-replication` DynamoDB Table.
1. The Replication Syncer lambda detects an out-of-sync replication source and destination and synchronizes these values.

**The Replication Syncer Lambda will do nothing in the vast majority of cases. It is mainly there as a stop-gap in case a bug is introduced or a user accidentally breaks the the former 2 lambdas.**

<br/>![Replication Flow](/docs/images/architecture/events-replication.png)<br/>