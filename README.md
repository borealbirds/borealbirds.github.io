# Gridsome Portfolio Starter

A simple portfolio starter theme for Gridsome

![screenshot](https://user-images.githubusercontent.com/4316355/55691365-a2403380-596b-11e9-93be-05b846ec7760.jpg)

## Demo URL

[https://gridsome-portfolio-starter.netlify.com](https://gridsome-portfolio-starter.netlify.com)

## Features

- Clean and minimal design
- [Tailwind CSS v1](https://tailwindcss.com) (with PurgeCSS)
- Scroll to sections using [vue-scrollto](https://github.com/rigor789/vue-scrollto)
- Blog with markdown content for posts
- Documentation type that shows how to use Vue components in Markdown (click Docs)
- Theme Switcher with Dark Mode
- Search posts with [Fuse.js](https://fusejs.io) and [vue-fuse](https://github.com/shayneo/vue-fuse)
- Tags for posts
- Basic pagination
- Syntax highlighting with [Shiki](https://shiki.matsu.io) (using [this gridsome plugin](https://gridsome.org/plugins/gridsome-plugin-remark-shiki))
- 404 Page
- RSS Feed
- Sitemap in XML

## Installation

1. Install Gridsome CLI tool if you don't have it: `npm install --global @gridsome/cli`
1. Clone the repo: `git clone https://github.com/drehimself/gridsome-portfolio-starter.git`
1. `cd gridsome-portfolio-starter`
1. `npm install`
1. `gridsome develop` to start a local dev server at `http://localhost:8080`

## Notes

 - Based on my [personal portfolio website](https://andremadarang.com). I wanted to create an open source version with more features.
 - Check out a [screencast I did](https://www.youtube.com/watch?v=uHo6o1TNQeE) where I go through the process of building my website.
 - Illustrations from [unDraw](https://undraw.co)
 - Search is based on [Fuse.js](https://fusejs.io) and [vue-fuse](https://github.com/shayneo/vue-fuse). It only searches the title and summary of posts for now. Some tweaking may be necessary to get it to search to your liking. Check out the fuse documentation for search settings. A `search.json` index file is generated at build time. This happens in `gridsome.server.js`.
 - Check out these other Gridsome Starters where I got some ideas from:
    - [Gridsome Starter Blog](https://github.com/gridsome/gridsome-starter-blog)
    - [Gridsome Starter Bleda](https://github.com/cossssmin/gridsome-starter-bleda)
    - [Jigsaw Starter Blog](https://jigsaw.tighten.co/docs/starter-templates/) - I got a lot of design inspiration from this starter theme.

## Deploy

```
cd ~/repos
mkdir _tmp
cd _tmp
git clone -b dev https://github.com/borealbirds/borealbirds.github.io.git dev
cd dev
npm install
gridsome build
cd ..
git clone -b master https://github.com/borealbirds/borealbirds.github.io.git master
cd master
git rm -r *
cp -r ../dev/dist/* ./
git add --all *
git commit -m "Update website"
git push -q origin master
cd ..
#rm -rf _tmp
cd ~/repos/borealbirds.github.io
```

## Todo

- update images w det
- fix plotly issue: try adding all the data to the page context? maybe then local require will be OK
- under the map use show/remove instead of toggle
- make video for landing page
- need to make species ID reactive by exposing via data

D3 links
Horizontal barchart https://bl.ocks.org/alandunning/7008d0332cc28a826b37b3cf6e7bd998
Resize svg https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/
Error bar https://bl.ocks.org/NGuernse/8dc8b9e96de6bedcb6ad2c5467f5ef9a
https://qiita.com/ku0522a/items/19934339c69037171b31


