import AdminLayout from "../../layouts/AdminLayout"

export default {
    path: "/webinar",
    component: AdminLayout,
    children: [{
            path: '/',
            name: 'Webinar',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/webinar/Webinar.vue')
        },
        {
            path: 'add',
            name: 'Add Webinar',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/webinar/WebinarManager.vue')
        },
        {
            path: 'edit/:id',
            name: 'Edit Webinar',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/webinar/WebinarManager.vue')
        },
        {
            path: 'detail/:id',
            name: 'Detail Webinar',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/webinar/WebinarDetail.vue')
        },
    ]
}