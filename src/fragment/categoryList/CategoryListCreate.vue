<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    @click:outside="close"
  >
    <loading-card v-if="loading"></loading-card>
    <v-card v-else>
      <v-card-title>
        <span class="headline">Create Category</span>
      </v-card-title>

      <v-card-text >
        <v-form
          ref="form"
        >
          <v-text-field
            label="Category Name"
            v-model="item.name"
            :error-messages="errors.name"
            outlined
            :rules="rules.required('Category Name')"
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
import rules from "../../config/validation/baseRules";
import LoadingCard from "../../components/LoadingCard";
import {mapState} from "vuex"

export default {
  name: "CategoryListCreate",
  data: () => ({
    dialog: false,
    item: {},
    rules
  }),
  components: {LoadingCard},
  computed: {
    ...mapState('category', ['loading']),
    ...mapState('notification', ['errors'])
  },
  methods: {
    fetchAPI() {
      console.log('halo')
    },
    open(item) {
      if (this.$refs.form)
        this.$refs.form.reset()
      this.item = item
      this.dialog = !!item
    },
    save () {
      if (this.$refs.form.validate()) {
        let promise = null

        promise = this.$store.dispatch('category/create', this.item)
        promise.then(() => {
          this.fetchAPI()
          this.close()
        })
      }
    },
    reset(){
      this.$refs.form.resetValidation();
    },

    close() {
      this.dialog = false
    },
  }
}
</script>

<style scoped>

</style>
