# Figgy Docs

**Never change any files in the mkdocs-material/material directory. This directory is wiped & rebuilt when you run `npm run build`**

To run locally, from the root project directory run:

```console
mkdocs serve -v 
```

Then go to: http://localhost:8000/


To rebuild the theme stored in the `mkdocs-material/` directory (which updates the splash page changes):

`cd mkdocs-material/` then `npm run build`

This will update the `mkdocs-material/material` folder with the latest build. This folder is the doc's site will reference
for the theme when building.


To update the theme and rebuild the project from the root directory run:

`cd mkdocs-material && npm run build && cd ../ && mkdocs serve -v`