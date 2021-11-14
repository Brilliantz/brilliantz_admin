import Fullscreen from './layouts/base_layout/Fullscreen.vue';
import Snotify, {SnotifyPosition} from 'vue-snotify';
import Plugins from "@/plugins";
import './plugins/base'
import VueQuillEditor from 'vue-quill-editor'


import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

/**
 * Custom Components
 * Init here so it can be accessed trough all components
 */
const snotifyOption = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

const globalComponent = {
  install: function (Vue) {
    Vue.use(Plugins)
    Vue.use(Snotify, snotifyOption);
    // Vue.use(abilitiesPlugin, store.getters['account/ability'])
    Vue.use(VueQuillEditor, /* { default global options } */)
    //Vue.component('vue-quill-editor', VueQuillEditor)
    Vue.component('fullscreen-layout', Fullscreen);
  }
}

export default globalComponent
