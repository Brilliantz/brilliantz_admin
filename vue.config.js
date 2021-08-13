/* eslint-disable */

module.exports = {
  //PUBLIC PATH FOR PRODUCTION
  publicPath: process.env.NODE_ENV === 'production'
      ? '/project/planpal/'
      : '/'
  ,
  devServer: {
    host: process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_BASE_URL
      : process.env.VUE_APP_BASE_URL_DEV,
    proxy: {
      '/sanctum': {
        target: process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_API_BASE_URL
            : process.env.VUE_APP_API_BASE_URL_DEV,
        cookieDomainRewrite: {
          '*': process.env.NODE_ENV === 'production'
              ? process.env.VUE_APP_API_BASE_URL
              : process.env.VUE_APP_API_BASE_URL_DEV
        },
      },
      '/auth': {
        target: process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_API_BASE_URL
            : process.env.VUE_APP_API_BASE_URL_DEV,
        secure: false
      }
    }
  },
  // chainWebpack: config => {
  //   config.plugin('VuetifyLoaderPlugin').tap(args => [{
  //     match (originalTag, { kebabTag, camelTag, path, component }) {
  //       if (kebabTag.startsWith('core-')) {
  //         return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
  //       }
  //     }
  //   }])
  // },
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
