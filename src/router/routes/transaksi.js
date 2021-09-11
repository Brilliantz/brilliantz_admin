export default {
  path: 'transaksi',
  component: () => import('@/layouts/admin/AdminLayout'),
  children : [
    {
      path: '/',
      name: 'Transaksi',
      component: () => import('../../views/transaksi/Transaksi')
    }
  ]
}
