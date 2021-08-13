<template>
  <v-card >
    <v-card-title class="bg-default pb-3 text--white justify-center">
      <span class="headline">Latest Post Update</span>
    </v-card-title>
    <div class="py-4 px-4">
     <v-row>
       <v-col sm="12" md="8">
         <v-card-text>Category : 10</v-card-text>
         <v-card-text>Name : Oksigen Cahya</v-card-text>
         <v-card-text>Contact :  08121912412</v-card-text>
         <v-card-text>Address : JL.Keputih 21</v-card-text>
       </v-col>
       <v-col  sm="12" md="4">
         <div class="bg-default fill-height rounded d-flex flex-column justify-center align-center">
           <v-card-title class="justify-center white--text">
             <v-icon size="60" color="white">mdi-calendar-range</v-icon>
           </v-card-title>
           <v-card-title class="justify-center white--text">
             19:30:27
           </v-card-title>
           <v-card-title class="justify-center white--text">
             27/7/2021
           </v-card-title>
         </div>
       </v-col>
     </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "DashboardLatestPost"
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
