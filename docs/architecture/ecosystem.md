
# Architecture

Figgy is a lot more than just a CLI, it's part of a larger config management ecosystem that must be deployed across
all integrated AWS accounts. Below is a diagram of the entire Figgy Ecosystem. In the below diagram you'll notice
links to OKTA, Google, and AWS as identity providers. You'll only need to choose one, the other two will not be required
for your own Figgy deployment. 

Your _ecosystem_ depends on how you configure Figgy. Every Figgy deployment will require the following
resources to be provisioned in each integrated AWS account. For a more detailed look at what Figgy Cloud deploys
into your AWS accounts, see the [Figgy Footprint](/manual/footprint/) page.

<br/>![Figgy Ecosystem](/images/deployment/figgy-ecosystem.png)<br/>

