export default {
  path: 'webinar',
  component: () => import('@/layouts/admin/AdminLayout'),
  children: [
    {
      path: '/',
      name: 'Webinar',
      component: () => import ('../../views/webinar/Webinar')
    },
    {
      path: 'add',
      name: 'Add Webinar',
      component: () => import ('../../views/webinar/WebinarManager.vue')
    },
    {
      path: 'edit/:id',
      name: 'Edit Webinar',
      component: () => import ('../../views/webinar/WebinarManager.vue')
    },
    {
      path: 'detail/:id',
      name: 'Detail Webinar',
      component: () => import ('../../views/webinar/WebinarDetail.vue')
    },
  ]
}
