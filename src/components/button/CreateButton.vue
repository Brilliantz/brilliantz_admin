<template>
  <v-fab-transition>
    <div class="text-center d-flex align-center justify-space-around">
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue"
          fab
          large
          dark
          right
          class="btn-create"
          :disabled="disabled"
          @click="onClick"
          v-bind="attrs"
          v-on="on"
          style="position: fixed; top: 565px; right: 35px;"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <slot name="title">
        <span>Create {{description}}</span>
      </slot>
    </v-tooltip>
    </div>
  </v-fab-transition>
</template>

<script>
export default {
  name: "CreateButton",
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
