<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">{{ header }}</p>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <v-card style="width: 50%;">
          <v-container fluid>
            <v-row class="pt-3 px-6">
              <v-col cols="12">
                <p class="text-grey">Nama Tryout</p>
                <v-text-field
                  v-model="nama_tryout"
                  outlined
                  dense
                  class="my-n3"
                ></v-text-field>
                <p class="text-grey">Bidang Tryout</p>
                <v-select
                  v-model="bidang_tryout"
                  :items="bidang"
                  outlined
                  dense
                  value="Saintek"
                  class="my-n3"
                ></v-select>
                <p class="text-grey">Jenis Tryout</p>
                <v-select
                  v-model="jenis_tryout"
                  :items="jenis"
                  outlined
                  dense
                  value="Reguler"
                  class="my-n3"
                ></v-select>
                <p class="text-grey">Biaya Pendaftaran</p>
                <v-text-field
                  v-model="harga"
                  outlined
                  dense
                  class="my-n3"
                  type="number"
                ></v-text-field>

                <DateTimePicker 
                    :date.sync="dateStart"
                    :time.sync="timeStart"
                    date-label="Tanggal Mulai"
                    time-label="Waktu Mulai"
                />

                <DateTimePicker 
                    :date.sync="dateEnd"
                    :time.sync="timeEnd"
                    date-label="Tanggal Berakhir"
                    time-label="Waktu Berakhir"
                />

                <template v-if="is_edit">
                  <p class="text-grey font-weight-bold">Edit Soal Tes Pengetahuan Skolastika</p>
                  <v-btn 
                    v-for="(value, index) in tps_button"
                    :key="index"
                    large 
                    depressed
                    block
                    outlined
                    @click.prevent="editSubbidang(value)"
                    color="#4a47d6"
                    class="text-none mb-3">
                    {{ value }}
                    <v-spacer></v-spacer>
                    <v-icon right>
                          mdi-arrow-right
                      </v-icon>
                  </v-btn>

                  <p class="text-grey font-weight-bold mt-5">Edit Soal Tes Kemampuan Akademik</p>
                  <v-btn 
                    v-for="(value, index) in tka_button"
                    :key="index + 4"
                    large 
                    depressed
                    block
                    outlined
                    @click.prevent="editSubbidang(value)"
                    color="#4a47d6"
                    class="text-none mb-3">
                    {{ value }}
                    <v-spacer></v-spacer>
                    <v-icon right>
                          mdi-arrow-right
                      </v-icon>
                  </v-btn>

                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-btn 
                        large 
                        outlined
                        block
                        color="#4a47d6"
                        @click.prevent="generateBeban"
                        class="text-none mt-5 mr-2">
                        Generate Beban
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn 
                        large 
                        outlined
                        block
                        color="#4a47d6"
                        @click.prevent="generateBeban"
                        class="text-none mt-5 ml-2">
                        Lihat Jawaban
                      </v-btn>
                    </v-col>
                  </v-row>
                </template>

                <v-btn 
                  large 
                  depressed
                  block
                  @click.prevent="is_edit ? editTryout() : addTryout()"
                  class="my-purple text-none mt-5">
                  {{ button_text }}
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
                  <v-col cols="3">
                     <v-btn 
                      large 
                      depressed
                      outlined
                      color="red"
                      class="text-none">
                      Hapus Tryout
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="ml-4">
                    <p class="text-grey text-body-2">Dengan menekan tombol Hapus Tryout, Anda akan menghapus permanen program tersebut.</p>
                  </v-col>
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
import db from '../../firebase/db';
import firebase from 'firebase/app';

