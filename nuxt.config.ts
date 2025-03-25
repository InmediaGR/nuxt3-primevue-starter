import Aura from '@primeuix/themes/aura'
import pkg from './package.json'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    appManifest: false,
  },
  debug: false,

  compatibilityDate: '2024-07-04',

  ssr: true,
  devtools: { enabled: true },
  nitro: {
    devProxy: {
      '/dev/': {
        target: process.env.NUXT_PUBLIC_API_BASE, //'https://api.torotips.com/v1/api',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },

  runtimeConfig: {
    public: {
      APP_VERSION: pkg.version,
      APP_NAME: pkg.name,
      // eslint-disable-next-line node/prefer-global/process
      APP_MODE: process.env?.NODE_ENV,
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
    '@nuxt/image',
    '@nuxt/fonts',
    '@unocss/nuxt',
    '@nuxtjs/i18n'
  ],
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',

      }
    }
  },

  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    lazy: true,
    langDir: 'locales', // 'i18n/locales'
    defaultLocale: 'de',
    strategy: 'no_prefix',
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'de', file: 'de.json', name: 'German' },
    ],
    vueI18n: '../vue-i18n.options.ts',
    // detectBrowserLanguage: {
    //   useCookie: false,
    //   fallbackLocale: 'de',
    //   redirectOn: 'root' // or 'all' if needed
    // }
  },
  primevue: {
    components: {
      include: '*',
      exclude: ['LazyForm', 'LazyFormField']
    },
    autoImport: true,  // todo test
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
      ripple: true,
    },
    // importPT: { from: '@/passthrough/custompt.ts' },
    // importTheme: { from: '@/themes/anathema.ts' },
  },
  imports: {
    presets: [
      {
        from: 'vue',
        imports: ['defineAsyncComponent']
      }
    ]
  },
  build: {
    transpile: [
      'nuxt',
      'primevue',
    ],
  },

  sourcemap: {
    client: false,
    server: false,
  },

})
