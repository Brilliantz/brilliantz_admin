import AdminLayout from "../../layouts/AdminLayout"

export default {
    path: "/submisi",
    component: AdminLayout,
    children: [{
            path: '/',
            name: 'Submisi',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/submisi/Submisi.vue')
        },
        {
            path: 'detail/:id',
            name: 'Detail Submisi',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/submisi/SubmisiDetail.vue')
        },
    ]
}