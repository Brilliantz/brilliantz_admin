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

export default {
  name: "LoadingGlobal",
  computed: {
    loadingDialog() {
      return false
    }
    //TODO::bisa di custom
  }
}
</script>

<style scoped>

</style>
