Microservices are great, but your growing service footprint means configuration management just got a *lot* harder. Here are a few ways Figgy can help!

*Out of the box, Figgy comes with all of these features:*

### **Figgy CLI**
- A custom built CLI on top of AWS ParameterStore that addresses many ParameterStore limitations.
- Add / Update / Delete / Edit configurations and more
- Promote configs from lower to higher environments
- Share secrets directly to the code that needs them. No more handing DB credentials to some middle man so they can go put them "somewhere".
- Browse a log that tracks all config changes over time, even for deleted configs.
- Roll back any configuration, or hierarchy of configurations to *any point in time* (to the second) in the past.
- Combat config sprawl. Figgy will tell you if you have a config in ParameterStore that you aren't using anymore.

### **Simplify your Development Workflow**
- Easily integrate your CICD process with Figgy
    - **BREAK THE BUILD** if the deploying application is missing a required config in its targeted environment. 
    - Give Developers confidence their code bootstrap properly if Figgy gives the :+1:.
- Make configuration *clear*. 
    - Following Figgy best-practices means you'll quickly know what configurations your app is using at any point-in-time.
- Let your _code_ inform your configuration. 
    - Figgy shared libraries can auto-generate your 'configuration' tree from your application code.
    
### **Security**
- SSO Integrations with Google Admin Console, OKTA, and AWS
    - MFA support for all SSO Types
- Figgy ONLY uses temporary credentials. Abandon all AWS access keys!    
- Easy to manage role-based access control (RBAC)
    - Easily assign different user types access to different sections of your ParameterStore tree.
- Securely share secrets between config trees
- Provision and allocate access to as many KMS encryption keys as you want. Figgy will hide the complexity and simplify secret encryption.
- Get more visibility into your configuration stack. Know what's being changed, where, and when.
- Abandon long-lived AWS Access Keys, all sessions are temporary

    
### **No 3rd Parties**
- Figgy is free, open source, and installs directly in your environment.
- No SaaS or 3rd parties here, just a serverless application deployed directly in your AWS account.

### **The Figgy Vault**
- Figgy _only_ generates temporary sessions to AWS, encrypts them, and stores them in a local "Figgy Vault"
- These temporary credentials can be used for local development by decrypting & pulling them from the "Figgy Vault"

### **Figgy integrations**
- Get automated Slack notifications when secrets are changed or updated, and know who made them.
- And more to come!
