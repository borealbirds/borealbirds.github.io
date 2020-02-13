<template>
  <v-app>
    <v-app-bar
      absolute
      color="white"
    >
      <v-app-bar-nav-icon>
        <a href="/">
          <img src="~/assets/logo.svg" height="60">
        </a>
      </v-app-bar-nav-icon>

      <v-toolbar-title>BAM Bird Species Models</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <a href="/species"><v-icon>mdi-magnify</v-icon></a>
      </v-btn>

      </v-app-bar>
      <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }} <a href="" target=_blank>Boreal Avian Modelling Project</a> under a <a href="" target=_blank>CC BY-SA 4.0</a> license</span>
    </v-footer>
  </v-app>
</template>

<script>
</script>
