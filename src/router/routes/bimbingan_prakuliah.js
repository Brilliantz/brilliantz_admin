export default {
  path: 'bimbangan-prakuliah',
  component: () => import('@/layouts/admin/AdminLayout'),
  children: [
    {
      path: '/',
      name: 'Bimbingan Prakuliah',
      component: () => import('../../views/bimbingan_prakuliah/BimbinganPrakuliah')
    },
    {
      path: 'add',
      name: 'Add Bimbingan Prakuliah',
      component: () =>
        import ('../../views/bimbingan_prakuliah/BimbinganPrakuliahManager.vue')
    },
    {
      path: 'edit/:id',
      name: 'Edit Bimbingan Prakuliah',
      component: () =>
        import (  '../../views/bimbingan_prakuliah/BimbinganPrakuliahManager.vue')
    },
    {
      path: 'detail/:id',
      name: 'Detail Bimbingan Prakuliah',
      component: () =>
        import ( '../../views/bimbingan_prakuliah/BimbinganPrakuliahDetail.vue')
    },
  ]
}
