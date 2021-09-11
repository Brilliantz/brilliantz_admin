import Fullscreen from './layouts/base_layout/Fullscreen.vue';
import Snotify, {SnotifyPosition} from 'vue-snotify';
import Plugins from "@/plugins";
import './plugins/base'


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
    Vue.component('fullscreen-layout', Fullscreen);
  }
}

export default globalComponent
