import AdminLayout from "../../layouts/AdminLayout"

export default {
    path: "/bimbingan-prakuliah",
    component: AdminLayout,
    children: [{
            path: '/',
            name: 'Bimbingan Prakuliah',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/bimbingan_prakuliah/BimbinganPrakuliah.vue')
        },
        {
            path: 'add',
            name: 'Add Bimbingan Prakuliah',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/bimbingan_prakuliah/BimbinganPrakuliahManager.vue')
        },
        {
            path: 'edit/:id',
            name: 'Edit Bimbingan Prakuliah',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/bimbingan_prakuliah/BimbinganPrakuliahManager.vue')
        },
        {
            path: 'detail/:id',
            name: 'Detail Bimbingan Prakuliah',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/bimbingan_prakuliah/BimbinganPrakuliahDetail.vue')
        },
    ]
}