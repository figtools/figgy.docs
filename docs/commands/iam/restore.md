## Restore

Command:

    $   figgy iam restore
    

Figgy will not overwrite existing long-lived IAM access keys in your `~/.aws/credentials` file. Instead of overwriting 
long-lived keys, Figgy will back them up by suffixing them with the `-figgy-backup`. For instance, if your `[default]`
profile under `~/.aws/credentials` has long-lived access keys, Figgy will rename that profile to `[default-figgy-backup]`
before writing new temporary keys to `[default]` The `iam restore` command will restore these backed-up 
credentials and overwrite the temporary figgy-generated access keys that were written to the `[default]` 
profile by `figgy iam export`. 