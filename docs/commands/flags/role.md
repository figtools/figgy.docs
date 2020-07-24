
## --role flag

Example: 

```console
    figgy config share --role dba
```

Allows the user to swap-roles from their default configured role (configured with `figgy --configure`) to another role
that their user has access to. Users may only impersonate 1 type of role at a time, but can easily jump between roles by
specifying this flag. 

This command is particularly useful for Ops/Cloud teams to validate user access levels and test new role integrations.