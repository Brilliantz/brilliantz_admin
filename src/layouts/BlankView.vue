<template>
  <page-toggle-transition :disabled="true">
    <router-view />
  </page-toggle-transition>
</template>

<script>
import PageToggleTransition from '../components/transition/PageToggleTransition';

export default {
  name: 'BlankView',
  components: {PageToggleTransition},
  computed: {
  }
}
</script>

<style scoped>

</style>
