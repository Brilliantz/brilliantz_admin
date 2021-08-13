<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="white"
          small
          icon
          v-bind="attrs"
          v-on="on"
          :disabled="disabled"
          @click="onClick"
      >
        <v-icon
            color="blue"
            class="ma-1"
        >
          mdi-eye
        </v-icon>
      </v-btn>
    </template>
    <span>Detail {{ description}}</span>
  </v-tooltip>

</template>

<script>
export default {
  name: "DetailButton",
  props: ['disabled', 'description'],
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>

</style>
