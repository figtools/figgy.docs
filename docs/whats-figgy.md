Figgy is a management framework for configurations stored in AWS ParameterStore. It helps your teams safely manage
the SSM keyspace, preventing misconfigured deployments and supporting least-privilege access. Figgy natively works with
multiple AWS accounts and maintains a global audit log, giving operators the ability to perform global point-in-time restorations
for any configuration or hierarchy of configurations.

Figgy is layered on AWS ParameterStore and leverages native AWS constructs such as AWS IAM, KMS, DynamoDB, and
Lambda to ensure a simple integration with your environment. Figgy does not overlap with any existing AWS services, instead it builds on them, 
providing added functionality and an improved user experience.
<br/>

<video controls autoplay loop muted class="video"><source src="/images/videos/walkthrough-2.mp4" type="video/mp4"></video>


**A working Figgy installation has two main parts:**

- [x] Figgy Cloud
- [x] Figgy CLI
    
Setup in your organization requires setting up Figgy Cloud *first*. If you're still evaluating Figgy and don't want to
go through the trouble of installing Figgy Cloud, you can experiment with Figgy through our
free [Sandbox](/getting-started/sandbox/). The Sandbox is a hosted Figgy Cloud installation designed for public
experimentation and consumption.
    

**Figgy Cloud + FiggyCLI will help you:**

- Establish secure best practices from the start
- Prevent failed deployments and application downtime due to configuration mismanagmeent
- Save you time by automating simple configuration management tasks
- Give you peace of mind through high availability and resiliency, versioned configurations, audit logs, and easy rollbacks or restores.
- Keep secrets with their owners by cutting out the middle-man and establishing a strong framework of least-privilege. 
- Avoid 3rd party lock-in or external dependencies -- Figgy deploys serverlessly into your AWS environments
- Keep your configuration store tidy. No more unused or stray configurations causing ongoing confusion.


## Why Figgy?


#### Simple & secure config and secret management
As your cloud footprint grows, so do the configurations you need to manage your applications. 
Figgy is a framework for simple, secure, and resilient config management in AWS. The best part? No new servers to 
deploy, upgrade, and patch. No complex software to learn. Follow Figgy’s laid-out path for config management. 
It’s AWS native, compatible with all AWS services, and follows AWS best practices. Let Figgy help you get it right from the start.

---
#### Prevent downtime due to config mismanagement
Figgy provides a suite of utilities that link your code to your configs. 
Detect and remedy misconfigurations before deployment rather than scrambling after the alarm bells are going off.

---
#### Let the secret owners own the secrets
Figgy establishes a framework for teams of secret owners to securely track, manage, and rotate their secrets in their 
team’s secure space. From that space they can share secrets directly with the applications that need them -- 
without going through a middle-man. No more LastPass, one-time urls, secrets sent over Slack, email, encrypted files, 
or any of those annoying secret management hoops. In a few weeks, when your coworker "Bill" finds new employment, 
don’t ask yourself, "What secrets passed through Bill that we need to rotate now?"

---
#### Easily manage and maintain least privilege
Figgy makes it easy to give both users and applications the exact amount of access they need and nothing more, and provides
a framework for scalably maintaining and enforcing least privilege. By following Figgy best
practices you can easily maintain appropriate access for users and services while keeping your IAM policies short and sweet.

---
#### Maximum visibility & resiliency
Figgy maintains a history of every event that has ever occurred in your configuration store since the day you 
installed Figgy. Know what happened, where, when, and by who. Then, roll back any configuration, 
or hierarchy of configurations, to any point-in-time in the past, to the second.


Want to dip your toes in and test out the waters? Try out our free [Sandbox](/getting-started/sandbox/)