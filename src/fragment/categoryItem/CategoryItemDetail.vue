<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <v-card v-if="!loading" >
      <v-card-title>
        <span class="headline">Detail {{params}}</span>
      </v-card-title>
      <v-list
        v-if="detailItem"
        flat>
        <v-list-item>
          <v-list-item-icon>
            <v-icon large >mdi-tag</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle
              class="text-big"
            >Name :</v-list-item-subtitle>
            <v-list-item-title  v-text="detailItem.name" class="text-big"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon large >mdi-note-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle
              class="text-big"
            >Description :</v-list-item-subtitle>
            <v-list-item-title
              class="text-big"
              v-text="detailItem.description"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon large >mdi-card-account-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle
              class="text-big"
            >Contact :</v-list-item-subtitle>
            <v-list-item-title
              class="text-big"
              v-text="detailItem.contact"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
    <loading-card v-else></loading-card>
  </v-dialog>
</template>

<script>
import LoadingCard from "../../components/LoadingCard";
import {mapState} from 'vuex'
export default {
  name: "CategoryItemDetail",
  props: {
    params: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    dialog: false,
  }),
  components: {LoadingCard},
  computed: {
    ...mapState('categoryItem', ['detailItem', 'loading']),
  },
  methods: {
    open(item) {
      this.dialog = !!item
      this.$store.dispatch('categoryItem/getDetailItem', item.id)
    },
    close() {
      this.dialog = false
    },
  }
}
</script>

<style scoped>

</style>
