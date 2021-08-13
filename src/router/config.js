import routes from './routes/index'

const options = {
  mode: 'history',
  base:  process.env.NODE_ENV === 'production'
      ? '/project/brilliantz/'
      : '/',
  routes: [
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
      path: '/',
      redirect: { name: 'dashboard'},
      meta: { auth: false}
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout'),
      meta: { auth: false },
      redirect: {name: 'dashboard'},
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: {
            icon: 'dashboard',
          },
          component: () => import('@/views/dashboard/Dashboard'),
        },
        ...routes
      ],
    },
  ],
}

export default options
