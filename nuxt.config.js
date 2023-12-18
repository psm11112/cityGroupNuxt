// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      url:process.env.PUBLIC_URL
    } ,
  },
  loading: {
    color: 'blue',
    height: '10px',
    duration: 1000,
    rtl: true,
    continuous: true,
  },

  modules: ["nuxt-icon", "@nuxtjs/tailwindcss", '@pinia/nuxt','@vueuse/nuxt','@formkit/auto-animate/nuxt', 'nuxt-primevue'],
  app: {
    head: {

      script: [
        {type:'module',src:'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js'},
        {src:'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'},
        {src:'https://admin.nearmeglocal.com/public/js/uikit.min.js'},
        {src:'https://admin.nearmeglocal.com/public/js/simplebar.js'},
        {src:'https://admin.nearmeglocal.com/public/js/script.js'},
      ],
    },
  },



  plugins: [
    '~/plugins/loadUser',
    '~/plugins/toast'

  ],
  buildModules: ['nuxt-use-motion']




});
