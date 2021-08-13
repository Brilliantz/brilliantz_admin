<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    class="bg-gray"
  >
    <v-row>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="greenMint"
          icon="mdi-file-plus"
          title="Post"
          :value="post.total"
          sub-icon="mdi-clock"
          sub-text="Total Post"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="blueShade"
          icon="mdi-account"
          title="Category"
          :value="category.total"
          sub-icon="mdi-tag"
          sub-text="Total Category"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="4"
      >
        <base-material-stats-card
          color="warning"
          icon="mdi-comment-text"
          title="Comment"
          :value="comment.total"
          sub-icon="mdi-calendar"
          sub-text="Total Comment"
        />
      </v-col>

      <v-col
      cols = "12"
      md = "12"
      >
        <dashboard-chart></dashboard-chart>
      </v-col>

      <v-col
          cols="12"
          md="12"
      >
        <dashboard-latest-post></dashboard-latest-post>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import DashboardLatestPost from "../../fragment/dashboard/DashboardLatestPost";
  import DashboardChart from "../../fragment/dashboard/DashboardChart";

  export default {
    name: 'DashboardDashboard',

    components: {DashboardLatestPost, DashboardChart},
    data () {
      return {
        post: {
          total : "20"
        },
        category: {
          total : "12"
        },
        comment : {
          total : "10"
        }
      }
    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
