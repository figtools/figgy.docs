---
title: Basics
has_children: false
nav_order: 4
parent: Getting Started
has_toc: true
---

## Figgy Basics
Figgy does a lot, but lets start with the simple parts. At its core, Figgy is a configuration management framework built
on top of AWS ParameterStore. ParameterStore is a great AWS service for managing application configurations, but it 
isn't without its usability faults. Figgy is designed to build on the great foundation ParameterStore offers and add more 
functionality.

You don't have to use _all_ Figgy has to offer. So let's start with the basics. With Figgy installed, you can use
the CLI to interact with AWS ParameterStore across many different accounts. 

There's a free <a href="https://www.figgy.dev/tabs/sandbox/" target="_blank">Figgy Sandbox</a> 
you can use to experiment with Figgy. Go ahead, click that Sandbox link, let's have some fun!  
  
## Figgy Events
Look again at the Sandbox page. Do you notice some notifications popping up? Those are *live events* happening
_right now_ in our Figgy Sandbox. Someone (or something) is _meddling_ with configurations in our Figgy Sandbox.

The purpose of this is to demonstrate one of the most powerful features of Figgy. Figgy is _driven by events_. 
Every change is an event, which means every change, *ever*, is logged and stored. Figgy stores a complete history 
of every change in our Figgy sandbox. Now come at me bro! Do some damage! Mess up my configs - I dare you! 
I'll just *restore* them to how they were at some in time - to the second - in the past. Not-a-thing you can do about it! ;)

## Declarative Configuration
'GitOps' is about defining the _desired state_ of your infrastructure in a versioned Git repository. Figgy's goal is to
bring this same approach to configuration management but without the need to store your configs and secrets in your Git 
repositories. Instead you will 'declare' what your application needs to run. This definition can even be dynamically generated 
through static code analysis or reflection. In other words, let your code tell your CICD process what configurations it needs. 

> Figgy can break the build if you're missing a required configuration. Don't deploy a service destined to fail initialization.

By declaratively defining (or generating) our required configurations for a particular code base and commit,
we can feel confident we didn't forget that last pesky configuration our service needs to run.

Figgy accomplishes this through a `figgy.json` file that defines the required configurations for a codebase. Before developers
check-in their code, or before a PR is merged, users (or automation) can run the [sync](/docs/commands/config/sync.html) command
to validate the defined configurations all exist in the targeted environment. Figgy will give you confidence
that you aren't rolling out a new release and missing a required configuration.

## Twigs - An application's sole configuration provider
While Figgy doesn't enforce this policy, we **strongly recommend** you store all configurations for each service under
a **twig** (See: [Figgy Concepts](/docs/getting-started/concepts.html)). For instance, for service 
`message-fetcher` all configurations would exist under the following namespace: `/app/message-fetcher`. 
The `/app` namespace is optional, you can call it `/svc`, or whatever you want.

#### Here are some example configurations under the `twig`: `/app/message-fetcher`
    /app/message-fetcher ⬇(FIGS)⬇
                        /log-level  
        ⬆(TWIG)⬆       /batch-size
                        /worker-thread-count
                        /replicated/rabbitmq/url
                        /replicated/rabbitmq/user
                        /replicated/rabbitmq/password    <-- And this

`/app/message-fetcher` is the *twig*. 

One great thing about **twigs** is that we can look at a **twig** and know _everything_ there is to know about that 
service's configuration. This is can be very helpful when trying to answer the question `What does the message-fetcher 
talk to?"`.

It also GREATLY simplifies IAM access control for our service. `/app-message-fetcher` will need an IAM policy as simple as this:
```
{
    ...
    "Statement": [
        {
            "Sid": "MessageFetcherSSM",
            "Effect": "Allow",
            "Action": [
                "ssm:GetParameters",
                "ssm:GetParameter"
            ],
            "Resource": "arn:aws:ssm:*:1234567890:parameter/app/message-fetcher/*"
        }
    ]
}
```

In Figgy we want configurations to have a single source of truth, but we also don't want figs to be repeated by
5 different services and stored in 5 different places. The problem with having all configurations stored under twigs
is that it assumes there aren't "global" or "shared" configurations.

### The solution: Config Replication

The `/shared` **fig tree** is a special configuration tree where you can store configurations that are shared
among numerous services. This is great for DNS names, database names, and anything else that is used in more than one place.

#### As with all Figgy concepts, the /shared tree is a recommendation. It is not enforced by Figgy.

*Config replication* is how Figgy accomplishes sharing configurations from a `source` to 1 or more `destinations`.
Figgy will keep the destination in sync with the source. Whenever the source is updated, events will trigger to 
automatically update all destinations within about 1 second.

We won't get into how you can configure replication here, but understanding how **sharing** works is important. 

## Combat config sprawl

Ever had a config you were too terrified to delete because you didn't know if _something_ was still using it? 
Yup Figgy has got a solution for that too.  


Declarative configuration provides a definitive answer on whether or not a *fig* living out there is used anymore. 
By following Figgy best practices and defining your service configurations under **twigs**,  you will gain the benefit 
of being notified when you have a *fig* out there that is no longer used by your service.

The [sync](/docs/commands/config/sync.html) and [cleanup](/docs/commands/config/cleanup.html) commands will detect and
prompt you to clean-up unused configurations to prevent unused config sprawl. 


That's it, you now know the basic features of Figgy. 

### Learn more:
DevOps / Software Architects:

[Advanced Figgy](/docs/getting-started/advanced.html)

[Installation](/docs/getting-started/install.html)

[Architecture](/docs/architecture/index.html)

<br/>
Figgy Users:

[Figgy Playground](/docs/getting-started/sandbox.html)

[Installation](/docs/getting-started/install.html)

[Commands](/docs/commands/config/index.html)

[User Guides](/docs/user-guides/index.html)
