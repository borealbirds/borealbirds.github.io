# BAM Model Results Website

Go to [website](https://borealbirds.github.io/) to view the glorious results

## Features

- Uses [Vue](https://vuejs.org/) and [Gridsome](https://gridsome.org/)
- [Tailwind CSS v1](https://tailwindcss.com) (with PurgeCSS)
- Based on [this](https://github.com/drehimself/gridsome-portfolio-starter) Gridsome template with light/dark theme.
- Search among species with [Fuse.js](https://fusejs.io) and [vue-fuse](https://github.com/shayneo/vue-fuse)
- 404 Page
- RSS Feed
- Sitemap in XML
- Google search crawling disabled at the moment
- Comments via [Disqus](https://disqus.com/)
- Bird images from [Unsplash](https://unsplash.com/collections/9507373/birds)

## Installation

1. Install Gridsome CLI tool if you don't have it: `npm install --global @gridsome/cli`
2. Clone the repo: `git clone -b dev https://github.com/borealbirds/borealbirds.github.io`
3. `cd borealbirds.github.io`
4. `npm install`
5. `gridsome develop` to start a local dev server at `http://localhost:8080`

## Build & deploy

To locally build and deploy, use the `_build.sh` script (you will need write access to the GitHub repo).

Automatic build & deployment enabled via [GitHub Actions](https://github.com/borealbirds/borealbirds.github.io/actions),
see setup in `.github/workflows/build.yml` file.

## Data

- the species mean density raster layers are available in GeoTIFF format from [here](https://drive.google.com/drive/folders/1exWa6vfhGo1DNUL4ei2baDz77as7jYzY?usp=sharing)
- access the population size and density estimates via the [JSON API](https://borealbirds.github.io/api/).
