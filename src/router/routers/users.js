import AdminLayout from "../../layouts/AdminLayout"

export default {
    path: "/users",
    component: AdminLayout,
    children: [{
            path: '/',
            name: 'Users',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/users/Users.vue')
        },
        {
            path: 'add',
            name: 'Add User',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/users/UserManager.vue')
        },
        {
            path: 'edit/:id',
            name: 'Edit User',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/users/UserManager.vue')
        },
        {
            path: 'detail/:id',
            name: 'Detail User',
            component: () =>
                import ( /* webpackChunkName: "users" */ '../../views/users/UserDetail.vue')
        },
    ]
}