Figgy Cloud is versioned and released similarly to the FiggyCLI. Future versions of
the FiggyCLI may contain features that require updates to your FiggyCloud installation. As such, when installing 
Figgy Cloud, it's important _fork_ the root [Figgy Cloud](https://github.com/figtools/figgy) repository and maintain your own version.
During your installation you should commit your configuration changes to your organization's git repository.

Maintaining your own Fork will simplify merging updates from the root Figgy Cloud repository. To merge the latest
updates, first pull your latest changes from the `master` branch. This branch will _always_ maintain the latest
stable version of Figgy. If desired, you may also target previous versions of Figgy Cloud by release tag.

```console
    git pull https://github.com/figtools/figgy.git master
```



!!! warning ""
    Don't forget to check the [release notes](https://github.com/figtools/figgy/blob/master/RELEASE_NOTES.md)
    to see if you need to add new configuration parameters to take advantage of new features!

Once you have merged your changes, re-run the standard Terraform plan & apply process you ran when 
originally provisioning Figgy.  Check the release notes and verify the shown changes appear to correspond with 
expectations defined in the [release notes](https://github.com/figtools/figgy/blob/master/RELEASE_NOTES.md).

**Here's what a workflow would look like:**

=== "BASTION"
    ```
    terraform init
    terraform workspace select bastion
    terraform apply -var-file=vars/bastion.tfvars
    ```

=== "DEV"
    ```
    terraform workspace select dev
    terraform plan -var-file=vars/dev.tfvars
    terraform apply -var-file=vars/dev.tfvars
    ```

=== "QA"
    ```
    terraform workspace select qa
    terraform plan -var-file=vars/qa.tfvars
    terraform apply -var-file=vars/qa.tfvars
    ```

=== "PROD"
    ```
    terraform workspace select prod
    terraform plan -var-file=vars/prod.tfvars
    terraform apply -var-file=vars/prod.tfvars
    ```
    
You get the drift. Make sure to use your appropriate Terraform workspace names you selected when originally installing Figgy.



