import NProgress from 'nprogress/nprogress'
//import store from '@/store'
//import firebase from "../firebase/firebase";

//const { getters } = store
//const defaultRedirect = {name: 'dashboard'}

NProgress.configure({ showSpinner: true })

/**
 * @param to
 * @param from
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

// const firebaseLoginCheck = (to, from, next) => {
//   if (to.matched.some(record => record.meta.auth)) {
//     if (firebase.auth().currentUser) {
//       next();
//     } else {
//       next({
//         path: '/401',
//       });
//     }
//   } else {
//     next();
//   }
// }

const checkRouteExist = (to, from, next) => {
  if (!to.matched.length) {
    next({name: '404'})
  }
  next()
}

/**
 * @param to
 * @param from
 * @param next
 */

const progressDone = () => {
  // finish progress bar
  NProgress.done()
}

export default {
  beforeEach: [progressStart, checkRouteExist],
  afterEach: [progressDone]
}
