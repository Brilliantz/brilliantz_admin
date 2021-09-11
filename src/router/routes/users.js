export default {
  path: 'users',
  component: () => import('@/layouts/admin/AdminLayout'),
  children: [
    {
      path: '/',
      name: 'Users',
      component: () => import ('../../views/users/Users')
    },
    {
      path: 'add',
      name: 'Add User',
      component: () => import ('../../views/users/UserManager')
    },
    {
      path: 'edit/:id',
      name: 'Edit User',
      component: () => import ('../../views/users/UserManager')
    },
    {
      path: 'detail/:id',
      name: 'Detail User',
      component: () => import ('../../views/users/UserDetail')
    },
  ]
}
