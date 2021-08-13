<template>
  <v-carousel hide-delimiters v-model="model">
    <v-carousel-item
        v-for="(item, i) in room"
        :key="`${i} Random Key`"
    >
      <v-sheet
          color="blueShade"
          height="100%"
          tile
      >
        <div class="fill-height d-flex justify-center align-center">
          <v-card
              height="80%"
              width="100%"
              class="mx-auto"
              max-width="90%"
              color="transparent"
              elevation="0"
          >
            <v-row class="fill-height">
              <v-col
                  class="fill-height"
                  sm="12"
                  lg="4"
              >
                <div class="d-flex flex-column align-center fill-height">
                  <v-card-title class="text-h1 room-title-height">
                    Room :
                  </v-card-title>

                  <v-card-title class="text-h1 room-text-height">12</v-card-title>
                </div>
              </v-col>

              <v-divider
                  vertical
                  class="divider-vertical-scale"
              ></v-divider>

              <v-col
                  sm="12"
                  lg="7"
                  class="px-2 py-0"
              >
                <div class="d-flex flex-column flex-wrap">
                  <v-col
                      cols="12"
                      class="pb-8"
                  >
                    <v-card-title class="text-h1 room-title-height">
                      Bidang Keahlian :
                    </v-card-title>

                    <v-sheet
                        class="px-3"
                        color="transparent"
                    >
                      <v-chip-group
                          mandatory
                      >
                        <v-chip
                            v-for="(keahlianRoom) in item.bidangKeahlian"
                            :key="`${keahlianRoom.id} KeyID `"
                            outlined
                            color="white"
                            class="px-6 py-4"
                        >
                          <p class="text-h3 mb-0"> {{ keahlianRoom.name  }}</p>
                        </v-chip>
                      </v-chip-group>
                    </v-sheet>
                  </v-col>
                </div>
                <v-divider></v-divider>
                <div class="d-flex flex-column flex-wrap">
                  <v-col
                      cols="12"
                  >
                    <v-card-title class="text-h1 pt-2 pb-4">
                      Dosen :
                    </v-card-title>

                    <v-sheet
                        class="px-3"
                        color="transparent"
                    >
                      <v-chip-group
                          mandatory
                      >
                        <v-chip
                            outlined
                            color="white"
                             class="px-6 py-4"
                        >
                          <p class="text-h4 mb-0"> {{ item.dosenPembimbing1 }}</p>
                        </v-chip>
                        <v-chip
                            outlined
                            color="white"
                             class="px-6 py-4"
                        >
                          <p class="text-h4 mb-0"> {{ item.dosenPembimbing2 }}</p>
                        </v-chip>
                        <v-chip
                            outlined
                            color="white"
                             class="px-6 py-4"
                        >
                          <p class="text-h4 mb-0"> {{ item.moderator }}</p>
                        </v-chip>
                        <v-chip
                            outlined
                            color="white"
                             class="px-6 py-4"
                        >
                          <p class="text-h4 mb-0"> {{ item.penguji1 }}</p>
                        </v-chip>
                        <v-chip
                            outlined
                            color="white"
                             class="px-6 py-4"
                        >
                          <p class="text-h4 mb-0"> {{ item.penguji2 }}</p>
                        </v-chip>
                        <v-chip
                            outlined
                            color="white"
                             class="px-6 py-4"
                        >
                          <p class="text-h4 mb-0"> {{ item.penguji3 }}</p>
                        </v-chip>
                      </v-chip-group>
                    </v-sheet>
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <!-- </v-row> -->
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "DashboardCarousel",
  data: () => ({
    room: [
      {
        id: 1,
        roomName : 8,
        bidangKeahlian : [
            {id: 1, name : "Networking" },
            {id: 2, name : 'IOT'},
            {id: 3, name : 'Website'}
        ] ,
        dosenPembimbing1: 'arief',
        dosenPembimbing2 : 'ifhan',
        moderator : 'yoshi',
        penguji1: 'ardian',
        penguji2: 'dani',
        penguji3 : 'farrel'
      },
      {
        id: 2,
        roomName : 7,
        bidangKeahlian : [
          {id: 1, name : "Networking" },
          {id: 2, name : 'IOT'},
          {id: 3, name : 'Website'}
        ],
        dosenPembimbing1: 'arief',
        dosenPembimbing2 : 'ifhan',
        moderator : 'yoshi',
        penguji1: 'ardian',
        penguji2: 'dani',
        penguji3 : 'farrel'
      }
    ],
    model: 0,
  })
}
</script>

<style scoped>
 .room-value-carousel{
   height: 80%;
 }
 .room-title-height{
   padding-bottom: 2.5rem;
   padding-top: 2.5rem;
 }
 .room-text-height{
   height: 50%;
 }
 .divider-vertical-scale{
   min-height: 90% !important;
   max-height: 90% !important;
   margin: auto 0 auto 0;
 }
</style>
