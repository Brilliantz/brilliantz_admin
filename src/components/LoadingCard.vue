<template>
  <v-card
    color="white"
  >
    <v-card-text
      class="text-center py-10"
    >
      <v-progress-circular
        indeterminate
        color="blue"
        :size="80"
        :width="8"
      ></v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "LoadingCard"
}
</script>

<style scoped>

</style>
