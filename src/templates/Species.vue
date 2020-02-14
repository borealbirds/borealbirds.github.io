<template>
  <Layout>

    <div class="container-inner mx-auto py-4">
      <div v-html="$context.id" ref="sppid" hidden></div>
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

    <div class="container-inner mx-auto py-4">
      <h2 class="text-3xl font-bold">Land cover associations</h2>
    </div>

  </Layout>
</template>
<script>
const axios = require('axios')

export default {
  data: function () {
    return {
      // data: null,
      showdet: false,
      mapurl: {
        pred: '',
        det: ''
      },
      popsize: [],
      densplot: {}
    }
  },
  mounted: function () {
    const id = this.$refs.sppid.innerText
    console.log("Getting data for " + id)
    axios
      .get(`https://borealbirds.github.io/api/v4/species/${id}`)
      .then(response => {
        // this.data = response.data
        this.popsize = response.data.popsize
        this.mapurl.pred = `https://borealbirds.github.io/api/v4/species/${id}/images/mean-pred.png`
        this.mapurl.det = `https://borealbirds.github.io/api/v4/species/${id}/images/mean-det.png`
        console.log("Success")
      })
  }
}
</script>
