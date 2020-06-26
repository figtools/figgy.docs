# What's Figgy?

Tired of managing hundreds or thousands of configurations as your microservice footprint scales? Tired of config files, 
environment variables, and constantly crashing containers due to configuration mismanagement? There's a better way.

Figgy is configuration management framework designed to bring developers, DevOps engineers, and secret owners together 
around an ecosystem designed for simple and secure configuration and secret management. Figgy has features designed 
around each user story, so there's a little bit for everyone to appreciate.

*The principal goals of Figgy are:*
- Simplify and secure application configuration management
- Prevent bugs due to configuration mismanagement
- Limit the exposure of secrets to ONLY secret owners and the applications that require them.
- Practice configuration 'GitOps' without _actually_ storing your configurations in Git. 
- Make users happy :)

Depending on who you are, your Figgy Docs experience may differ. If your organization already uses's Figgy and you're looking
to install the CLI and get started, then I recommend you skip over to [Install](/getting-started/install.html)
then browse one of the [Guides](/user-guides/)

Want to know what Figgy does? Read below, then head over to [Getting Started](/getting-started/index.html)

## Why Figgy?

Microservices are great, but configuration management just got a *lot* harder. Here are a few ways Figgy can help!

*Out of the box, Figgy comes with all of these features:*

### **SSO Authentication**
- SSO Integrations with Google Admin Console, OKTA, and AWS
- MFA is supported and encouraged
- Figgy ONLY uses temporary credentials. Abandon all AWS access keys!
    
### **Figgy CLI**
- An elegant CLI on top of AWS ParameterStore that addresses many ParameterStore limitations.
- Add / Update / Delete / Edit configurations and more
- Promote configs from lower to higher environments
- Share secrets directly to the code that needs them. No more handing DB credentials to some middle man so they can go put them "somewhere".
- Browse a log that tracks all config changes over time, even for deleted configs.
- Roll back any configuration, or hierarchy of configurations to *any point in time* (to the second) in the past!
- Combat config sprawl. Figgy will tell you if you have a config in ParameterStore that you aren't using anymore!

### **No 3rd Parties**
- Figgy is free, open source, and installs directly in your environment.
- No SaaS or 3rd parties here, just a serverless application deployed directly in your AWS account.

### **Security**
- Create Figgy 'roles' that allow different user types access to different sections of your ParameterStore tree.
- Easily control access between different configuration trees.
- Securely share secrets between config trees

### **Bind application configs to your code**
- Easily integrate your CICD process with Figgy
- *BREAK THE BUILD* if the deploying application is missing a required config in its targeted environment. 
- Give Developers confidence their code bootstrap properly if Figgy gives the thumbs-up! 
    
### **The Figgy Vault**
- Figgy _only_ generates temporary sessions to AWS, encrypts them, and stores them in a local "Figgy Vault"
- These temporary credentials can be used for local development by decrypting & pulling them from the "Figgy Vault"

### **Figgy integrations**
- Get automated Slack notifications when secrets are changed or updated, and know who made them.
- And more to come!
