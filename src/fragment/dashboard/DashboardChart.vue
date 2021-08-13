<template>
  <v-card >
    <v-card-title class="bg-default pb-3 text--white justify-center">
      <span class="headline">Category Peek Chart</span>
    </v-card-title>
    <div class="py-4">
      <column-chart :data="categoryData"></column-chart>
    </div>
  </v-card>
</template>

<script>
import columnChart from "../../components/chart/HighChart";
export default {
  name: "DashboardChart",
  components: {columnChart},
  data: () => ({
    categoryData: [
      ['Ambulan', 24],
      ['Isolasi Mandirii', 20],
      ['Donor Plasma', 14],
      ['isolasi Mandiri Berbayar', 13],
      ['Rumah Sakit', 19],
      ['Oksigen', 13],
    ],
  })
}
</script>

<style scoped>
.bg-default{
  background: #00BFA5;
}
.text--white{
  color: white;
}
</style>
