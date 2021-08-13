<template>
  <div>
  <exception-page home-route="/logout" :style="`min-height: ${minHeight}`" type="403" />
  </div>
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'
export default {
  name: 'Exp403',
  components: {ExceptionPage},
  computed: {
    minHeight() {
      return '100vh'
    }
  }
}
</script>

<style scoped >
</style>
