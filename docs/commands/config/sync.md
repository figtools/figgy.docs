
## Sync

Synchronizes your defined figgy.json configurations with those in Parameter Store. This ensures the proper 
configurations exist in the targeted run environment for your application and notifies you of any detected errors. 
If sync passes, you can expect your build to pass the Parameter Store [validation](/commands/config/validate/) 
step that should be incorporated into your CICD pipeline.

- Ensures that all `app_figs` are present in Parameter Store and prompts you to add any missing parameters. 
- Validates and configures config replication as defined in your figgy.json. This configuration will automatically replicate
any changes from your defined sources to your defined destinations.
- Validates defined shared figs are present in Parameter Store.

If you do not provide the `--config` option to specify the location of your `figgy.json`, figgy will search in 
[these locations](https://github.com/figtools/figgy-cli/blob/a39095d86c873a7f27fded1755028e2fd21dfa3d/src/figcli/config/constants.py#L154)
for a `figgy.json` file automatically. 

For details on how to configure your figgy.json, see: [Declarative Configuration](/advanced/declarative-configuration/)

### Sync success.
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/sync-success.mp4" type="video/mp4"></video>
<br/>
---

### Sync detecting missing parameters.
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/sync-update.mp4" type="video/mp4"></video>
<br/>
---

### Sync notifying of unused parameters.
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/sync-stray.mp4" type="video/mp4"></video>
<br/>
---

### Sync with --replication-only flag.
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/sync-replication.mp4" type="video/mp4"></video>
<br/>

