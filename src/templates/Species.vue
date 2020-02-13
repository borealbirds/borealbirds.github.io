<template>
  <Layout>
    <h1>{{ $context.scientific }}</h1>
    <div v-html="$context.id" ref="sppid" hidden></div>
    <div>{{ data }}</div>
  </Layout>
</template>
<script>
const axios = require('axios')

export default {
  data: function () {
    return {
      data: null
    }
  },
  mounted: function () {
    const id = this.$refs.sppid.innerText
    console.log("Getting data for " + id)
    axios
      .get(`https://borealbirds.github.io/api/v4/species/${id}`)
      .then(response => (this.data = response.data))
  }
}
</script>
