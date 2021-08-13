<template>
  <v-btn
    class="white"
    small
    icon
    :disabled="disabled"
  >
    <v-icon
      class="mr-2"
      color="green"
      v-if="status"
    >
      mdi-toggle-switch
    </v-icon>
    <v-icon
      v-else
      class="mr-2"
      color="amber"
      @click="onClick"
    >
      mdi-toggle-switch-off-outline
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "DetailButton",
  props: ['disabled', 'status'],
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>

</style>