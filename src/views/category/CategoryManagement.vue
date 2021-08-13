<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
      class="mb-6 pb-6"
  >
    <base-material-card
      :icon="this.$route.meta.icon || 'mdi-clipboard-text'"
      :title="this.$route.params.category"
      class="px-5 py-5"
    >
      <category-item-detail
        ref="categoryItemDetail"
        :params="this.$route.params.category"></category-item-detail>
      <category-item-form
        ref="categoryItemForm"
        :params="this.$route.params.category"></category-item-form>
      <category-item-table
          :params="this.$route.params.category"
          @editForm="editForm"
          @detailForm="detailForm"
      ></category-item-table>
      <create-button @click="createForm">
        <template v-slot:title>
          <span>Create {{$route.params.category}}</span>
        </template>
      </create-button>
    </base-material-card>
  </v-container>
</template>

<script>
import CreateButton from "../../components/button/CreateButton";
import CategoryItemTable from "../../fragment/categoryItem/CategoryItemTable";
import CategoryItemForm from "../../fragment/categoryItem/CategoryItemForm";
import CategoryItemDetail from "../../fragment/categoryItem/CategoryItemDetail";

export default {
  name: "CategoryManagement",
  components: {CreateButton, CategoryItemTable, CategoryItemForm, CategoryItemDetail},
  methods: {
    createForm(){
      this.$refs.categoryItemForm.open(null, false)
    },
    detailForm(item){
      this.$refs.categoryItemDetail.open(item.id)
    },
    editForm(item){
      this.$refs.categoryItemForm.open(item.id, true)
    },
  }
}
</script>

<style scoped>

</style>
