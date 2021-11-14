export default {
  path: 'ranking',
  component: () => import('@/layouts/admin/AdminLayout'),
  children: [
    {
      path: '/',
      name: 'Ranking',
      component: () => import('../../views/ranking/Ranking')
    }
  ]
}
