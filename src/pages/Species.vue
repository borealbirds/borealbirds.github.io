<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <!-- <h1 class="text-4xl text-blue-400 font-bold mb-8">Species</h1> -->
      <div v-for="spp in sppList" :key="spp.id" class="mb-5">
        <h2 class="text-2xl font-bold"><g-link :to="'/species/' + spp.id" class="text-copy-primary">{{ spp.english }}</g-link></h2>
        <div class="text-copy-secondary mb-4">
          <!--<span>{{ spp.french }}</span>
          <span> &middot; </span>-->
          <span><em>{{ spp.scientific }}</em></span>
          <span> &middot; </span>
          <span>Family {{ spp.family }}</span>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import sppList from '@/data/species.json'

export default {
  metaInfo: {
    title: 'Species',
    meta: [
      { name: 'charset', content: 'utf-8' }
    ]
  },
  data: function () {
      return {
          sppList: sppList
      }
  }
}
</script>
