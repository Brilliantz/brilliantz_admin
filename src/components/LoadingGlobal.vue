<template>
  <v-dialog
    v-model="loadingDialog"
    hide-overlay
    persistent
    width="300"
  >
    <v-card
      color="white"
    >
      <v-card-text
        class="text-center"
      >
        <p class="font-weight-medium">Please stand by</p>
        <v-progress-circular
          indeterminate
          color="blue"
          class="mb-0"
          :size="80"
          :width="8"
        ></v-progress-circular>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "LoadingGlobal",
  computed: {
    ...mapState('auth', ['status']),
    loadingDialog() {
      return this.status !== 'idle'
    }
  }
}
</script>

<style scoped>

</style>