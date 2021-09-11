<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">Daftar Bimbingan Prakuliah</p>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <v-col cols="4">
          <v-text-field
            dense
            label="Cari Nama Peserta Peserta, Asal"
            outlined
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2" class="mr-8">
          <v-btn 
            large 
            depressed 
            to="/bimbingan-prakuliah/add"
            class="my-purple text-none">
            <v-icon left>
              mdi-plus
            </v-icon>
            Tambah Bimbingan
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mx-8 mt-5">
        <v-data-table
          :headers="headers"
          :items="getBimbinganData"
          :items-per-page="5"
          class="maximize-width"
        >
          <template v-slot:[`item.harga`]="{ item }">
            {{ formatCurrency(item.harga) }}
          </template>
          <template v-slot:[`item.waktu_mulai`]="{ item }">
            {{ formatDate(item.waktu_mulai) }}
          </template>
          <template v-slot:[`item.waktu_akhir`]="{ item }">
            {{ formatDate(item.waktu_akhir) }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn 
              outlined 
              depressed 
              color="grey"
              class="text-none"
              @click="showDetail(item)">
              Lihat Detail
            </v-btn>
          </template>
        </v-data-table>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumb from '../../components/Breadcrumb.vue';
import DateAndCurrency from '../../mixins/DateAndCurrency';

export default {
  components: { Breadcrumb },
  name: "BimbinganPrakuliah",
  mixins: [DateAndCurrency],
  data() {
    return {
        items: [
        { text: 'Daftar Program', to: '/bimbingan-prakuliah'},
        { text: 'Daftar Bimbingan Prakuliah', to: '/bimbingan-prakuliah'},
      ],
      headers: [
          { text: 'Nama Bimbingan', value: 'nama_program' },
          { text: 'Harga', value: 'harga' },
          { text: 'Waktu Mulai', value: 'waktu_mulai' },
          { text: 'Waktu Selesai', value: 'waktu_akhir' },
          { text: '', value: 'actions', sortable: false },
        ],
    }
  },
    computed: {
      ...mapGetters('bimbinganPrakuliah', ['getBimbinganData']),
    },
    methods: {
      ...mapActions('bimbinganPrakuliah', ['init']),
      viewItem(item){
        this.dialog = true;
        this.userToPopUp = item;
      },
      showDetail(item) {
        this.$router.push({ path: `/bimbingan-prakuliah/detail/${item.id}` })
      }
    },
    mounted() {
      this.init();
    },
}
</script>

<style>
</style>