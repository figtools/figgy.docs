Microservices are great, but your growing service footprint means configuration management just got a *lot* harder. Here are a few ways Figgy can help!

*Out of the box, Figgy comes with all of these features:*

### **Figgy CLI**
- A custom built CLI integrated with AWS ParameterStore that addresses many ParameterStore limitations.
- Easily manage configurations across many different AWS Accounts.
- Add / Update / Delete / Edit configurations and more
- Promote configs from lower to higher environments
- Share secrets directly to the code that needs them. Cut out handing secrets to a middle-man to go put them *somewhere*.
- Browse a log that tracks all config changes over time, even for deleted configs.
- Roll back any configuration, or hierarchy of configurations to *any point in time* (to the second) in the past.
- Combat config sprawl. Figgy will tell you if you have a config in ParameterStore that you aren't using anymore.

### **Simplify your Development Workflow**
- Easily integrate your CICD process with Figgy
    - Break your CICD build if the deploying application is missing a required config in its targeted environment. 
    - Give Developers confidence their apps will properly deploy and boostrap if Figgy gives the :+1:.
- Cultivate configuration clarity. 
    - Following Figgy best-practices means you'll easily know what configurations your services are using at any point-in-time.
    - Figgy's configuration trees clarify application dependencies
- Let your _code_ inform your configuration. 
    - Figgy shared libraries can auto-generate your application's dependent configurations from your code. 
    - The FiggyCLI will then let you know what's missing and what's no longer used in each environment.
    
### **Security**
- Abandon long-lived access keys
    - Figgy only uses temporary AWS sessions and can help you abandon your long-lived credentials by adopting Single Sign-on.
- SSO Integrations with Google Admin Console, OKTA, and AWS
    - MFA supported for all SSO integrations
- Easy to manage role-based access control (RBAC)
    - Easily assign different user types access to different sections of your ParameterStore tree.
    - Figgy makes it easy to properly scope IAM policies for your applications secrets and configurations
- Securely maintain, rotate, and share secrets to applications
- Provision and allocate access to as many KMS encryption keys as you want. Figgy will hide the complexity and simplify secret encryption.
- Get more visibility into your configuration stack. Know what's being changed, where, and when.
- Abandon long-lived AWS Access Keys, all sessions are temporary,and Figgy can help you generate temporary credentails for local development.
- No more LastPass, one-time urls, secrets sent over Slack, email, encrypted files, or any of those annoying or insecure secret management hoops
    
### **No 3rd Parties**
- Figgy is free, open source, and installs directly in your environment.
- No SaaS or 3rd parties here, just a serverless application deployed directly in your AWS account.

### **The Figgy Lockbox**
- Figgy _only_ generates temporary sessions to AWS, encrypts them, and stores them in a local "Figgy Vault"
- These temporary credentials can be used for local development by decrypting & pulling them from the "Figgy Vault"

### **Figgy integrations**
- Get automated Slack notifications when secrets are changed or updated, and know who made them.
- SSO Integrations with Google, OKTA, and AWS with more to come!
- And more to come!
