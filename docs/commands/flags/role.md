
## --role flag

Example: 

```console
    $   figgy config share --role dba
```

Allows the user to swap-roles from their default configured role (configure with `figgy --configure`) to another role
that they have been granted access to. Users may only impersonate 1 type of user at a time, but may have access to 
impersonate as many user roles as is configured for their user. 

This command is particularly useful for Ops/Cloud teams to validate user access levels and test new role integrations.