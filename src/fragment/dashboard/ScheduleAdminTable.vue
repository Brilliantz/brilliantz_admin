<template>
  <div>
    <schedule-detail
        ref="scheduleDetail"></schedule-detail>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
      <base-material-card
          icon="mdi-clipboard-text"
          title="Final Project Schedule"
          class="px-5 py-3"
      >
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
        >
          <template v-slot:item.date="{item}">
            {{dateToCalender(item)}}
          </template>
          <template v-slot:item.action="{ item }">
            <detail-button
                @click="detailItem(item)"
                description="Final Project Schedule"
            ></detail-button>
          </template>
        </v-data-table>
      </base-material-card>

    </v-container>
  </div>
</template>

<script>
import headers from "@/config/table_rules/dashboard"
import DetailButton from "@/components/button/DetailButton";
import ScheduleDetail from "@/fragment/schedule/ScheduleDetail";
import { mapState } from "vuex"
import moment from "moment";
export default {
  name: "ScheduleAdminTable",
  components: {DetailButton, ScheduleDetail},
  data: () => ({
    headers,
    search: '',
  }),
  computed: {
    ...mapState('schedule',[
        'items'
    ])
  },
  methods: {
    detailItem(item){
      //TODO :: tolong ubahen
      this.$refs.scheduleDetail.open(Object.assign({}, item))
      //console.log(item)
    },
    dateToCalender(item){
      return moment(item.date).format('L')
    }

  }
}
</script>

<style scoped>

</style>
