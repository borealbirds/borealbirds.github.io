<template>
  <Layout>
    <div class="container-inner mx-auto py-4">
      <div v-html="$context.id" ref="sppid" hidden></div>
      <h2 class="text-4xl font-bold">{{ $context.scientific }}</h2>
      <div class="text-copy-secondary mb-4">Subheading</div>

          <div class="">
            <img :src="mapurl" alt="Density map" class="object-cover w-screen">
          </div>

    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">BCR Name</th>
          <th class="px-4 py-2">Abundance</th>
          <th class="px-4 py-2">Density (males/ha)</th>
          <th class="px-4 py-2">Area (km<sup>2</sup>)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in popsize">
          <td class="border px-4 py-2">{{ item.region }}</td>
          <td class="border px-4 py-2 text-right">{{ item.abundance.estimate + ' (' + item.abundance.lower + ' &#177; ' + item.abundance.upper + ')' }}</td>
          <td class="border px-4 py-2 text-right">{{ item.density.estimate + ' (' + item.density.lower + ' &#177; ' + item.density.upper + ')' }}</td>
          <td class="border px-4 py-2 text-right">{{ item.areakmsq }}</td>
        </tr>
      </tbody>
    </table>

    <!-- <div>{{ data }}</div> -->
    </div>
  </Layout>
</template>
<script>
const axios = require('axios')

const mapurl = 'https://borealbirds.github.io/api/v4/species/ALFL/map.png'
const popsize = [
  {
    region: 'BCR 5',
    abundance: {
      estimate: 101,
      lower: 81,
      upper: 131
    },
    density: {
      estimate: 10.1,
      lower: 8,
      upper: 13
    },
    areakmsq: 100
  },
  {
    region: 'BCR 6',
    abundance: {
      estimate: 10,
      lower: 8,
      upper: 13
    },
    density: {
      estimate: 1.0,
      lower: 0.8,
      upper: 1.3
    },
    areakmsq: 10
  }
]

export default {
  data: function () {
    return {
      data: null,
      mapurl: mapurl,
      popsize: popsize,
      densplot: {}
    }
  },
  mounted: function () {
    const id = this.$refs.sppid.innerText
    console.log("Getting data for " + id)
    axios
      .get(`https://borealbirds.github.io/api/v4/species/${id}`)
      .then(response => {
        this.data = response.data
        console.log("Success")
        // add here all the data manip for plots etc
      })
  }
}
</script>
