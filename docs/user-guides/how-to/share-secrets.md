## Manage & Share Secrets

1. [Storing Secrets](#step-1-store-the-secret)
1. [Sharing Secrets](#step-2-share-the-secret)
1. [Managing Secrets at Scale](#managing-secrets-at-scale)

If you're a secret owner and want to securely store a secret then you've come to the right place. 

Depending on your user role the commands you might execute may differ. For instance, in this example I will be demonstrating
storing and sharing a secret as the "DBA" role.

### Step 1: Store the secret
In our example, we have a Database Administrator, Steve, who needs to securely store a DB User / Password with Figgy.

First, Steve will will need to securely store and encrypt his secret with Figgy. 

```console
    $   figgy config put --env prod
```

<br/>![DBA Store PW](/images/gifs/dba-put-password.gif)<br/>

Sweet! Steve has now successfully stored a secret in ParameterStore!

### Step 2: Share the secret

In the previous step our DBA Steve stored the secret: `/dba/secrets/mysql/shared/data-changer/password`

Now we want to share it with the data-changer service without handing it directly to the person who owns the 
data-changer. The fewer people who know this secret the better!

```console
    $   figgy config share --env prod
```

<br/>![DBA Share PW](/images/gifs/dba-share-password.gif)<br/>


We can verify the secret was successfully shared with the `get` command. You will notice that this secret cannot be 
decrypted by the user. This secret may _only_ be decrypted by the application using this secret, or a super-admin who
has been granted access to the [Replication Key](/advanced/confidentiality.html).


<br/>![DBA Share PW](/images/gifs/dba-get-password.gif)<br/>

## Managing secrets at scale

The above example works fine for small and simple use-cases; however, as the number of secrets you need to manage
grows, as does the complexity of remembering what secrets exist in which environments, and who is using them.

To simplify managing this process, Figgy supports declarative secret management by secret owners. Secret owners
can write JSON configuration file that define what the secrets are that they own, and where they need to be
shared. Then may then run the `sync` command with the `--replication-only` flag to configure the secret _and_ the share.

By following this pattern, it's easy to manage the creation & sharing of a secret across many environments.

Here is a sample configuration:
```json
{
  "replicate_figs": {
    "/dba/secrets/mysql/shared/data-changer/user": "/app/data-changer/replicated/secrets/mysql/user",
    "/dba/secrets/mysql/shared/data-changer/password" : "/app/data-changer/replicated/secrets/mysql/password"
  }
}
```

As you can see, this replication config declaratively defines what secrets need to be created & shared for the 
`data-changer` service.

Now our DBA user can simply use the sync command, like this:

    $   figgy config sync --env dev --config data-changer.json --replication-only

This will prompt them to store & share these secrets in the *dev* environment. They can then follow up and do it again
in the **stage** environment.

    $   figgy config sync --env stage --config data-changer.json --replication-only
    
    
And so on for every higher environment. This expands on the declarative design of managing configurations.

<br/>![DBA Sync](/images/gifs/dba-sync-repl-only.gif)<br/>
