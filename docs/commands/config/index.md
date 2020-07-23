
## Config Resource

The `config` resource is the primary resource Figgy users should be operating against. This resource represents application
configurations provisioned in the targeted AWS account. 

```
    $   figgy config {command} --env {env}
```

#### CRUD Operations: 

- [Get](/docs/commands/config/get/)
- [Put](/docs/commands/config/put/)
- [Delete](/docs/commands/config/delete/)
- [Edit](/docs/commands/config/edit/)

#### Views: 

- [Browse](/docs/commands/config/browse/)
- [List](/docs/commands/config/list/)

#### Bulk Operations: 

- [Promote](/docs/commands/config/promote/)
- [Dump](/docs/commands/config/dump/)

#### State Synchronization & Management: 

- [Sync](/docs/commands/config/sync/)
- [Cleanup](/docs/commands/config/cleanup/)
- [Validate](/docs/commands/config/validate/)

#### Remote Operations: 

- [Share](/docs/commands/config/share/)


#### Data integrity / Visibility: 

- [Audit](/docs/commands/config/audit/)
- [Restore](/docs/commands/config/restore/)
