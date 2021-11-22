import routes from './routes/index'

const options = {
  mode: 'history',
  // base:  process.env.NODE_ENV === 'production'
  //     ? '/project/brilliantz/'
  //     : '/',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '401',
      name: '401',
      meta: {
        auth: false
      },
      component: () => import('@/views/exception/401')
    },
    {
      path: '403',
      name: '403',
      meta: {
        auth: false
      },
      component: () => import('@/views/exception/403')
    },
    {
      path: '404',
      name: '404',
      meta: {
        auth: false
      },
      component: () => import('@/views/exception/404')
    },
    {
      path: '500',
      name: '500',
      meta: {
        auth: false
      },
      component: () => import('@/views/exception/404')
    },
    {
      path: 'login',
      name: 'Login',
      component: () => import('../views/Auth/Login')
    },
    {
      path: '/',
      redirect: '/users'
    },
    ...routes
  ],
}

export default options
