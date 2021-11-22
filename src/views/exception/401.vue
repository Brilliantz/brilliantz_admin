<template>
  <div>
    <exception-page home-route="/login" :style="`min-height: ${minHeight}`" type="401" />
  </div>
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'
export default {
  name: "401",
  components: {ExceptionPage},
  computed: {
    minHeight() {
      return '100vh'
    }
  }
}
</script>

<style scoped>

</style>
