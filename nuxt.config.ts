// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui-pro", "@nuxt/eslint"],
  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: "2024-11-27",

  typescript: {
    typeCheck: false,
    strict: false
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
})