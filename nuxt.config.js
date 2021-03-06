module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'axel_gallery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/5.0.4/firebase.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  // SPAモード
  mode: 'spa',

  // 全ページで読み込まれるcssを定義
  css: [
    '@/assets/css/main.scss'
  ],

  // どこからでも参照できるscssを読み込む
  modules: [
    ['nuxt-sass-resources-loader', [
      '@/assets/css/common/_variables.scss',
      '@/assets/css/common/_mixins.scss',
    ]],
  ],
}
