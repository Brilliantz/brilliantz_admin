<template>
  <v-app>
    <admin-dashboard-app-bar />

    <admin-dashboard-drawer />

    <admin-dashboard-view />

<!--    <dashboard-core-footer />-->

    <admin-dashboard-settings />
  </v-app>
</template>

<script>
  export default {
    name: 'AdminDashboardIndex',

    components: {
      AdminDashboardAppBar: () => import('./admin/AppBar'),
      AdminDashboardDrawer: () => import('./admin/Drawer'),
      AdminDashboardSettings: () => import('./admin/Settings'),
      AdminDashboardView: () => import('./admin/View'),
      // DashboardCoreFooter: () => import('./dashboard/core/Footer'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
