<template>
  <Layout>

    <section class="cover bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
        items-center min-h-screen">
      <div class="h-full absolute top-0 left-0 z-0">
        <img
          src="landing.gif"
          alt=""
          class="w-screen h-full object-cover opacity-25"
        >
      </div>

      <div class="lg:w-3/4 xl:w-3/4 relative z-10 h-100 lg:mt-16">
        <div>
          <h1 class="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
            Boreal Bird Species Results
          </h1>
          <p class="text-blue-200 text-xl md:text-2xl leading-snug mt-4">
            by the Boreal Avian Modelling Project
          </p>
          <p class="text-white text-xl md:text-2xl leading-snug mt-4 mb-8">
            Population sizes, habitat associations, and distributions for status assessment, regional planning, conservation prioritization, and recovery of species at risk
          </p>
          <g-link to="/species">
            <button class="bg-green-700 hover:bg-green-500 text-white text-xl font-bold py-2 px-4 rounded-full mb-12">
              Browse results by species
            </button>
          </g-link>
        </div>
      </div>
    </section>

    <div class="overflow-x-hidden">
      <div class="contact-me bg-background-secondary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">

          <p class="mb-4">
            We developed a generalized analytical approach to model species density in relation to environmental covariates, using the Boreal Avian Modelling Project database of point-count surveys.
          </p>
          <g-link to="/methods">
            <button class="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-12">
              Learn more about our methods
            </button>
          </g-link>

        </div>
      </div> <!-- end contact-me -->
      <!--      <div class="contact-me bg-background-tertiary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">

          <p class="mb-4">
            We developed a generalized analytical approach to model species density in relation to environmental covariates, using the Boreal Avian Modelling Project database of point-count surveys
          </p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-12">
            Browse results by species
          </button>

        </div>
      </div> <!-- end contact-me -->
    </div>

  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home',
    meta: [
      { name: 'charset', content: 'utf-8' }
    ]
  }
}
</script>

