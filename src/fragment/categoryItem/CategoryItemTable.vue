<template>
  <v-card elevation="0">
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          v-on:change="searchItem"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
        :headers="headers"
        :items="items.data"
        :loading="loading"
        :search="search"
        :page.sync="filter.page"
        :items-per-page="filter.per_page"
        :server-items-length="filter.total"
        :footer-props="{
          'items-per-page-options': [5,10,20,100]
        }"
        @update:page="onPaginateClick"
        @update:items-per-page="updateItemsPerPage"
        @update:sort-by="onSortBy"
        @update:sort-desc="onSortDesc"
        item-key="id"
    >
      <template v-slot:item.action="{ item }">
        <detail-button
            @click="detailItem(item)"
            :description="params"
        ></detail-button>
        <edit-button
            @click="editItem(item)"
            :description="params"
        ></edit-button>
        <delete-button
            @click="deleteItem(item)"
            :description="params"
        ></delete-button>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import headers from "../../config/table_rules/categoryItem"
import DetailButton from "@/components/button/DetailButton";
import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';
import paginationMixins from "../../mixins/paginationMixins";
import {mapGetters, mapMutations, mapState} from "vuex"

export default {
  name: "CategoryItemTable",
  components: {DetailButton, EditButton, DeleteButton},
  mixins: [paginationMixins],
  props: {
    params : {
      type: String,
      default: ''
    }
  },
  mounted() {
    // this.fetchAPI()
  },
  data: () => ({
    headers,
    search: '',
  }),
  computed: {
    ...mapState('categoryItem',[
      'items',
      'loading',
    ]),
    ...mapGetters('categoryItem',['filter'])
  },
  methods: {
    ...mapMutations('categoryItem',['setFilter']),
    fetchAPI(){
      this.$store.dispatch('categoryItem/getItems')
    },
    searchItem(query){
      let search = query
      search === '' ? search = null : search
      this.setFilter({
        ...this.filter,
        search : search
      })
      this.fetchAPI()
    },
    onSortBy(query) {
      this.setFilter({
        ...this.filter,
        sortBy : query,
      })
      this.fetchAPI()
    },
    onSortDesc(query){
      let desc = query[0] === false ? 0 : 1
      this.setFilter({
        ...this.filter,
        desc : desc,
      })
      this.fetchAPI()
    },
    detailItem(item){
      this.$emit('detailForm', Object.assign({}, item))
    },
    editItem(item){
      this.$emit('editForm', Object.assign({}, item))
    },
    deleteItem(item){
      this.$store.dispatch('onNotificationConfirm',
          {
            description: `Are you sure want to delete this category post ? `, title: "Delete", button: [
              {
                text: 'Yes', action: (toast) => {
                  this.$store.dispatch('categoryItem/delete', item.id)
                      .then(() => {
                        this.fetchAPI()
                      })
                  this.$snotify.remove(toast.id)
                }, bold: false
              },
              {text: 'No', action: (toast) => this.$snotify.remove(toast.id)},
            ]
          })
    },
  }
}
</script>

<style scoped>

</style>
