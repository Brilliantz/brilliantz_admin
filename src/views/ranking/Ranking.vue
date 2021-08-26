<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">Ranking</p>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <v-col cols="4">
          <v-text-field
            dense
            label="Cari Peserta, Jurusan"
            outlined
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2" class="mr-4">
            <v-select
                v-model="tryout"
                :items="tryouts"
                item-value="id"
                item-text="name"
                outlined
                dense
                rounded
                @change="onChange"
            ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn 
            large 
            depressed 
            to="/users/add"
            class="my-purple text-none">
            <v-icon left>
              mdi-file-download
            </v-icon>
            Export XLSX
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mx-8 mt-5">
        <v-data-table
          :headers="headers"
          :items="getRankingData"
          :items-per-page="5"
          class="maximize-width"
        >
        </v-data-table>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumb from '../../components/Breadcrumb.vue'
import db from '../../firebase/db'

export default {
    name: "Submisi",
    components: { Breadcrumb },
    data() {
        return {
            items: [
                { text: 'Ranking', to: '/ranking'},
            ],
            headers: [
                { text: 'Nama Siswa', value: 'nama_lengkap' },
                { text: 'Asal Sekolah', value: 'asal_sekolah' },
                { text: 'Nilai TKA', value: 'nilai_tka' },
                { text: 'Nilai TPS', value: 'nilai_tps' },
                { text: 'Nilai Rata-rata', value: 'total_nilai' },
            ],
            tryout: null,
            tryouts: [],
        }
    },
    methods: {
      ...mapActions('ranking', ['init']),
      onChange(){
        this.init(this.tryout);
      },
    },
    computed: {
      ...mapGetters('ranking', ['getRankingData']),
    },
    async mounted() {
        const tryoutList = await db.collection("tryout").get()
        tryoutList.forEach(doc => {
          this.tryouts.push({
            id: doc.id,
            name: doc.data().nama_tryout
          })
        });
    }
}
</script>

<style>

</style>