
## Figgy Sandbox

There's a free <a href="https://www.figgy.dev/tabs/sandbox/" target="_blank">Figgy Sandbox</a> you can use to 
experiment with Figgy. Go ahead, open up that Sandbox link, lets' have some fun!

Don't forget: [Install Figgy First](/getting-started/install/)

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
 
<br/><img src="/images/gifs/login-sandbox.gif" alt="Login Sandbox" class="gif"><br/>

> You can always run `figgy --help` or `figgy config --help` to see what Figgy can do

### Basics 1: Get a fig
    $   figgy config get --env dev

Get a config, any config, from our DEV environment. Depending on the config you select you may or may-not have access
to that configuration. 

<br/><img src="/images/gifs/get.gif" alt="Login Sandbox" class="gif"><br/>


### Basics 2: Store a fig
    $   figgy config put --env dev
    
Store a new configurations in our DEV environment. 
    
<br/><img src="/images/gifs/put.gif" alt="Login Sandbox" class="gif"><br/>


### Basics 3: Browse the Fig Orchard
    $   figgy config browse --env stage    

Browse the Fig orchard to see what's out there. 

<br/><img src="/images/gifs/browse.gif" alt="Login Sandbox" class="gif"><br/>

And so much more. See our [Commands](/commands/) section to see all figgy can offer!
