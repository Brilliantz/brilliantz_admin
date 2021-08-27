import AdminLayout from "../../layouts/AdminLayout"

export default {
    path: "/transaksi",
    component: AdminLayout,
    children: [{
        path: '/',
        name: 'Transaksi',
        component: () =>
            import ( /* webpackChunkName: "users" */ '../../views/transaksi/Transaksi.vue')
    }, ]
}