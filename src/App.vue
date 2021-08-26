<template>
  <v-app>
    <v-main class="my-grey">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    }
  }
}
</script>

<style>
  .my-breadcrumb a {
    color: #4a47d6 !important;
  }

  .my-purple {
    background-color: #4a47d6 !important;
    color: white !important;
  }

  .my-grey {
  background-color: #F2F2F2 !important;
 }

 .maximize-width {
   width: 100% !important;
 }
</style>
