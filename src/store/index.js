import Vue from "vue";
import Vuex from 'vuex'
import modules from './modules'
import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    routesConfig: {}
  },
  plugins: [
    createPersistedState({key: 'BrilliantzState', storage: sessionStorage}),
    ...(process.env.NODE_ENV !== 'production') ? [createLogger()] : []
  ],
  modules,
  getters :{
    routesConfig: state => {
      if (!state.routesConfig) {
        try {
          const routesConfig = localStorage.getItem(process.env.VUE_APP_ROUTES_KEY)
          state.routesConfig = JSON.parse(routesConfig)
          state.routesConfig = state.routesConfig ? state.routesConfig : {}
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.routesConfig
    }
  },
  mutations: {
    ...vuexfireMutations,
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig
    },
  },
  actions: {
    // Global Notification
    onNotificationError({commit}, error) {
      if (error?.response?.statusText) {
        commit('notification/setSnackbar', {
          message: error.response.data.message,
          status: "danger",
          drawer: true
        })
      }
    },
    onNotificationSuccess({commit}, description) {
      commit('notification/setSnackbar', {
        message: description,
        status: "success",
        drawer: true
      })
    },
    onNotificationWarning(store, description) {
      this._vm.$snotify.warning(
        description || 'You don\'t have permission to do that',
        'Warning'
      )
    },
    onNotificationConfirm(store, {description, title, button}) {
      if (!button) {
        button = [
          {text: 'Yes', action: () => true, bold: false},
          {text: 'No', action: (toast) => this._vm.$snotify.remove(toast.id)},
        ]
      }
      return this._vm.$snotify.confirm(
        description, title, {
          closeOnClick: true,
          pauseOnHover: true,
          buttons: button
        }
      )
    }
  }
})

if (process.env.NODE_ENV !== 'production') {
  window.$store = store
}

export default store
