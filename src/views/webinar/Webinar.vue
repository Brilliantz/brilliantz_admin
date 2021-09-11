<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">Daftar Webinar</p>
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
            to="/webinar/add"
            class="my-purple text-none">
            <v-icon left>
              mdi-plus
            </v-icon>
            Tambah Webinar
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mx-8 mt-5">
        <v-data-table
          :headers="headers"
          :items="getWebinarData"
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
  name: "Webinar",
  mixins: [DateAndCurrency],
  data() {
    return {
        items: [
        { text: 'Daftar Program', to: '/webinar'},
        { text: 'Daftar Webinar', to: '/webinar'},
      ],
      headers: [
          { text: 'Nama Webinar', value: 'nama_webinar' },
          { text: 'Harga', value: 'harga' },
          { text: 'Waktu Mulai', value: 'waktu_mulai' },
          { text: 'Waktu Selesai', value: 'waktu_akhir' },
          { text: '', value: 'actions', sortable: false },
        ],
    }
  },
    computed: {
      ...mapGetters('webinar', ['getWebinarData']),
    },
    methods: {
      ...mapActions('webinar', ['init']),
      viewItem(item){
        this.dialog = true;
        this.userToPopUp = item;
      },
      showDetail(item) {
        this.$router.push({ path: `/webinar/detail/${item.id}` })
      }
    },
    mounted() {
      this.init();
    },
}
</script>

<style>
</style>