export default {
    name: "TryoutManager",
    components: { Breadcrumb, DateTimePicker },
    data() {
      return {
          items: [
          { text: 'Daftar Program', to: '/tryout'},
          { text: 'Daftar Tryout', to: '/tryout'},
        ],
        bidang: [
            'Saintek',
            'Soshum'
        ],
        jenis: [
            'Reguler',
            'Partner'
        ],
        tps_button: [
            "Penalaran Umum",
            "Pengetahuan Bacaan Menulis",
            "Pengetahuan dan Pemahaman Umum",
            "Kuantitatif" 
        ],
        poster_tryout: 'https://firebasestorage.googleapis.com/v0/b/brilliantz-edu.appspot.com/o/default%2Fdefault_tryout_poster.png?alt=media&token=a058f7e4-78a8-48f2-a98b-9a5d6ab09196',
        tka_button: [],
        id: '',
        is_edit: false,
        header: '',
        button_text: '',
        nama_tryout: '',
        bidang_tryout: 'Saintek',
        jenis_tryout: 'Reguler',
        harga: '',
        dateStart: '',
        timeStart: '',
        dateEnd: '',
        timeEnd: '',
      }
    },
    methods: {
      checkIfEdit() {
        const path = this.$route.path.split("/")
        if (path.includes("edit")) {
          this.is_edit = true
        } 
        return path
      },
      populateData(data) {
          const dStart = new Date(data.waktu_mulai.seconds)
          const dEnd = new Date(data.waktu_akhir.seconds)
          const dateStart = [
                    dStart.getFullYear(),
                    ('0' + (dStart.getMonth() + 1)).slice(-2),
                    ('0' + dStart.getDate()).slice(-2)
                  ].join('-');
          const dateEnd = [
                    dEnd.getFullYear(),
                    ('0' + (dEnd.getMonth() + 1)).slice(-2),
                    ('0' + dEnd.getDate()).slice(-2)
                  ].join('-');
          const timeStart = [
                    ('0' + dStart.getHours()).slice(-2),
                    ('0' + dStart.getMinutes()).slice(-2)
                  ].join(':')
          const timeEnd = [
                    ('0' + dEnd.getHours()).slice(-2),
                    ('0' + dEnd.getMinutes()).slice(-2)
                  ].join(':')
          console.log(data);
          this.nama_tryout = data.nama_tryout
          this.harga = data.harga
          this.bidang_tryout = data.bidang_tryout
          this.jenis_tryout = data.jenis_tryout
          this.dateStart = dateStart
          this.dateEnd = dateEnd
          this.timeStart = timeStart
          this.timeEnd = timeEnd
      },
      setupTKAButton() {
          this.tka_button = []
          if (this.bidang_tryout == "Saintek") {
              this.tka_button.push("Matematika")
              this.tka_button.push("Fisika")
              this.tka_button.push("Kimia")
              this.tka_button.push("Biologi")
          } else {
              this.tka_button.push("Geografi")
              this.tka_button.push("Sejarah")
              this.tka_button.push("Sosiologi")
              this.tka_button.push("Ekonomi")
          }
      },
      async addTryout() {
        const link = `https://brilliantz-edu.com/${this.formatUrl(this.nama_tryout)}`
        const dateStartArr = this.dateStart.split('-').map(e => parseInt(e))
        const timeStartArr = this.timeStart.split(':').map(e => parseInt(e))
        const dateEndArr = this.dateEnd.split('-').map(e => parseInt(e))
        const timeEndArr = this.timeEnd.split(':').map(e => parseInt(e))
        const dStart = new Date(dateStartArr[0], dateStartArr[1] - 1, dateStartArr[2], timeStartArr[0], timeStartArr[1])
        const dEnd = new Date(dateEndArr[0], dateEndArr[1] - 1, dateEndArr[2], timeEndArr[0], timeEndArr[1])
        const response = await db.collection("tryout").add({
          nama_tryout: this.nama_tryout,
          bidang_tryout: this.bidang_tryout,
          jenis_tryout: this.jenis_tryout,
          poster_tryout: this.poster_tryout,
          link_tryout: link,
          waktu_mulai: firebase.firestore.Timestamp.fromMillis(dStart.getTime()),
          waktu_akhir: firebase.firestore.Timestamp.fromMillis(dEnd.getTime()),
          harga: parseInt(this.harga)
        })
        this.$router.push({ path: `/tryout/edit/${response.id}` })
      },
      editTryout() {
        console.log('edit');
      },
      editSubbidang(subbidang) {
          this.$router.push({ path: `/tryout/edit/${this.id}/${this.formatUrl(subbidang)}/1` })
      },
      formatUrl(text) {
          return text.toLowerCase().replaceAll(" ", "-")
      },
      async doWork() {
        const path = this.checkIfEdit()
        this.id = path[3]

        if (this.is_edit) {
          // breadcrumb
          this.items.push(
            { text: 'Edit Tryout', to: `/tryout/edit/${this.id}` }
          )

          // header
          this.header = 'Edit Detail Tryout'

          //button
          this.button_text = 'Edit Tryout'

          // populate item
          const doc = await db.collection("tryout").doc(this.id).get()
          const data = doc.data()
          await this.populateData(data)
          this.setupTKAButton()
        } else {
          // breadcrumb
          this.items.push(
            { text: 'Tambah Tryout', to: '/tryout/add' }
          )

          // header
          this.header = 'Tambah Tryout'

          // button
          this.button_text = 'Tambahkan Tryout'
        }
      } 
    },
    watch: {
      $route (){
        this.doWork()
      }
    },
    async mounted() {
      await this.doWork()
    }
}
</script>

<style>

</style>