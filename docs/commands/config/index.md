
## Config Resource

The `config` resource is the primary resource Figgy users should be operating against. This resource represents application
configurations provisioned in the targeted AWS account. 

```
    $   figgy config {command} --env {env}
```

#### CRUD Operations: 

- [Get](/commands/config/get.html)
- [Put](/commands/config/put.html)
- [Delete](/commands/config/delete.html)
- [Edit](/commands/config/edit.html)

#### Views: 

- [Browse](/commands/config/browse.html)
- [List](/commands/config/list.html)

#### Bulk Operations: 

- [Promote](/commands/config/promote.html)
- [Dump](/commands/config/dump.html)

#### State Synchronization & Management: 

- [Sync](/commands/config/sync.html)
- [Cleanup](/commands/config/cleanup.html)
- [Validate](/commands/config/validate.html)

#### Remote Operations: 

- [Share](/commands/config/share.html)


#### Data integrity / Visibility: 

- [Audit](/commands/config/audit.html)
- [Restore](/commands/config/restore.html)
