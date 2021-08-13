<template>
  <v-btn
    class="white"
    small
    icon
    :disabled="disabled"
    @click="onClick"
  >
    <v-icon
      color="red"
      class="ma-1"
    >
      mdi-stop-circle-outline
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "DetailButton",
  props: ['disabled'],
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>

</style>