export default {
  path : "submisi",
  component: () => import('@/layouts/admin/AdminLayout'),
  children: [
    {
      path: '/',
      name: 'Submisi',
      component: () => import('../../views/submisi/Submisi')
    },
    {
      path: 'detail/:id',
      name: 'Detail Submisi',
      component: () => import ('../../views/submisi/SubmisiDetail')
    }
  ]
}
