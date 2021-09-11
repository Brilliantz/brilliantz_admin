<template>
  <v-container>
       <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">Detail Submisi</p>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <v-card class="maximize-width">
          <v-container fluid>
            <v-row class="pt-3 ml-3">
              <v-col cols="4">
                <p class="text-grey">Nama Peserta</p>
                <v-text-field
                  v-model="nama_lengkap"
                  disabled
                  outlined
                  dense
                  class="my-n3"
                ></v-text-field>
                <p class="text-grey">Nilai Tryout</p>
                <v-text-field
                  v-model="total_nilai"
                  disabled
                  outlined
                  dense
                  class="my-n3"
                ></v-text-field>
                <p class="text-grey">Nama Tryout</p>
                <v-text-field
                  v-model="nama_tryout"
                  disabled
                  outlined
                  dense
                  class="my-n3"
                ></v-text-field>
                <v-btn 
                  large 
                  depressed
                  block
                  @click.prevent="addUser"
                  class="my-purple text-none my-3">
                  Export XLSX
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="7" class="pt-5 mr-5">
                <v-select
                  v-model="subbidang"
                  :items="list_subbidang"
                  item-value="id"
                  item-text="text"
                  outlined
                  dense
                  @change="onSubbidangChange"
                ></v-select>

                <v-container fluid>
                  <v-row no-gutters>
                    <v-col cols="3">
                      <p v-for="item in separatedItems.first" 
                        :key="item.no">
                        {{ item.no }}. {{item.jawaban}} 
                        <v-icon small v-if="item.is_true" color="green">mdi-check-circle</v-icon>
                        <v-icon small v-else color="red">mdi-close-circle</v-icon>
                      </p>
                    </v-col>
                    <v-col cols="3">
                      <p v-for="item in separatedItems.second" 
                        :key="item.no">
                        {{ item.no }}. {{item.jawaban}} 
                        <v-icon small v-if="item.is_true" color="green">mdi-check-circle</v-icon>
                        <v-icon small v-else color="red">mdi-close-circle</v-icon>
                      </p>
                    </v-col>
                    <v-col cols="3">
                      <p v-for="item in separatedItems.third" 
                        :key="item.no">
                        {{ item.no }}. {{item.jawaban}} 
                        <v-icon small v-if="item.is_true" color="green">mdi-check-circle</v-icon>
                        <v-icon small v-else color="red">mdi-close-circle</v-icon>
                      </p>
                    </v-col>
                    <v-col cols="3">
                      <p v-for="item in separatedItems.forth" 
                        :key="item.no">
                        {{ item.no }}. {{item.jawaban}} 
                        <v-icon small v-if="item.is_true" color="green">mdi-check-circle</v-icon>
                        <v-icon small v-else color="red">mdi-close-circle</v-icon>
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
  </v-container>
</template>

<script>
import Breadcrumb from "../../components/Breadcrumb.vue";
import db from "../../firebase/db";
import _ from "lodash";

export default {
    name: "SubmisiDetail",
    components: { Breadcrumb },
    data() {
      return {
        items: [
          { text: 'Submisi', to: '/submisi'},
        ],
        list_subbidang: [
          { id: 'penalaran_umum', text: 'Penalaran Umum' },
          { id: 'pengetahuan_bacaan_menulis', text: 'Pengetahuan Bacaan Menulis' },
          { id: 'pengetahuan_dan_pemahaman_umum', text: 'Pengetahuan dan Pemahaman Umum' },
          { id: 'kuantitatif', text: 'Kuantitatif' },
        ],
        list_jawaban: [],
        separatedItems: {
          first: null,
          second: null,
          third: null,
          forth: null
        },
        submisiId: '',
        subbidang: '',
        nama_lengkap: '',
        total_nilai: '',
        nama_tryout: ''
      }
    },
    methods: {
      async onSubbidangChange() {
        this.list_jawaban = []
        const docs = await db.collection("submisi").doc(this.submisiId).collection(this.subbidang).get()
        docs.forEach((doc) => {
          this.list_jawaban.push(
            { 
              no: doc.data().nomor_soal,
              jawaban: doc.data().jawaban.toUpperCase(),
              is_true: doc.data().is_true
            }
          )
        })
        this.list_jawaban = _.sortBy( this.list_jawaban, 'no' );
        this.separatedItems = {
          first: this.filterItems(1,4, this.list_jawaban),
          second: this.filterItems(2,4, this.list_jawaban),
          third: this.filterItems(3,4, this.list_jawaban),
          forth: this.filterItems(4,4, this.list_jawaban) 
        }
      },
      filterItems(column, columns, arr) {
          const total = arr.length; // How many items
          const gap = Math.ceil(total / columns); // How many per col
          const top = ((gap * column) <= total) ? (gap * column) : total; // Top of the col
          const bottom = ((gap * column) <= total) ? (top - gap) : (gap * (column - 1));
          return arr.slice(bottom, top)
      },
    },
    async mounted() {
      this.submisiId = this.$route.path.split("/")[3]
      const query = await db.collection("submisi").doc(this.submisiId).get()
      if (query.exists) {
          const data = query.data()
          this.nama_lengkap = data.nama_lengkap
          this.total_nilai = data.total_nilai
          this.nama_tryout = data.nama_tryout

          if (data.tipe_tryout == "saintek") {
            this.list_subbidang.push(
              { id: 'matematika', text: 'Matematika' },
              { id: 'fisika', text: 'Fisika' },
              { id: 'kimia', text: 'Kimia' },
              { id: 'biologi', text: 'Biologi' },
            )
          } else {
            this.list_subbidang.push(
              { id: 'ekonomi', text: 'Ekonomi' },
              { id: 'geografi', text: 'Geografi' },
              { id: 'sosiologi', text: 'Sosiologi' },
              { id: 'sejarah', text: 'Sejarah' },
            )
          }
      }

      this.items.push({
          text: 'Detail Submisi', to: this.$route.path
      })
    }
}
</script>

<style>

</style>