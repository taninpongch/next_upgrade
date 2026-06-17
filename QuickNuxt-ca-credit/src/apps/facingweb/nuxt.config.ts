// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-17',
  ssr: false,
  devtools: { enabled: false },
  app: {
    baseURL: '/ba_202606171630/',
    head: {
      title: 'Mana App Starter',
    },
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/fonts'
  ],
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  fonts: {
    defaults: {
      weights: [300, 600]
    }
  },
  ui: {
    icons: {}
  }
})