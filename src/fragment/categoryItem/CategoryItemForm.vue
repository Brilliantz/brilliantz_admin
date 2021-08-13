<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    @click:outside="close"
  >
    <loading-card v-if="loading"></loading-card>
    <v-card v-else>
      <v-card-title>
        <span class="headline">{{isEdit ? 'Edit' : 'Create'}} {{params}}</span>
      </v-card-title>

      <v-card-text >
        <v-form
          ref="form"
        >
          <v-text-field
            :label="params + ' name'"
            v-model="item.name"
            :error-messages="errors.name"
            outlined
            :rules="rules.required(`${params} Name`)"
          />
          <v-text-field
            :label="params + ' Description'"
            v-model="item.description"
            :error-messages="errors.description"
            outlined
            :rules="rules.required(`${params} Description`)"
          />
          <v-text-field
            :label="params + ' Contact'"
            v-model="item.contact"
            :error-messages="errors.contact"
            outlined
            :rules="rules.required(`${params} Contact`)"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import baseRules from "../../config/validation/baseRules";
import LoadingCard from "../../components/LoadingCard";
import {mapState} from "vuex"

export default {
  name: "CategoryItemForm",
  props: {
     params: {
       type: String,
       default: ''
     }
  },
  data: () => ({
    dialog: false,
    valid: true,
    item: {
      name: null,
      description: null,
    },
    isEdit: null,
    rules: baseRules
  }),
  components: {LoadingCard},
  computed: {
    ...mapState('categoryItem', ['detailItem', 'loading']),
    ...mapState('notification', ['errors']),
  },
  methods: {
    fetchAPI() {
      return this.$store.dispatch('categoryItem/getItems', { status: 'active'})
    },

    open(itemId, isEdit){
      this.dialog = true
      this.isEdit = isEdit
      if (isEdit && itemId) {
        this.$store.dispatch('categoryItem/getDetailItem', itemId).then(() => {
          this.item = this.detailItem
        })
      } else {
        this.item = {
          name: null,
          description: null,
          contact: null
        }
      }
    },

    createItem(){
      const data = {
        name: this.item.name,
        description: this.item.description,
      }

      return this.$store.dispatch('categoryItem/create', data)
    },

    editItem(){
      const data = {
        name: this.detailItem.name,
        description: this.detailItem.description,
        contact: this.detailItem.contact,
      }

      return this.$store.dispatch('categoryItem/update', {
        data,
        categoryId: this.detailItem.id
      })
    },

    save () {
      if (this.$refs.form.validate()) {
        (this.isEdit ?
          this.editItem() :
          this.createItem())
          .then(() => {
            this.fetchAPI()
            this.close()
          })
      }
    },

    close() {
      this.isEdit = null
      this.dialog = false
    },
  }
}
</script>

<style scoped>

</style>
