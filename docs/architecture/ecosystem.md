
# Architecture

Figgy is a lot more than just a CLI, it's part of a larger config management ecosystem that must be deployed across
all integrated AWS accounts. Below is a diagram of the entire Figgy Ecosystem. In the below diagram you'll notice
links to OKTA, Google, and AWS as identity providers. You'll only need to choose one, the other two will not be required
for your own Figgy deployment. 

Your _ecosystem_ depends on how you configure Figgy. Every Figgy deployment will require the following
resources to be provisioned in each integrated AWS account. As always, you can and **should** look over the Terraform
code in our public repository to see what to expect. You can find it here: 
<a href="https://github.com/figtools/figgy/tree/master/terraform" target="_blank">Figgy Infrastructure Code</a>


<br/>![Figgy Ecosystem](/docs/images/deployment/figgy-ecosystem.png)<br/>

