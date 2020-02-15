<template>
  <Layout>
    
    <div v-html="$context.id" ref="sppid" hidden></div>

    <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between pb-4">
      <a class="font-normal" :href="`https://borealbirds.github.io/species/${$context.idprevious}`">Previous</a>
      <span></span> 
      <a class="font-normal" :href="`https://borealbirds.github.io/species/${$context.idnext}`">Next</a>
    </div>

    <div class="container-inner mx-auto py-4">
      <h2 class="text-4xl font-bold">{{ $context.english }}</h2>
      <div class="text-2xl text-copy-secondary mb-4">
        <span v-html="$context.french"></span>
        <span> &middot; </span>
        <span><em>{{ $context.scientific }}</em></span>
        <span> &middot; </span>
        <span>Family {{ $context.family }}</span>
      </div>
    </div>

    <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between pt-4">
      <img :src="showdet ? mapurl.det : mapurl.pred" :alt="`Density map of ${$context.english}`" class="">
    </div>
    <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between pb-4">
      Density map of {{ $context.english }} <span></span> 
      <a class="font-normal" href="#" @click="showdet = !showdet">Toggle detections</a>
    </div>

    <div class="container-inner mx-auto py-4">
      <h2 class="text-3xl font-bold">Land cover associations</h2>
    </div>
    <div class="container-inner mx-auto flex flex-col lg:flex-row items-center justify-between pb-4">
      <ul class="flex">
        <li class="mr-1" v-for="bcr in bcrlist">
          <a class="bg-white inline-block py-2 px-2" href="#" @click="updatePlot(bcr)">{{ bcr }}</a>
        </li>
      </ul>
    </div>
    <div class="container-inner mx-auto pb-4">
      <!-- <Plotly :data="densplot" :layout="layout" :display-mode-bar="false"></Plotly> -->
    </div>

    <div class="container-inner mx-auto py-4">
      <h2 class="text-3xl font-bold">Population size</h2>
      <table class="table-fixed">
        <thead>
          <tr>
            <th class="w-4/12 px-4 py-2">Region</th>
            <th class="w-3/12 px-4 py-2">Abundance<br/>(M males)</th>
            <th class="w-3/12 px-4 py-2">Density<br/>(males/ha)</th>
            <th class="w-2/12 px-4 py-2">Area<br/>(M km<sup>2</sup>)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in popsize" class="bg-background-secondary hover:bg-background-tertiary">
            <td class="border px-4 py-2">{{ item.region }}</td>
            <td class="border px-4 py-2 text-right">{{ item.abundance.estimate }}<br/>{{'(' + item.abundance.lower + ' &#177; ' + item.abundance.upper + ')' }}</td>
            <td class="border px-4 py-2 text-right">{{ item.density.estimate }}<br/>{{'(' + item.density.lower + ' &#177; ' + item.density.upper + ')' }}</td>
            <td class="border px-4 py-2 text-right">{{ item.areakmsq }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </Layout>
</template>
<script>
const axios = require('axios')
// import { Plotly } from 'vue-plotly'

export default {
  // components: {
  //   Plotly
  // },
  computed: {
    layout: function () {
      return {
        title: this.title,
        yaxis: {
          automargin: true
        },
        xaxis: { 
          zeroline: false,
          title: { 
            text: 'Density (males/ha)'
          } 
        }
      }
    }
  },
  methods: {
    updatePlot: function (bcrid) {
      const x = this.lcassoc.filter(val => val.region === bcrid)
      this.densplot[0].y = x[0].data.landcover
      this.densplot[0].x = x[0].data.estimate
      var a = x[0].data.estimate
      a = a.map((a, i) => x[0].data.upper[i] - a)
      var b = x[0].data.estimate
      b = b.map((b, i) => b - x[0].data.lower[i])
      this.densplot[0].error_x.array = a
      this.densplot[0].error_x.arrayminus = b
      this.title = (bcrid === 'Canada') ? bcrid : 'BCR ' + bcrid
      console.log('LCC plot updated to BCR ' + x[0].region)
    }
  },
  metaInfo: {
    title: 'Results',
    meta: [
      { name: 'charset', content: 'utf-8' }
    ]
  },
  data: function () {
    return {
      title: '',
      showdet: false,
      mapurl: {
        pred: '',
        det: ''
      },
      popsize: [],
      lcassoc: [],
      bcrlist: [],
      densplot: [
        {
          y: [], // ['Trial 1', 'Trial 2', 'Trial 3'],
          x: [], // [3, 6, 4],
          orientation: 'h',
          marker: {color: '#007a7c'},
          error_x: {
            type: 'data',
            symmetric: false,
            array: [], // [1, 0.5, 1.5],
            arrayminus: [], // [0.5, 0.25, 0.75],
            visible: true
          },
          type: 'bar'
        }
      ]
    }
  },
  mounted: function () {
    const id = this.$refs.sppid.innerText
    console.log('Getting data for species ' + id)
    axios
      .get(`https://borealbirds.github.io/api/v4/species/${id}`)
      .then(response => {
        // this.data = response.data
        this.mapurl.pred = `https://borealbirds.github.io/api/v4/species/${id}/images/mean-pred.png`
        this.mapurl.det = `https://borealbirds.github.io/api/v4/species/${id}/images/mean-det.png`
        this.popsize = response.data.popsize
        this.lcassoc = response.data.densplot
        this.densplot[0].y = response.data.densplot[0].data.landcover
        this.densplot[0].x = response.data.densplot[0].data.estimate
        var a = response.data.densplot[0].data.estimate
        a = a.map((a, i) => response.data.densplot[0].data.upper[i] - a)
        var b = response.data.densplot[0].data.estimate
        b = b.map((b, i) => b - response.data.densplot[0].data.lower[i])
        this.densplot[0].error_x.array = a
        this.densplot[0].error_x.arrayminus = b
        this.bcrlist = response.data.densplot.map(val => val.region)
        this.title = 'Canada'
        console.log('Success')
      })
  }
}
</script>
