// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueScrollTo from 'vue-scrollto'
import VueFuse from 'vue-fuse'
import VueDisqus from 'vue-disqus'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  
  Vue.use(VueDisqus)

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: "ease",
  })

  Vue.use(VueFuse)

  // disable cache - sometimes the images stay cached
  head.meta.push({
    name: 'Cache-Control',
    content: 'no-cache, no-store, must-revalidate'
  })
  head.meta.push({
    name: 'Pragma',
    content: 'no-cache'
  })
  head.meta.push({
    name: 'Expires',
    content: '0'
  })

  head.meta.push({
    name: 'keywords',
    content: 'Boreal,Birds,Canada,Avian,Modelling,Project'
  })

  head.meta.push({
    name: 'description',
    content: 'Species Model Results'
  })

  head.meta.push({
    name: 'author',
    content: 'Boreal Avian Modelling Project'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700'
  })
}


