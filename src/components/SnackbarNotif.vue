<template>
  <v-snackbar
    :timeout="2500"
    v-model="snackbar.drawer"
    absolute
    bottom
    :color="snackbar.status"
    right
  >
    <h5>{{ snackbar.status === 'success' ? "SUCCESS" : "ERROR" }}</h5>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SnackbarNotif",
  computed: {
    ...mapState('notification', ['snackbar'])
  }
}
</script>

<style scoped>

</style>
