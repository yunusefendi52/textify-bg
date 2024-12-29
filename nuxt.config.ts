// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '**': {
      ssr: false,
    },
  },
  experimental: {
    componentIslands: 'auto',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'vue3-pixi-nuxt',
  ],
  css: ['~/assets/css/main.css'],
})
