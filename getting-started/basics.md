---
title: Basics
has_children: false
nav_order: 2
parent: Getting Started
---

## Figgy Basics
Figgy does a lot, but lets start with the simple parts. At its core, Figgy is a configuration management framework built
on top of AWS ParameterStore. ParameterStore is an AWS service for managing application configurations, but it 
isn't without its usability faults. Figgy is designed to build on the great foundation ParameterStore offers and add more 
functionality.

You don't have to use _all_ Figgy has to offer. So let's start with the basics. With Figgy installed, you can use
the CLI to elegantly interact with AWS ParameterStore across many different accounts. 

There's a free <a href="https://www.figgy.dev/tabs/sandbox/" target="_blank">Figgy Sandbox</a> 
you can use to experiment with Figgy. Go ahead, click that Sandbox link, let's have some fun!  
  
## Figgy Events
Look again at the Sandbox page. Do you notice some notifications popping up? Those are *live events* happening
_right now_ in our Figgy Sandbox. Someone (or something) is _meddling_ with configurations in our Figgy Sandbox.

These events are being pushed via WebSocket to your browser like any normal push notification. The purpose of this is to
demonstrate one of the most powerful features of Figgy. Figgy is _driven by events_. Every change is an event, which means
every change, *ever*, is logged and stored. We have a complete history of every change in our Figgy sandbox. 

Now come at me bro! Do some damage! Mess up my configs - I dare you! I'll just *restore* them to how they were at some 
in time - to the second - in the past. Not-a-thing you can do about it! ;)

## GitOps for Configurations
'GitOps' is about defining the _desired state_ of your infrastructure in a versioned Git repository. Unfortunately that 
isn't such a good idea when we're dealing with secrets or tons of configuration data that spans across many environments.

Figgy gives you a way to define the _desired state_ of configurations in your repository, and even generate that desired
state directly from your code. In other words, let your code tell your CICD process what configurations it needs. 

> Figgy can break the build if you're missing a required configuration. Don't deploy a service destined to fail initialization.

By declaratively defining (or generating) our required configurations for a particular code base and a particular commit,
we can ensure that as we roll-out our services we didn't forget that last pesky configuration our service needs to run.

Figgy does this through a `figgy.json` file that defines the required configurations for a codebase. Before developers
check-in their code they can run the [sync]({{ docs/commands/config/sync.md | relative-url }}) command to ensure
their defined configurations all exist in the targeted environment. This way, once they check-in their code and it gets 
rolled-out, it'll have all the configurations it needs.

## A single source of truth - Twigs
While Figgy doesn't enforce this policy, we **strongly recommend** you store all configurations for each service under
a **twig** (See: [Figgy Concepts](/docs/getting-started/concepts.html)). For instance, for service 
`message-fetcher` all configurations would exist under the following namespace: `/app/message-fetcher`. The `/app` is optional, you can call
it `/svc`, or whatever you want.

#### Here are some example configurations under a `twig`
    /app/message-fetecher/log-level
    /app/message-fetcher/batch-size
    /app/message-fetcher/worker-thread-count
    /app/message-fetcher/replicated/rabbitmq/url         <-- Take note of this.
    /app/message-fetcher/replicated/rabbitmq/user
    /app/message-fetcher/replicated/rabbitmq/password    <-- And this
    
`/app/message-fetcher` is the *twig*. 

The great thing about **twigs** is that I can look at a **twig** and know _everything_ there is to know about that service. 
No longer will you have to dig across 10 different places to find all a service's configurations. This is extremely 
helpful when trying to answer the question "What service(s) does the message-fetcher talk to?". 

In figgy we want configurations to have a single source of truth, but we also don't want the `rabbitmq/url` to be shared by
5 different services and stored in 5 different places. The problem with having all configurations stored under twigs
is that it assumes there aren't any "global" or "shared" configurations. We have a solution.

### The solution: Config Replication

The `/shared` **fig tree** is a special configuration tree where you can store non-secret configurations that are shared
among numerous services. This is great for DNS names, Database names, and anything else that is used in more than one place.

#### As with all figgy concepts, the /shared tree is a recommendation. It is not enforced by figgy.

Figgy has the ability to `share` a configuration from a `source` to a `destination`. This is called *configuration replication*.
Figgy will keep the destination in sync with the source. One source may be shared with many destinations. Whenever the source
is updated, events will trigger that will automatically update all destinations within about 1 second.

We won't get into how you can configure replication here, but understanding how you can configuration **sharing** works
is important. 


## Let the owners keep the secrets

Figgy manages the confidentiality configurations in two main ways.
- [x] Access control
- [x] Encryption

### Access Control

With Figgy you can create as many arbirary user types as you'd like. We recommend you consider the different user stories
you have in your organization first before defining them. In most cases, you'll have at least three:

* Developers
* Ops / Devops
* DBA's / Uber-admins

With user types, you can carve up access-control however you like across as many **fig trees** as you'd like. In
an example basic configuration, access looks like this:

- Developers:
    - `/app/*`
    - `/shared/*`
  
- DevOps
    - `/app/*`
    - `/shared/*`
    - `/devops/*`
    
- DBAs
    - `/dba/*`
    - `/shared/*`
    
### Encryption

Within these user types, each type may have access to leverage 1 or ore KMS keys for encrypting their secrets. For demonstrative
purposes, here are some _minimum_ recommended default keys:

* app
* devops
* dba

As you can see, in this _minimum_ example, each key maps to a single user-group. It's easy, tidy, and adds an extra
layer of security on top of access-control. But the magic is with the **replication key**.

The **replication key** is a special key used by Figgy that enables the secure sharing of secrets between secret-owners
and application owners. 

Here is an example of how it is used. Suppose Jim, our `message-fetcher` developer needs access to our super-secret 
RabbitMQ password but doesn't have access to it. Mariah, our glorious DevOps engineer, has the user 
and password Jim needs. First Mariah stores the values in the `/devops` namespace and encrypts the values with the 
`devops` KMS key.

#### Miriah stores these values
    /devops/secrets/services/message-fetcher/rabbitmq/user
    /devops/secrets/services/message-fetcher/rabbitmq/user

<br/>

### **Store the value**
<br/>![Put]({{ '/docs/assets/images/gifs/basics-put.gif' | relative-url }})<br/>
<br/>

### **Share the value**
<br/>![Share]({{ '/docs/assets/images/gifs/basics-share.gif' | relative-url }})<br/>

**The secret will now be shared**

**From:** `/devops/secrets/services/message-fetcher/rabbitmq/user` 

**To:**   `/app/message-fetcher/replicated/rabbitmq/password`

### Important:
Behind-the-scenes when Figgy performs the share, the parameter is decrypted and re-encrypted with the `replication key`. This special key
should only be given to the services consuming these secrets. 

Jim, the developer, does not have access to the replication key in production. We have nw successfully shared a secret 
directly with the interested party and cut-out the middle-man. 

The concept of replication is a core concept in leveraging Figgy to the fullest extent. 

## Combat config sprawl

