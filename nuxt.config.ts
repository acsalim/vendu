// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  serverHandlers: [
    {
      route: '/api',
      handler: '~/server/api/app.ts',
      middleware: true
    }
  ],

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  nitro: {
    storage: {
      data: {
        driver: 'vercelKV'
      }
    }
  },
  runtimeConfig: {
    DATABASE_URL: "mongodb+srv://avselom:LINqRZAx7JLcLjM5@cluster0.agyka.mongodb.net/vendu"
  }
});