---
title: Concepts
has_children: false
nav_order: 3
parent: Getting Started
---

## **Figgy Concepts**:

Application config management is best managed through hierarchies of key-value pairs stored in a configuration tree. 
[AWS ParameterStore](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
is a simple security-focused K/V store that natively supports managing access to hierarchies of 
configurations through IAM policies. Figgy is a suite of tools built on top of AWS ParameterStore that add
additional functionality without affecting the great AWS native integrations that ParameterStore offers.

In the Figgy documentation you may see the following nomenclature when referencing configurations and configuration 
hierarchies. 


## **Fig Orchard** 
#### All con**fig**urations under all figgy-managed namespaces. 
      - /app/*
      - /shared/*
      - /dba/*
      - /devops/*
      - /sre/*
      
#### These are examples. You define your namespaces.
      
<br/>

## Fig Tree
#### A hierarchy of configs under a high-level figgy-managed namespace.
    - e.g. - /app/*    
    
<br/>

## Twig
#### A hierarchy of configs under a **Fig Tree** that is owned by a single service
    - /app/hello-world/*
    
> Recommendation: Write your service IAM policies to ONLY access the *twig* namespace
    
<br/>

## Fig
#### A single con**fig**uration stored `/under/a/named/path` and on a **Twig**
    - e.g. - /app/hello-world/log-level
  
> These namespaces are all examples. You can name your Figs / Twigs / Trees, and Orchards however you like!

### So for these configurations:
    /app/bird-feeder/log-level
    /app/bird-feeder/food-type
    /app/data-cruncher/batch-size
    /app/data-cruncher/encoding
    /app/message-fetcher/log-level
    /app/message-fetcher/batch-size
    /app/message-fetcher/worker-thread-count
    /app/message-fetcher/replicated/rabbitmq/url
    /app/message-fetcher/replicated/rabbitmq/user
    /app/message-fetcher/replicated/rabbitmq/password
    

You'd have a **Fig Orchard** like this (devops & shared trees shown for clarity but figs omitted)
    
```
 FIG-ORCHARD:
     |
     |--------⬇(FIG-TREES)⬇
     |------------/devops
     |------------/shared
     |------------/app
     |-------------------------⬇(TWIGS)⬇
     |------------------------/bird-feeder
     |                                             ⬇(FIGS)⬇
     |--------------------------------------------/log-level
     |--------------------------------------------/food-type
     |
     |------------------------/data-cruncher
     |--------------------------------------------/batch-size
     |--------------------------------------------/encoding
     |
     |------------------------/message-fetcher
     |--------------------------------------------/log-level
     |--------------------------------------------/batch-size
     |--------------------------------------------/worker-thread-count
     |--------------------------------------------/replicated/rabbitmq/url
     |--------------------------------------------/replicated/rabbitmq/user
     |--------------------------------------------/replicated/rabbitmq/password

```