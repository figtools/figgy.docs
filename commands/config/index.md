---
title: Config
has_children: true
nav_order: 1
parent: Commands
nav_no_fold: true
---

## Config Resource

The `config` resource is the primary resource Figgy users should be operating against. This resource represents application
configurations provisioned in the targeted AWS account. 

```
    $   figgy config {command} --env {env}
```

#### CRUD Operations: 

- [Get](/docs/commands/config/get.html)
- [Put](/docs/commands/config/put.html)
- [Delete](/docs/commands/config/delete.html)
- [Edit](/docs/commands/config/edit.html)

#### Views: 

- [Browse](/docs/commands/config/browse.html)
- [List](/docs/commands/config/list.html)

#### Bulk Operations: 

- [Promote](/docs/commands/config/promote.html)
- [Dump](/docs/commands/config/dump.html)

#### State Synchronization & Management: 

- [Sync](/docs/commands/config/sync.html)
- [Cleanup](/docs/commands/config/cleanup.html)
- [Validate](/docs/commands/config/validate.html)

#### Remote Operations: 

- [Share](/docs/commands/config/share.html)


#### Data integrity / Visibility: 

- [Audit](/docs/commands/config/audit.html)
- [Restore](/docs/commands/config/restore.html)
