
## Config Resource

The `config` resource is the primary resource Figgy users should be operating against. This resource represents application
configurations provisioned in the targeted AWS account. 

```
    figgy config {command} --env {env}
```

#### CRUD Operations: 

- [Get](/commands/config/get/)
- [Put](/commands/config/put/)
- [Delete](/commands/config/delete/)
- [Edit](/commands/config/edit/)

#### Views: 

- [Browse](/commands/config/browse/)
- [List](/commands/config/list/)

#### Bulk Operations: 

- [Promote](/commands/config/promote/)
- [Dump](/commands/config/dump/)

#### State Synchronization & Management: 

- [Sync](/commands/config/sync/)
- [Cleanup](/docs/commands/config/cleanup/)
- [Validate](/docs/commands/config/validate/)

#### Remote Operations: 

- [Share](/docs/commands/config/share/)


#### Data integrity / Visibility: 

- [Audit](/docs/commands/config/audit/)
- [Restore](/docs/commands/config/restore/)
