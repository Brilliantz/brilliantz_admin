<template>
  <v-app>
    <loading-global></loading-global>
    <snackbar-notif></snackbar-notif>
    <router-view />
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script>
  import SnackbarNotif from "@/components/SnackbarNotif";
  import LoadingGlobal from "@/components/LoadingGlobal";

  export default {
    name: 'App',
    components: {SnackbarNotif, LoadingGlobal},
    mounted() {
      this.$store.dispatch('onFetchRoutesConfig')
    },
    /**watch: {
      $route: {
        handler() {
          if (this.$store.getters['auth/authenticated']
            && (Object.prototype.hasOwnProperty.call(this.$route.meta, 'auth') ? this.$route.meta.auth : true))
            this.$store.dispatch('account/fetchPermission')
        },
        immediate: true
      }
    }**/
  }
</script>
