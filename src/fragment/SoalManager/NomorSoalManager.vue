<template>
  <v-col
    lg="4"
    sm="12"
  >
    <v-card>
      <v-container fluid>
        <v-row
          class="pt-3 px-6">
          <v-col cols="12">
            <p class="text-grey">Soal nomor {{nomor_soal}}</p>
            <v-row
              justify="space-around"
              class="pt-3 px-6">
              <v-col
                lg="3"
                sm="4"
                v-for="(i, count) in total_soal"
                :key="i"
              >

                <div class="d-flex justify-center">
                  <v-btn
                    v-if="nomor_soal-1 === count"
                    class="px-0 py-0 my-purple"
                    fab
                    dark
                    small
                  >
                    {{count + 1}}
                  </v-btn>

                  <v-btn
                    v-else
                    @click="change_soal(count+1)"
                    class='px-0 py-0 mx-0'
                    color="white"
                    elevation="0"
                    fab
                    small
                  >
                    {{count + 1}}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row
              class="my-2"
              justify="content-between"
            >
              <v-col
                sm="6"
                md="6"
              >
                <div class="d-flex justify-center">
                  <v-btn
                    v-if="nomor_soal===1"
                    text
                    disabled
                    outlined
                  >Sebelumnya</v-btn>
                  <v-btn
                    v-else
                    text
                    class="my-purple"
                    @click="soal_sebelumnya"
                  >Sebelumnya</v-btn>
                </div>

              </v-col>
              <v-col
                sm="6"
                md="6"
              >
                <div class="d-flex justify-center">
                  <v-btn
                    v-if="nomor_soal===20"
                    text
                    disabled
                    outlined
                    @click="soal_selanjutnya"
                  >Selanjutnya</v-btn>
                  <v-btn
                    v-else
                    text
                    class="my-purple"
                    :disabled="nomor_soal === 20"
                    @click="soal_selanjutnya"
                  >Selanjutnya</v-btn>
                </div>

              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "NomorSoalManager",
  data: () => ({
    total_soal: 20
  }),
  props:{
      nomor_soal: {
        type: Number,
        required: true
      }
  },
  methods:{
    change_soal(nomorSoal){
      this.$emit('refresh-soal', nomorSoal)
    },
    soal_sebelumnya(){
      this.$emit('refresh-soal', this.nomor_soal-1)
    },
    soal_selanjutnya(){
      this.$emit('refresh-soal', this.nomor_soal+1)
    }
  }
}
</script>

<style scoped>
.custom-height-width{
  height: 28px !important;
  min-width: 28px !important;
  padding: 0 !important;
}
.bg-custom-black{
  background: transparent;
  color: white;
}
</style>
