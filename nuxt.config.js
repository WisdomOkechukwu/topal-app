export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Tapol',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/tapologo.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/font.css', '~/assets/css/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/cleave.client', ssr: false },
    { src: '~/plugins/toast.client', ssr: false },
    { src: '~/plugins/pagination.client', ssr: false },
    { src: '~/plugins/backendservice.js', ssr: false },
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/vue2-filters.js', ssr: false },
    { src: '~/plugins/datefilter.js', ssr: false },
  ],
  loading: {
    color: 'blue',
    height: '5px',
    continuous: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'nuxt-paystack',
    'nuxtjs-device',
    '@nuxtjs/recaptcha',
    // 'nuxt-hcaptcha',
    '@nuxtjs/svg',
  ],
  recaptcha: {
    /* reCAPTCHA options */
    siteKey: process.env.CAPTCHA_SITE_KEY, // for example
    size: 'invisible',
    hideBadge: false,
    version: 2,
  },
  pwa: {
    meta: {
      title: 'Tapol App',
      author: 'developer',
    },
    manifest: {
      title: 'Tapol App',
      short_name: 'Tapol',
      lang: 'en',
    },
  },
  axios: {
    // credentials: true,
    baseUrl: process.env.BASE_URL,
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      // callback: '/login',
      home: '/',
    },

    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          maxAge: 86400,
          required: true,
          type: 'Bearer',
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        globalToken: true,
        autoFetchUser: true,
        user: {
          property: 'customer',
          autoFetch: true,
        },
        endpoints: {
          login: { url: 'customerauth/login', method: 'post' },
          logout: { url: 'admin/adminlogout', method: 'post' },
          user: { url: 'customerauth/profile', method: 'get' },
        },
      },
      // laravelJWT: {
      // 	provider: 'laravel/jwt',
      // 	url: process.env.BASE_URL,
      // 	token: {
      // 		property: 'access_token',
      // 		maxAge: 60 * 60 * 24,
      // 	},
      // 	refreshToken: {
      // 		maxAge: 20160 * 60,
      // 	},
      // 	endpoints: {
      // 		login: {
      // 			url: '/customerauth/login',
      // 			method: 'post',
      // 			propertyName: 'data.token',
      // 		},
      // 		user: {
      // 			url: '/user/profile',
      // 			method: 'get',
      // 			propertyName: 'data.data',
      // 		},
      // 		refresh: {url: '/auth/refresh', method: 'post'},
      // 		logout: {url: '/auth/logout', method: 'post'},
      // 	},
      // },
    },
  },
  server: {
    port: 5550,
  },
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  // },
  build: {},
}
