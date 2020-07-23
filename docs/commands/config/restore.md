

## Restore

Restore any arbitrary ParameterStore value or hierarchy of values to a point-in time in the past.



## Restoring a single parameter

Target a single parameter and select from a history of values. Select the value you want to make current.

```console
    figgy config restore --env dev
```

<br/>![Restore](/images/gifs/restore.gif)<br/>



## Restoring to a point-in-time.

Figgy enables restoring a single parameter or hierarchy of parameters to a specific point in time. Parameters that have
differing state between now and the targeted point-in-time will be deleted and rebuilt from scratch. To 
ensure proper version history, all parameter change events will be replayed up until targeted point-in-time. 

Limitations:

- Users may only restore parameter hierarchies they have access to
- Parameters that are replication destinations (so their source of truth is elsewhere) will be skipped. Instead the
source-of-truth should be restored.
- Users performing restores must have access to the access keys used for each restored parameter. 

Typically, it is recommended that administrators or power-users perform large-scale hierarchical restorations. 

```console
    figgy config restore --env dev --point-in-time
```
<br/>![Restore](/images/gifs/restore-pit.gif)<br/>