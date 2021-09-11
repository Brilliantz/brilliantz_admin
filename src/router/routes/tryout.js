 export default {
   path: 'tryout',
   component: () => import('@/layouts/admin/AdminLayout'),
   children: [
     {
       path: '/',
       name: 'Tryout',
       component: () => import ('../../views/tryout/Tryout')
     },
     {
       path: 'add',
       name: 'Add Tryout',
       component: () =>
         import ( '../../views/tryout/TryoutManager')
     },
     {
       path: 'edit/:id',
       name: 'Edit Tryout',
       component: () => import ('../../views/tryout/TryoutManager')
     },
     {
       path: 'edit/:tryoutid/:subbidang/:no',
       name: 'Edit Subbidang',
       component: () => import ('../../views/tryout/SoalManager.vue')
     },
   ]
 }
