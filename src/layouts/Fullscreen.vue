<template>
  <div>
    <v-main>
      <v-container fill-height fluid class="wrap">
        <v-row justify="center">
          <v-col cols="11" md="6" lg="4">
              <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
  },
  computed: {},
  watch: {}
};
</script>