import AdminLayout from "../../layouts/AdminLayout"

export default {
    path: "/ranking",
    component: AdminLayout,
    children: [{
        path: '/',
        name: 'Ranking',
        component: () =>
            import ( /* webpackChunkName: "users" */ '../../views/ranking/Ranking.vue')
    }, ]
}