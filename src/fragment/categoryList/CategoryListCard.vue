<template>
  <v-row
    class="mx-4"
  >
    <v-col
      sm="6"
      md="4"
      v-for="item in items"
      :key="item.id"
    >
      <v-card>
        <router-link :to="onLink(item)">
          <v-card-title class="bg-default pb-3 text--white justify-center">
            <span class="sub-category ">{{item.name}}</span>
          </v-card-title>
          <div class="py-4">
            <v-card-title class="justify-center black--text text-decoration-none">{{item.total}}</v-card-title>
          </div>
        </router-link>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CategoryListCard",
  computed: {
    ...mapState('category',['items']),
  },
  methods: {
    onLink(item) {
      return '/admin/category/' + item.slug
    },
  }
}
</script>

<style scoped>
.font-main-title{
  font-size: 2rem;
  font-weight: bold;
}
.bg-default{
  background: #00BFA5;
}
.sub-category{
  font-size: 1.25rem;
}
.text--white{
  color: white;
}
</style>
