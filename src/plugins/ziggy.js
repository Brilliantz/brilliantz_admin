import route from "ziggy-js";
import store from "@/store";

export default class Ziggy extends Plugin {
  static install(Vue) {
    const api = function (name, params = {}) {
      return name !== null && name !== undefined
          // ? route('api.' + name, params, undefined, store.getters['account/routesConfig'])
          ? route(name, params, undefined, store.getters['routesConfig'])
          : null
    }
    Vue.api = api
    Vue.mixin({
      methods: {
        api: (name, params) => api(name, params)
      }
    })
  }
}
