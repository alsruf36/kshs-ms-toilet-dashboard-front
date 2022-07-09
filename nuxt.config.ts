import { defineNuxtConfig } from "nuxt";
import presetIcons from "@unocss/preset-icons";

export default defineNuxtConfig({
  srcDir: "src",
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    // pinia plugin - https://pinia.esm.dev
    "@pinia/nuxt",
    // unocss plugin - https://github.com/unocss/unocss
    "@unocss/nuxt",
    "@intlify/nuxt3",
    "@nuxtjs/color-mode",
  ],

  build: {
    transpile: ["@headlessui/vue"],
  },
  unocss: {
    uno: false,
    preflight: false,
    icons: true,
    presets: [
      presetIcons({
        scale: 1.2,
        extraProperties: {
          display: "inline-block",
        },
      }),
    ],
    safelist: ["i-twemoji-flag-us-outlying-islands", "i-twemoji-flag-turkey"],
  },

  // localization - i18n config
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "ko-KR",
      fallbackLocale: "ko-KR",
      availableLocales: ["ko-KR", "en-US"],
      sync: true,
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ["@pinia/nuxt", "@intlify/nuxt3", "./type.d.ts"],
      },
    },
  },
  colorMode: {
    classSuffix: "",
    fallback: "light",
    storageKey: "color-mode",
  },
  vite: {
    logLevel: "info",
    server: {
        proxy: {
            '/api': {
                target: 'http://158.247.231.126:8088',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '') 
            }
        }
    },
  },
});
