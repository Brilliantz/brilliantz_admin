import AdminLayout from "../../layouts/AdminLayout"

export default {
    path: "/tryout",
    component: AdminLayout,
    children: [{
            path: '/',
            name: 'Tryout',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/tryout/Tryout.vue')
        },
        {
            path: 'add',
            name: 'Add Tryout',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/tryout/TryoutManager.vue')
        },
        {
            path: 'edit/:id',
            name: 'Edit Tryout',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/tryout/TryoutManager.vue')
        },
        {
            path: 'edit/:tryoutid/:subbidang/:no',
            name: 'Edit Subbidang',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/tryout/SoalManager.vue')
        },
    ]
}