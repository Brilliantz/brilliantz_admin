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
            color="red"
            class="ma-1"
        >
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <span>Delete {{ description}}</span>
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
