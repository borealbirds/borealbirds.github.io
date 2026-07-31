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
            Landbird Density &amp; Habitat Models
          </h1>
          <p class="text-blue-200 text-xl md:text-2xl leading-snug mt-4">
            Version 4.0 archive by the Boreal Avian Modelling Centre
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
            These archived Version 4.0 Landbird Density &amp; Habitat Models provide density maps, population estimates, habitat associations, and distributions for 143 landbird species.
          </p>
          <g-link to="/methods">
            <button class="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full mb-12">
              Learn more about our methods
            </button>
          </g-link>
          <p class="mb-4">
            Source code for the methodology is available on <a
            class="font-normal"
            href="https://github.com/borealbirds/LandbirdModelsV4"
            target=_blank
            >GitHub</a>.
          </p>
          <p class="mb-4">
            Download <a
              class="font-normal"
              href="https://borealbirds.github.io/api/v4/BAMv4-results-2025-05-21.xlsx"
              target=_blank
            >results</a> in Excel (xlsx) format (version May 2025).
          </p>
          <p class="mb-4">
            Please note, in late March 2025, we discovered a systematic error in the offsets used in these models, and have since updated the products to correct that error. For more information, please see the <a class="font-normal" href="https://github.com/borealbirds/QPAD-offsets-correction">QPAD-offsets-correction repository</a> or email <a class="font-normal" href="mailto:bamp@ualberta.ca">bamp@ualberta.ca</a>.
          </p>

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
          </p>

        </div>
      </div> <!-- end contact-me -->
      <!--      <div class="contact-me bg-background-tertiary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">

          <p class="mb-4">
            We developed a generalized analytical approach to model species density in relation to environmental covariates, using the Boreal Avian Modelling Centre database of point-count surveys
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

