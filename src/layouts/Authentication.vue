<template>
  <v-container fill-height fluid class="wrap" style="background-color: #f3f4f5">
    <v-row align="center" justify="center" >
      <v-col
          cols="11"
          md="4"
          lg="3"
      >
        <v-card class="rounded-0">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3">
              InfoCov
            </h1>
          </v-card-title>

          <v-tabs
              v-model="tab"
              background-color="transparent"
              @change="changeRouteTab"
              color="basil"
              grow
          >
            <v-tab
                v-for="item in items"
                :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item"
            >
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Authentication",
  beforeMount() {
    this.tab = this.$route.name === 'login' ? 0 : 1
  },
  data () {
    return {
      tab: null,
      items: [
        'login'
      ],
    }
  },
  methods: {
    changeRouteTab(index) {
      this.$router.push({name: this.items[index]})
    }
  }
}
</script>


<style scoped>

</style>
