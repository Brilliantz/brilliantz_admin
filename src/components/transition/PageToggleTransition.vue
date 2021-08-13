<template>
  <transition
    v-if="!disabled"
  >
    <slot></slot>
  </transition>
  <div v-else><slot></slot></div>
</template>

<script>
export default {
  name: "PageToggleTransition",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>