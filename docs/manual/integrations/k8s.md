While Figgy does require AWS at this time, organizations running Kubernetes in AWS can still take full advantage of 
Figgy's feature suite. Currently there is no cross-platform support for other cloud providers, so if your organization
intends to run multi-cloud K8s clusters, Figgy is not the right choice. However,
if you are content with AWS and do not have immediate plans to run K8s across multiple clouds, Figgy can offer
distinct advantages over native K8s components for configuration and secret management.

#### Why not native K8s ConfigMaps and Secrets?

- K8s Secrets & Config Maps are cluster specific. You cannot share configurations across clusters.
- K8s ConfigMaps and Secrets lack versioning and change management.
- Users who consume secrets can see the value.
- No CICD build validation.
- K8s lacks the secret-sharing features that Figgy offers.
- Any user with root access on any K8s node can read any secret.
- Subjectively, K8s ConfigMaps and Secrets are more complex to manage than using a service like AWS ParameterStore.


Since Figgy is built on AWS ParameterStore, each service deployed in K8s will need access to its 
Figgy [Twig](/getting-started/concepts/) through standard AWS IAM access control. If your K8s cluster is deployed in 
EKS, we strongly recommend you look into the [AWS IAM + K8s Service Account integration](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).
You may also leverage tools like [kube2iam](https://github.com/jtblin/kube2iam) or [kiam](https://github.com/uswitch/kiam) to
provide appropriate access to your K8s services. 

For an AWS IAM policy reference, see the [IAM Cookbook](/docs/manual/configuration/iam-cookbook).


Got ideas of how to improve K8s and Figgy integrations? Let us know on [Github](https://github.com/figtools/figgy)!