const env = require('./env')
const CompressionPlugin = require('compression-webpack-plugin')
const applicationld = require('./applicationld.json')

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'study',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { name: 'referrer', content: 'no-referrer' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(applicationld)
      },
      {
        src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css',
    'assets/less/main.less',
  ],
  router: {
    middleware: 'i18n'
  },
  /**
   * env
   */
  env: env[process.env.NODE_ENV],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/iview', ssr: true },
    '@/services/index',
    '@/plugins/i18n',
    '@/plugins/ls'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    transpile: [/^iview/],
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      })
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: '10' } : { ie: '11' } // 兼容到ie11
        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]]
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  /**
   * 主机和端口配置
   */
  server: {
    host: '0.0.0.0', // default: localhost
    port: 3000 // default: 3000
  }

}
