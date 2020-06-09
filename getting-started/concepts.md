---
title: Concepts
has_children: false
nav_order: 1
parent: Getting Started
---

## **Figgy Concepts**:

Configuration management is best handled by hierarchies of key-value pairs in a configuration tree. AWS ParameterStore
natively supports managing access to hierarchies of configurations through IAM policies. Figgy is built on top of 
ParameterStore to ensure maximum configurability and access control based on your business's needs.   

In the Figgy documentation you may see the following nomenclature when referencing configurations and configuration 
hierarchies. 

## Figgy Names

### **Fig Orchard** 
#### All con**fig**urations under all figgy-managed namespaces. 
      - /app/*
      - /shared/*
      - /dba/*
      - /devops/*
      - /sre/*
      
#### These are examples. You select your own namespaces.
      
<br/>

### Fig Tree
#### A hierarchy of configs under a high-level figgy-managed namespace.
    - e.g. - /app/*    
    
<br/>

### Twig
#### A single hierarchy of configs under a **Fig Tree**
    - /app/hello-world/*
    
>**Recommendation: Write your service IAM policies to ONLY access the *twig* namespace**
    
<br/>

### Fig
#### A single con**fig**uration stored `/under/a/named/path` and on a **Twig**
    - e.g. - /app/hello-world/log/level
  
> **These namespaces are all examples. You can name or Figs / Twigs / Trees, and Orchards however you like!**

<br/>
