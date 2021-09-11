<template>
  <v-app>
    <loading-global></loading-global>
    <snackbar-notif></snackbar-notif>
    <v-main class="my-grey">
      <router-view />
    </v-main>
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script>
  import SnackbarNotif from "@/components/SnackbarNotif";
  import LoadingGlobal from "@/components/LoadingGlobal";

  export default {
    name: 'App',
    components: {SnackbarNotif, LoadingGlobal},
  }
</script>

<style>
.my-breadcrumb a {
  color: #4a47d6 !important;
}

.my-purple {
  background-color: #4a47d6 !important;
  color: white !important;
}

.my-purple-text {
  background-color: white !important;
  color: #4a47d6 !important;
}

.my-grey {
  background-color: #F2F2F2 !important;
}

.maximize-width {
  width: 100% !important;
}
</style>
