<script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="/docs/js/lib/growl-notifications.js" crossorigin="anonymous"></script>
<script src="/docs/js/events.js" crossorigin="anonymous"></script>
  
## Figgy Sandbox

The Figgy sandbox is the perfect place to have a *fling* with Figgy without the *long-term* commitment so many tools
require :smirk:. The Figgy sandbox is configured as a [Bastion](/docs/figgy-cloud/) deployment across 5 different AWS accounts. 

The accounts have been pre-populated with some `Fig Trees` (See - [Figgy Concepts](/docs/getting-started/concepts/))
Feel free take Figgy for a nice long walk through our Sandbox `Fig Orchard` :palm_tree:. Get to know `Figgy`, the `Fig Tree`, and all
the little `Figs` you can find across our sandbox AWS accounts. Feel confident that you can't hurt Figgy or the `Fig Orchard`. 
We grow a new beautiful Sandbox Fig Orchard every night :satisfied:.


Don't forget: [Install Figgy First](/docs/getting-started/install/)

## Login to the Sandbox
    $   figgy login sandbox

Follow the prompts, select your user role:

- DevOps (Highest privilege)
- DBA / DATA
- SRE / DEV (Lowest privilege)

No single role can do everything, so feel free to try different roles! 

All changes you make in the Figgy Sandbox will be broadcast to all people perusing our 
<a href="https://www.figgy.dev/tabs/sandbox/" target="_blank">Figgy Sandbox</a> page.
 
 
### Login 
 
<br/>
<video controls autoplay loop class="video"><source src="/images/videos/login.mp4" type="video/mp4"></video>
<br/>

!!! note "You can always run `figgy --help` or `figgy config --help` to see what Figgy can do"

### Basics 1: Get a fig
    $   figgy config get --env dev

Get a config, any config, from our DEV environment. Depending on the config you select you may or may-not have access
to that configuration. 

<br/>
<video controls autoplay loop class="video"><source src="/images/videos/get.mp4" type="video/mp4"></video>
<br/>


### Basics 2: Store a fig
    $   figgy config put --env dev
    
Store a new configurations in our DEV environment. 
    
<br/>
<video controls autoplay loop class="video"><source src="/images/videos/put.mp4" type="video/mp4"></video>
<br/>

### Basics 3: Browse the Fig Orchard
    $   figgy config browse --env stage    

Browse the Fig Orchard to see what's out there. 

<br/>
<video controls autoplay loop class="video"><source src="/images/videos/browse.mp4" type="video/mp4"></video>
<br/>
And so much more. See our [Commands](/docs/commands/) section to see all figgy can offer!
