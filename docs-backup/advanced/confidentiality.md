## Configuration Confidentiality

Figgy manages the confidentiality of configurations in two main ways.

- [x] Access control
- [x] Encryption

### Access Control

With Figgy you can create as many arbitrary user types as you'd like. We recommend you consider the different user stories
you have in your organization first before defining them. In most cases, you'll have at least three:

* Developers
* Ops / Devops
* DBA's / Uber-admins

With user types (also known as `roles`), you can carve up access however you like and across as many **fig trees** as you want. In
an example basic configuration, access looks like this:
    
    - Developers:
        - `/app/*`
        - `/shared/*`
      
    - DevOps
        - `/app/*`
        - `/shared/*`
        - `/devops/*`
        
    - DBAs
        - `/app/*`
        - `/shared/*`
        - `/dba/*`
        
    - Super Admins
        - `/app/*`
        - `/shared/*`
        - `/devops/*`
        - `/dba/*`
    
### Encryption

Within these roles, each type may have access to leverage 1 or ore KMS keys for encrypting their secrets. For demonstrative
purposes, here are some _minimum_ recommended default keys:

* app
* devops
* dba

As you can see, in this _minimum_ example, each key maps to a single user-group. It's easy, tidy, and adds an extra
layer of security on top of access-control. But the magic is with the **replication key**.

### **The replication key**
The **replication key** is a special key used by Figgy that enables the secure sharing of secrets between secret-owners
and the applications who need them. 

Here is an example of how it is used. Suppose Jim, our `message-fetcher` developer needs access to our super-secret 
RabbitMQ password but doesn't have access to it. Mariah, our glorious DevOps engineer, has the user 
and password Jim needs. First Mariah stores the values in the `/devops` namespace and encrypts the values with the 
`devops` KMS key.


>  Mariah stores these values
  
    /devops/secrets/services/message-fetcher/rabbitmq/user
    /devops/secrets/services/message-fetcher/rabbitmq/password

<br/>

## **Store the value**
<br/><img src="/docs/images/gifs/basics-put.gif" alt="Basic Put" class="gif"><br/>
<br/>

Next Mariah will share the value directly to Jim's `message-fetcher` service. Jim will not have access to this
secret in higher environments, but the `message-fetcher` will. 

## **Share the value**
<br/><img src="/docs/images/gifs/basics-share.gif" alt="Basic Share" class="gif"><br/>

**The secret will now be shared**

<dl>
<dt><b>From</b></dt>
<dd>/devops/secrets/services/message-fetcher/rabbitmq/user</dd>
<dt><b>To</b></dt>
<dd>/app/message-fetcher/replicated/rabbitmq/password</dd>
</dl>


!!! tip "Important:"
   
    When Figgy performs the share, the parameter is decrypted and re-encrypted with the `replication key`. 
    
    **Access to the replication key should only be given to services consuming these secrets.**
    
    In this example, Jim, the developer, does not have access to the replication key in production. We have now successfully shared a secret 
    directly with the interested party and cut-out the middle-man. For IAM policy examples to support this example, 
    see the [IAM Cookbook](/docs/manual/configuration/iam-cookbook/)
