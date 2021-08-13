import Vue from 'vue'
import App from './App.vue'
import {loadGuards} from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import { STATUS, MUTATIONS } from './store/baseTypes'
//import Cookie from 'js-cookie'
import globalComponents from "@/globalComponents"
import 'vue-snotify/styles/material.css';
const router = loadGuards()

Vue.config.productionTip = false

Vue.use(globalComponents)

new Vue({
  router,
  store,
  vuetify,
  i18n,

  created() {
    //store.commit('csrf/' + MUTATIONS.CHANGE_STATUS, STATUS.IDLE)
    store.commit('auth/' + MUTATIONS.CHANGE_STATUS, STATUS.IDLE)
    // if (!Cookie.get('XSRF-TOKEN')) {
    //   store.dispatch('csrf/fetchCsrf')
    // }
  },
  render: h => h(App),
}).$mount('#app')
