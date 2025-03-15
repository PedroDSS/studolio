// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.VITE_API_URL,
    },
  },
  tailwindcss: {
    config: {},
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    editorSupport: true,
    exposeConfig: false,
    viewer: { endpoint: "/_tailwind", exportViewer: true },
  },
  modules: ["@nuxtjs/tailwindcss"],
});
