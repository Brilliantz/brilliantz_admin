<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="white"
          small
          icon
          v-on="on"
          v-bind="attrs"
          :disabled="disabled"
          @click="onClick"
      >
        <v-icon
            color="orange"
            class="ma-1"
        >
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
    <span>Edit {{ description}}</span>
  </v-tooltip>

</template>

<script>
export default {
  name: "EditButton",
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
