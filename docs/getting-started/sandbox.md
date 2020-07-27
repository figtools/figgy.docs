<script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="/js/lib/growl-notifications.js" crossorigin="anonymous"></script>
<script src="/js/events.js" crossorigin="anonymous"></script>
  
## Figgy Sandbox

The Figgy sandbox is the perfect place to have a *fling* with Figgy without the *long-term* commitment so many tools
require :smirk:. The Figgy sandbox is configured as a [Bastion](/manual/figgy-cloud/) deployment across 5 different AWS accounts. 

The Figgy sandbox has been pre-populated with Fig Trees (See - [Figgy Concepts](/getting-started/concepts/)).
Feel free take Figgy for a nice long walk through our Fig Orchard :palm_tree:. Get to know Figgy, our Fig Trees, and all
the little Figs you can find across our sandbox AWS accounts. Don't worry, you can't hurt Figgy or the Fig Orchard, 
we grow a new beautiful Sandbox Fig Orchard every night :satisfied:.


!!! hint "Don't forget: [Install Figgy First](/getting-started/install/)"

## Login to the Sandbox
    figgy login sandbox

Follow the prompts, select your user role:

- DevOps (Highest privilege)
- DBA / DATA
- SRE / DEV (Lowest privilege)

No single role can do everything, so feel free to try different roles! 

Have fun, all changes you make in the Figgy Sandbox will be broadcast to all people perusing this page!
 
 
### Login 
 
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/login-sandbox.mp4" type="video/mp4"></video>
<br/>

!!! note "You can always run `figgy --help` or `figgy config --help` to see what Figgy can do"

### Basics 1: Get a fig
    figgy config get --env dev

Get a config, any config, from our DEV environment. Depending on the config you select you may or may-not have access
to that configuration. 

<br/>
<video autoplay loop muted class="video"><source src="/images/videos/get.mp4" type="video/mp4"></video>
<br/>


### Basics 2: Store a fig
    figgy config put --env dev
    
Store a new configuration in our DEV environment. 
    
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/put.mp4" type="video/mp4"></video>
<br/>

### Basics 3: Browse the Fig Orchard
    figgy config browse --env dev    

Browse the Fig Orchard to see what's out there. 

<br/>
<video autoplay loop muted class="video"><source src="/images/videos/browse.mp4" type="video/mp4"></video>
<br/>

### Basics 4: Slice & Dice the Fig Orchard
    figgy config list --env dev
    
<br/>
<video autoplay loop muted class="video"><source src="/images/videos/list.mp4" type="video/mp4"></video>
<br/>

And so much more. See our [Commands](/commands/config/get/) section to see all figgy can offer!
