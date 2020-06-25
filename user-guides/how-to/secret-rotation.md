---
title: Rotating Secrets
has_children: false
parent: How to
grand_parent: User Guides
nav_order: 4
---

<br/>
## Rotating Secrets

One advantage of cutting out the middle-man when sharing secrets (See: [Config Replication](/docs/getting-started/basics.html#the-solution-config-replication))
is empowering secret-owners to rotate secrets on their own time and without having to involve application owners.

For instance, suppose our DBA, Karen, wants to safely rotate some high power mongo credentials owned by the `message-processor` 
service account. If following [best practicies](/docs/getting-started/basics.html#twigs---an-applications-sole-configuration-provider), 
the `message-processor` application will only have access to the `/app/message-processor` namespace. Typically DBAs like Karen 
would not and should not need direct access to this application namespace as these credentials
would be shared with the `message-processor` from their secure location in Karen's DBA namespace.

So for clarity, Karen maintains the credentials here:

        /dba/passpack/services/message-processor/mongo/user
        /dba/passpack/services/message-processor/mongo/password
        
And through [Config Replication](/docs/getting-started/basics.html#the-solution-config-replication), these credentials
have been shared here:

        /app/message-processor/replicated/mongo/user
        /app/message-processor/replicated/mongo/password
        

The `message-processor` is actively using these credentials so we cannot disable the old credentials. To perform a safe
swap we'll want to perform the equivalent of a 'blue/green' credential rotation. 

Suppose the currently active user is:

`message-processor-blue` : `p@ssW0rd!1` 

Now Karen creates new set of credentials with identical permissions as the above set:

`message-processor-green`: `N3wp@ssW0rd1!` 

Both of these users now exist with identical permissions. Karen then replaces the user & password in its source location:

        /dba/passpack/services/message-processor/mongo/user
        /dba/passpack/services/message-processor/mongo/password
        
This will trigger automatic replication to the config destination. That might be all that is necessary; however, in most
cases services do not auto-reload their configurations after initial bootstrap. Karen would then need to trgger a redeploy
of the `message-processor` service. Once the new deploy has successfully rolled-out, 
Karen can safely deactivate `message-processor-blue`.


Done! No developer involvement necessary (though a quick Slack message would probably be appreciated).

**As you might imagine, this process is very easy to automate.**
