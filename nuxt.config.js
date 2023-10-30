// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ["nuxt-icon", "@nuxtjs/tailwindcss"],


  app: {
    head: {

      script: [
        {type:'module',src:'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'},
        {src:'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'},
        {type:'module',src:'_nuxt/assets/js/uikit.min.js'},
        {src:'_nuxt/assets/js/simplebar.js'},
        {src:'_nuxt/assets/js/script.js'},

      ],
    },
  },




});
