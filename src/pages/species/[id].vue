<template>
  <div v-if="spp">
    <h1>{{ spp.data.species.common }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spp: null
    }
  },
  async mounted() {
    const { id } = this.$route.params
    const response = await fetch(`https://borealbirds.github.io/api/v4/species/${id}`)

    this.spp = await response.json()
  }
}
</script>
