'use strict'

import axios from 'axios'
import detectCookieExpired from "./utils/interceptors/response/detectCookieExpired";
import addAuthHeader from "./utils/interceptors/request/addAuthHeader";
import detectUnauthorized from "./utils/interceptors/response/detectUnauthorized";

let customConfig = {
  baseURL: process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_API_BASE_URL || ''
      : process.env.VUE_APP_API_BASE_URL_DEV || '',
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
}

const _axios = axios.create(customConfig)

_axios.interceptors.request.use(addAuthHeader)
_axios.interceptors.response.use(_ => _, detectCookieExpired)
_axios.interceptors.response.use(_ => _, detectUnauthorized)

export default class AxiosPlugin extends Plugin {
  static install(Vue) {
    Vue.axios = _axios

    if (process.env.NODE_ENV !== 'production') {
      window.$axios = _axios
    }

    Object.defineProperties(Vue.prototype, {
      axios: {
        get() {
          return _axios
        }
      },
      $axios: {
        get() {
          return _axios
        }
      }
    })
  }
}
