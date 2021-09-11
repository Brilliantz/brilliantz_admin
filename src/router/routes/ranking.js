export default {
  path: 'rangking',
  component: () => import('@/layouts/admin/AdminLayout'),
  children: [
    {
      path: '/',
      name: 'Rangking',
      component: () => import('../../views/ranking/Ranking')
    }
  ]
}
