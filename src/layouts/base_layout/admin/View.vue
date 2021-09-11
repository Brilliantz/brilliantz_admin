App.vue
globalComponents.js
i18n.js
main.js<template>
  <v-main style="background-color: #f3f4f5">
    <router-view />
  </v-main>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: 'AdminDashboardView',
    computed:{
      ...mapState('account', ['user']),
    },
  }
</script>
