<template>
  <v-container fluid>
    <v-row no-gutters class="mt-3 ml-3">
      <Breadcrumb :items="items"/>
    </v-row>
    <v-row no-gutters class="ml-8 mt-3">
      <p class="text-h4 font-weight-bold">{{is_edit ? "Edit Webinar" : "Add Webinar"}}</p>
    </v-row>
    <v-row no-gutters class="ml-8 mt-3">
      <v-card style="width: 60%;">
        <v-container fluid>
          <v-row class="pt-3 px-6">
            <v-col cols="12">
              <p class="text-grey">Judul Webinar</p>
              <v-text-field
                v-model="nama_webinar"
                outlined
                dense
                class="my-n3"
              ></v-text-field>
              <p class="text-grey">Descripsi Webinar</p>
              <v-textarea
                v-model="deskripsi_webinar"
                outlined
                dense
                class="my-n3"
              ></v-textarea>
              <p class="text-grey">Link Webinar</p>
              <v-text-field
                v-model="link_webinar"
                outlined
                dense
                class="my-n3"
              ></v-text-field>

              <p class="text-grey">Waktu Mulai</p>
              <DateTimePicker
                :date.sync="dateStart"
                :time.sync="timeStart"
                date-label="Tanggal Mulai"
                time-label="Waktu Mulai"
              />
              <p class="text-grey">Waktu Berakhir</p>
              <DateTimePicker
                :date.sync="dateEnd"
                :time.sync="timeEnd"
                date-label="Tanggal Berakhir"
                time-label="Waktu Berakhir"
              />
              <p class="text-grey">Biaya Pendaftaran</p>
              <v-text-field
                v-model="harga"
                outlined
                dense
                class="my-n3"
                type="number"
              ></v-text-field>

              <p class="font-weight-bold my-0">Speaker Webinar</p>
              <p class="mt-0 custom-subtitle">Cantumkan nama dan asal speaker (ex: Muhammad Ridlo, Teknik Informatika PENS)</p>
              <div
                v-for="(data,i) in nama_speaker"
                :key="i"
              >
                <p class="text-grey">Speaker {{i+1}}</p>
                <v-text-field
                  class="hidden-sm-and-down my-3"
                  append-outer-icon="mdi-close"
                  @click:append-outer="onDeleteSpeaker(i)"
                  v-model="nama_speaker[i]"
                  outlined
                  dense
                ></v-text-field>
              </div>
              <v-btn
                outlined
                color="blue"
                @click="addSpeaker"
              >
                <v-icon
                  left
                  dark
                  class="ma-2"
                >
                  mdi-plus
                </v-icon>
                Tambah Speaker
              </v-btn>

              <v-btn
              large
              depressed
              block
              @click.prevent="is_edit ? editWebinar() : addWebinar()"
              class="my-purple text-none mt-5">
              {{ is_edit ? "Edit Webinar" : "Create Webinar" }}
            </v-btn>
              <v-btn
                large
                depressed
                block
                outlined
                color="red"
                class="mt-3 text-none">
                Batalkan
              </v-btn>
              <v-row v-if="is_edit" no-gutters class="mt-5">
                <v-tooltip
                  max-width="320px"
                  right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      large
                      depressed
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      class="text-none">
                      Hapus Webinar
                    </v-btn>
                  </template>
                  <span>Dengan menekan tombol Hapus Webinar, Anda akan menghapus permanen program tersebut.</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue';
import DateTimePicker from "../../components/DateTimePicker.vue";
import db from "../../firebase/db";
import firebase from "firebase";
export default {
  name: "WebinarDetail",
  data: () => ({
    is_edit: true,
    items: [
      { text: 'Daftar Program', to: '/'},
      { text: 'Daftar Webinar', to: '/webinar'},
      { text: 'Tambah Webinar', to: '/webinar'},
      ],
    nama_webinar: '',
    deskripsi_webinar: '',
    link_webinar: '',
    dateStart: '',
    timeStart: '',
    dateEnd: '',
    timeEnd: '',
    harga: 0,
    nama_speaker: ["Devola"],
    parse_nama_speaker: [],
    parse_gelar_speaker: []
  }),
  components: {DateTimePicker, Breadcrumb},
  methods: {
    onDeleteSpeaker(index){
      if(index != 0)
        this.nama_speaker.splice(index, 1)
    },
    addSpeaker(){
      this.nama_speaker.push("")
    },
    devideNameAndGelarSpeaker(){
      let parse_nama = []
      let parse_gelar = []
      for(let data in this.nama_speaker){
        let split = data.split(',')
        parse_nama.push(split[0])
        parse_gelar.push(split[1])
      }
      this.parse_nama_speaker = parse_nama
      this.parse_gelar_speaker = parse_gelar
    },
    async editWebinar(){
      this.devideNameAndGelarSpeaker
    },
    async addWebinar(){
      //const link = `https://brilliantz-edu.com/${this.formatUrl(this.nama_tryout)}`
      const dateStartArr = this.dateStart.split('-').map(e => parseInt(e))
      const timeStartArr = this.timeStart.split(':').map(e => parseInt(e))
      const dateEndArr = this.dateEnd.split('-').map(e => parseInt(e))
      const timeEndArr = this.timeEnd.split(':').map(e => parseInt(e))
      const dStart = new Date(dateStartArr[0], dateStartArr[1] - 1, dateStartArr[2], timeStartArr[0], timeStartArr[1])
      const dEnd = new Date(dateEndArr[0], dateEndArr[1] - 1, dateEndArr[2], timeEndArr[0], timeEndArr[1])
      const response = await db.collection("webinar").add({
        deskripsi_webinar: this.deskripsi_webinar,
        gelar_speaker : '',
        waktu_mulai: firebase.firestore.Timestamp.fromMillis(dStart.getTime()),
        waktu_akhir: firebase.firestore.Timestamp.fromMillis(dEnd.getTime()),
        harga: parseInt(this.harga)
      })
      this.$router.push({ path: `/webinar/edit/${response.id}` })
    }
  }
}
</script>

<style scoped>
.custom-subtitle {
  color: grey;
  size: 0.5rem;
}
</style>
