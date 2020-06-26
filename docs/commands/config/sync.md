
## Sync

Synchronizes your defined figgy.json configurations with those in Parameter Store. This ensures the proper 
configurations exist in the targeted run environment for your application and notifies you of any detected errors. 
If sync passes, you can expect your build to pass the Parameter Store [validation](/docs/commands/config/validate/) 
step that should be incorporated into your CICD pipeline.

- Ensures that all `app_figs` are present in Parameter Store and prompts you to add any missing parameters. 
- Validates and configures config replication as defined in your figgy.json. This configuration will automatically replicate
any changes from your defined sources to your defined destinations.
- Validates defined shared figs are present in Parameter Store.

For details on how to configure your figgy.json, see: [figgy.json Reference]

Sync success.
<br/>![SyncSuccess](/docs/images/gifs/sync-success.gif)<br/>

Sync detecting missing parameters.
<br/>![SyncUpdate](/docs/images/gifs/sync-update.gif)<br/>


Sync notifying of unused parameters.
<br/>![SyncOrphan](/docs/images/gifs/sync-orphan.gif)<br/>