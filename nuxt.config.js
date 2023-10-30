// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ["nuxt-icon", "@nuxtjs/tailwindcss"],


  app: {
    head: {

      script: [
        {type:'module',src:'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'},
        {src:'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'},
        {type:'module',src:'https://demo.foxthemes.net/socialite-v3.0/assets/js/uikit.min.js'},
        {src:'https://demo.foxthemes.net/socialite-v3.0/assets/js/simplebar.js'},
        {src:'https://demo.foxthemes.net/socialite-v3.0/assets/js/script.js'},

      ],
    },
  },




});
