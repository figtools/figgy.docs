
## Figgy Basics
Figgy does a lot, but lets start with the simple parts. At its core, Figgy is a configuration management framework built
on top of AWS ParameterStore. ParameterStore is a great AWS service for managing application configurations, but it 
isn't without its usability faults. Figgy is designed to build on the great foundation ParameterStore offers to add more 
functionality, enforce best practicies, and simplify the user experience.

You don't have to use _all_ Figgy has to offer. So let's start with the basics. With Figgy installed, you can use
the CLI to interact with AWS ParameterStore across many different accounts. 

There's a free <a href="https://www.figgy.dev/docs/getting-started/sandbox/" target="_blank">Figgy Sandbox</a> 
you can use to experiment with Figgy. Go ahead, click that Sandbox link, let's have some fun!  
<br/>
 
## Figgy Events
Look again at the Sandbox page. Do you notice some notifications popping up? Those are *live events* happening
_right now_ in our Figgy Sandbox. Someone (or something) is _meddling_ with configurations in our Figgy Sandbox.

The purpose of this is to demonstrate one of the most powerful features of Figgy. Figgy is _driven by events_. 
Every change is an event, which means every change, *ever*, is logged and stored. Figgy stores a complete history 
of every change in our Figgy sandbox. Do your worst, I dare you to mess up my **Fig Orchard**! 
I'll just *restore* my figs to how they were at some in time - to the second - in the past. Not-a-thing you can do about it! ;)
<br/>

## Declarative Configuration
'GitOps' is about defining the _desired state_ of your infrastructure in a versioned Git repository. Figgy's goal is to
bring this same approach to application config management. Git repositories aren't the place for loads of Key/Value
pairs though, so with Figgy, you will first 'declare' what your application needs to run. Next you'll use the
Figgy CLI to ensure your configs are where they need to be. Finally your CICD pipeline can perform additional validation
at deployment time. This declarative definition can be dynamically generated through static code analysis or reflection. 
In other words, let your code tell your CICD process what configurations it needs. 


!!! hint 

    Figgy can break the build if you're missing a required configuration. Don't deploy a service destined to fail initialization.


By declaratively defining (or generating) required configurations for a particular code base and commit,
you can feel confident you didn't forget that last pesky configuration you service needs to run.

Figgy accomplishes this through a `figgy.json` file that defines the required configurations for a codebase. Before developers
check-in their code, or before a PR is merged, users (or automation) can run the [sync](/docs/commands/config/sync/) command
to validate the defined configurations all exist in the targeted environment. Figgy will give you confidence
that you aren't rolling out a new release and missing a required configuration.
<br/>


## Twigs - An application's sole configuration provider
While Figgy doesn't enforce this policy, we **strongly recommend** you store all configurations for each service under
a **twig** (See: [Figgy Concepts](/docs/getting-started/concepts/)). For instance, for service 
`message-fetcher` all configurations would exist under the following namespace: `/app/message-fetcher`. 
The `/app` namespace is optional, you can call it `/svc`, or whatever you want.

Here are some example configurations under the `twig`: `/app/message-fetcher`

    /app/message-fetcher ⬇(FIGS)⬇
                        /log-level  
        ⬆(TWIG)⬆       /batch-size
                        /worker-thread-count
                        /replicated/rabbitmq/url
                        /replicated/rabbitmq/user
                        /replicated/rabbitmq/password    

`/app/message-fetcher` is the *twig*. 

One great thing about **twigs** is that we can look at a **twig** and know _everything_ there is to know about that 
service's configuration. This is can be very helpful when trying to answer the question `What does the message-fetcher 
talk to?"`.

It also GREATLY simplifies IAM access control for our service. `message-fetcher` will need an IAM policy as simple as this:
```json
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

In Figgy we want configurations to have a single source of truth but avoid unnecessary fig duplication. 
The problem with having all configurations stored under twigs is that it assumes there aren't 
"global" or "shared" configurations.

??? note "Confused?"
    
    If each service only has access to its twig, for example: `/app/foo/*`  for the `foo` service 
    and `/app/bar/*` for the `bar` service. What do we do about shared configurations? What if both foo and bar 
    need a value named `db-hostname`. Where would that live?
    
    We certainly don’t want to duplicate `db-hostname` it in both twigs - that would be hard to maintain. 
    Instead we store the **source of truth** of these shared configurations in a global, shared space, and sync them 
    into the the twig namespaces.

### The solution: Config Replication

The `/shared` **fig tree** is a special configuration tree where you can store configurations that are shared
among numerous services. This is great for DNS names, database names, and anything else that is used in more than 
one place.

!!! hint "As with all Figgy concepts, the `/shared` tree convention is a recommendation. It is not enforced by Figgy."

*Config replication* is how Figgy accomplishes sharing configurations from a *source* to one or more *destinations*.
Figgy will keep the destination in sync with the source. Whenever the source is updated, events will trigger to 
automatically update all destinations within about 1 second.

We won't get into how you can configure replication here, but understanding how **sharing** works is important. 
<br/>

## Combat config sprawl

Ever had a config you were too terrified to delete because you didn't know if _something_ was still using it? 
Yup Figgy has a solution for that too.  


Declarative configuration provides a definitive answer on whether or not a *fig* living out there is used anymore. 
By following Figgy best practices and defining your service configurations under **twigs**,  you will gain the benefit 
of being notified when you have a *fig* out there that is no longer used by your service.

The [sync](/docs/commands/config/sync/) and [cleanup](/docs/commands/config/cleanup/) commands will detect and
prompt you to clean-up unused configurations to prevent unused config sprawl. 


That's it, you now know the basic features of Figgy.


**DevOps / Software Architects:**

1. [Installation](/docs/getting-started/install/)
1. [Deploying Figgy](/docs/figgy-cloud/index/)
1. [Advanced Figgy](/docs/advanced/confidentiality/)
1. [Architecture](/docs/architecture/ecosystem/)

<br/>
**Figgy Users:**

1. [Figgy Playground](/docs/getting-started/sandbox/)
1. [Installation](/docs/getting-started/install/)
1. [Commands](/docs/commands/config/index/)
1. [User Guides](/docs/user-guides/index/)
