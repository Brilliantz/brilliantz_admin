/* eslint-disable */

module.exports = {
  //PUBLIC PATH FOR PRODUCTION
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
