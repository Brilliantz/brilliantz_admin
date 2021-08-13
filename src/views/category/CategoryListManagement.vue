<template>
  <v-container
      id="regular-tables"
      tag="section"
  >
    <v-card
        class="mx-auto"
        elevation="0"
        color="transparent"
    >
      <v-card-title class="font-main-title py-4">Category</v-card-title>
      <v-card-title class="font-search-title py-4">Category Search :</v-card-title>
      <v-form
          ref="form"
          class="mx-4 my-4"
          lazy-validation
          @submit.prevent="onSearch"
      >
        <v-text-field
            v-on:change="onSearch"
            outlined
            label="Search"
            color="greenMint"
            append-icon="mdi-magnify"></v-text-field>
      </v-form>
      <category-list-card></category-list-card>
      <category-list-create ref="categoryListCreate"></category-list-create>
    </v-card>
    <create-button @click="createForm">
      <template v-slot:title>
        <span>Create Category</span>
      </template>
    </create-button>
  </v-container>
</template>

<script>
import _ from 'lodash'
import CreateButton from "../../components/button/CreateButton";
import CategoryListCard from "../../fragment/categoryList/CategoryListCard";
import CategoryListCreate from "../../fragment/categoryList/CategoryListCreate";

export default {
  name: "CategoryListManagement",
  components: {CreateButton, CategoryListCard,CategoryListCreate},
  methods: {
    onSearch: _.throttle(function (search){
      console.log(search)
    }, 1000),
    fetchAPI(){
      //this.$store.dispatch('something', { status: 'active'})
    },
    createForm(){
      this.$refs.categoryListCreate.open({})
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
