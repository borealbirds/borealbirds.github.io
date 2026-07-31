<template>
  <Layout>

    <div
      v-html="$context.id"
      ref="sppid"
      hidden
    ></div>

    <!-- <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between pb-4">
      <g-link  class="font-normal" :to="`/species/${$context.idprevious}`">Previous</g-link>
      <span></span> 
      <g-link class="font-normal" :to="`/species/${$context.idnext}`">Next</g-link>
    </div> -->

    <!-- title -->
    <div class="container-inner mx-auto py-4">
      <p class="text-lg text-copy-secondary mb-2">Landbird Density &amp; Habitat Models &middot; Version 4.0 archive</p>
      <h2 class="text-4xl font-bold">{{ $context.english }}</h2>
      <div class="text-2xl text-copy-secondary mb-4">
        <span v-html="$context.french"></span>
        <span> &middot; </span>
        <span><em>{{ $context.scientific }}</em></span>
        <span> &middot; </span>
        <span>Family {{ $context.family }}</span>
      </div>
    </div>

    <!-- disclaimer -->
    <!-- <div class="container-inner mx-auto py-4">
      <strong>DISCLAIMER</strong> &mdash; Maps and population/density estimates are based on conditions in the year 2011.
      These results are preliminary and have not yet undergone peer review. Future changes to
      model structure and covariates may result in different spatial prediction patterns but
      should not substantially change population estimates or habitat-based mean density estimates.
      With future incorporation of additional avian data, the precision and accuracy of the estimates will improve.
      Please contact <a href="mailto:solymos@ualberta.ca?subject=BAM Species Website">solymos@ualberta.ca</a>
      with questions about appropriate uses of these results and associated data products.
    </div> -->

    <!-- map -->
    <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between pt-4">
      <g-image
        :src="showdet ? mapurl.det : mapurl.pred"
        :alt="`Density map of ${$context.english}`"
      />
    </div>
    <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between pb-4">
      Density map of {{ $context.english }} (average density, males/ha) <span></span>
      <a
        class="font-normal"
        href="#"
        @click="showdet = !showdet"
      >{{ showdet ? 'Hide' : 'Show' }} detections</a>
    </div>

    <!-- land cover density -->
    <div class="container-inner mx-auto py-4">
      <h2 class="text-3xl font-bold">Land cover associations</h2>
      Density (males/ha) across Canada and in Bird Conservation Regions within Canada (see <a href="/methods">Methods</a>)
    </div>
    <div class="container-inner mx-auto flex flex-col lg:flex-row items-center justify-between pb-4">
      <ul class="flex">
        <li
          class="mr-1"
          v-for="bcr in bcrlist"
        >
          <a
            class="bg-white inline-block py-2 px-2"
            href="#"
            @click="updateFig(bcr)"
          >{{ bcr }}</a>
        </li>
      </ul>
    </div>
    <div class="container-inner mx-auto pb-4">
      <g-image
        :src="figurl"
        :alt="`Density by land cover for ${$context.english}`"
      />
    </div>

    <!-- table -->
    <div class="container-inner mx-auto py-4">
      <h2 class="text-3xl font-bold">Population size</h2>
      Population size (million males) is based on summing up predictive maps by regions (intervals in parentheses reflect the 5th and 95th percentile of the bootstrap distribution; see <a href="/methods">Methods</a>)
      <table class="table-fixed">
        <thead>
          <tr>
            <th class="w-4/12 px-4 py-2">Region</th>
            <th class="w-3/12 px-4 py-2">Abundance<br />(M males)</th>
            <th class="w-3/12 px-4 py-2">Density<br />(males/ha)</th>
            <th class="w-2/12 px-4 py-2">Area<br />(M km<sup>2</sup>)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in popsize"
            class="bg-background-secondary hover:bg-background-tertiary"
          >
            <td class="border px-4 py-2">{{ item.region }}</td>
            <td class="border px-4 py-2 text-right">{{ item.abundance.estimate }}<br />{{'(' + item.abundance.lower + ' &mdash; ' + item.abundance.upper + ')' }}</td>
            <td class="border px-4 py-2 text-right">{{ item.density.estimate }}<br />{{'(' + item.density.lower + ' &mdash; ' + item.density.upper + ')' }}</td>
            <td class="border px-4 py-2 text-right">{{ item.areakmsq }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- info -->
    <div class="container-inner mx-auto py-4">
      <h2 class="text-3xl font-bold">Data accessibility</h2>
      <ul>
        <li class="mb-4">
          For additional ways to access and work with current and archived models, visit the <a
            class="font-normal"
            href="https://cloud.borealbirds.ca/dashboard"
            target=_blank
          >current BAM dashboard</a> or use the <a
            class="font-normal"
            href="https://github.com/borealbirds/BAMexploreR"
            target=_blank
          >BAMexploreR R package</a>.
        </li>
        <li class="mb-4">
          Download <a
            class="font-normal"
            href="https://drive.google.com/drive/folders/1EALiDsyUnqNWIfwe4z-fvE7CBjdV1-RV"
            target=_blank
          >average density</a> raster layers in GeoTIFF format.
        </li>
        <li class="mb-4">
          Download <a
            class="font-normal"
            href="https://borealbirds.github.io/api/v4/BAMv4-results-2025-05-21.xlsx"
            target=_blank
          >results</a> in Excel (xlsx) format. Sheets contain abundance and density estimates and also the list of species, variables, variable importance and validation metrics.
        </li>
        <li class="mb-4">
          Access the population size and density estimates via the <a
            class="font-normal"
            href="https://borealbirds.github.io/api/"
            target=_blank
          >JSON API</a>.
        </li>
      </ul>
    </div>

    <div class="container-inner mx-auto py-4">
      <h2 class="text-3xl font-bold">Citing these results</h2>

      <p class="mb-4">
        <strong>Publication</strong><br>
        Stralberg, D., Sólymos, P., Docherty, T. D. S., Crosby, A. D., Van Wilgenburg, S. L., Knight, E. C., Drake, A., et al. (2025). A generalized modeling framework for spatially extensive species abundance prediction and population estimation. <em>Ecosphere, 16</em>(10), e70405. <a
          class="font-normal"
          href="https://doi.org/10.1002/ecs2.70405"
          target=_blank
        >https://doi.org/10.1002/ecs2.70405</a>.
      </p>
      <p class="mb-4">
        <strong>Model version — Landbird Density &amp; Habitat (v4 archive)</strong><br>
        Sólymos, P., D. Stralberg, and E. C. Knight. 2025. BAM Generalized National Models Documentation (Version 4.0) [Data set]. Zenodo, DOI: <a
          class="font-normal"
          href="https://doi.org/10.5281/zenodo.4018335"
          target=_blank
        >10.5281/zenodo.4018335</a>.
        [Results for {{ $context.english }} (<em>{{ $context.scientific }}</em>)]
      </p>
    </div>

    <div class="container-inner mx-auto py-4">
      Questions about these results? <a
        class="font-normal"
        href="https://borealbirds.ca/contact/"
      >Contact the Boreal Avian Modelling Centre.</a>
    </div>

  </Layout>
</template>
<script>
const axios = require('axios')
export default {
  methods: {
    updateFig: function (bcrid) {
      this.title = (bcrid === 'Canada') ? bcrid : 'BCR ' + bcrid
      const reg = (bcrid === 'Canada') ? 'can' : bcrid
      this.figurl = `https://borealbirds.github.io/api/v4/species/${this.sppid}/images/dbylc-${reg}.svg`
    }
  },
  metaInfo: {
    title: 'Landbird Density & Habitat Results',
    meta: [
      { name: 'charset', content: 'utf-8' }
    ]
  },
  data: function () {
    return {
      title: 'Canada',
      version: '2025-05-21',
      sppid: '',
      showdet: false,
      figurl: '',
      mapurl: {
        pred: '',
        det: ''
      },
      popsize: [],
      lcassoc: [],
      bcrlist: []
    }
  },
  mounted: function () {
    // grab ref
    const id = this.$refs.sppid.innerText
    this.sppid = id
    // load data from api
    console.log('Getting data for species ' + id)
    axios
      .get(`https://borealbirds.github.io/api/v4/species/${id}`)
      .then(response => {
        // this.data = response.data
        this.mapurl.pred = `https://borealbirds.github.io/api/v4/species/${id}/images/mean-pred.png`
        this.mapurl.det = `https://borealbirds.github.io/api/v4/species/${id}/images/mean-det.png`
        this.figurl = `https://borealbirds.github.io/api/v4/species/${id}/images/dbylc-can.svg`
        this.popsize = response.data.popsize
        this.lcassoc = response.data.densplot
        this.bcrlist = response.data.densplot.map(val => val.region)
        console.log('Success')
      })
      .catch()
  }
}
</script>
