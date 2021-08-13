import Vue from 'vue'
import Router from 'vue-router'
import guards from '@/router/guards'
Vue.use(Router)

function routeChecker(routes){
  routes.forEach(route => {
    const {path} = route
    if (!path.startsWith('/') && path !== '*') {
      route.path = '/' + path
    }
  })
}


/**
 * @returns {void}
 */
function initRouter() {
  const options = require('./config').default
  routeChecker(options.routes)
  return new Router(options)
}

function loadGuards() {
  const {beforeEach, afterEach} = guards
  const router = initRouter()
  beforeEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.beforeEach((to, from, next) => guard(to, from, next))
    }
  })
  afterEach.forEach(guard => {
    if (guard && typeof guard === 'function') {
      router.afterEach((to, from) => guard(to, from))
    }
  })

  return router
}

export {loadGuards}
