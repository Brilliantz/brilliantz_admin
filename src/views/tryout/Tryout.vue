<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">Daftar Tryout</p>
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
            to="/tryout/add"
            class="my-purple text-none">
            <v-icon left>
              mdi-plus
            </v-icon>
            Tambah Tryout
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mx-8 mt-5">
        <v-data-table
          :headers="headers"
          :items="getTryoutData"
          :items-per-page="5"
          class="maximize-width"
        >
          <template v-slot:[`item.waktu_mulai`]="{ item }">
            <p class="my-auto">{{ formatDate(item.waktu_mulai) }}</p>
          </template>
          <template v-slot:[`item.waktu_akhir`]="{ item }">
            <p class="my-auto">{{ formatDate(item.waktu_akhir) }}</p>
          </template>
          <template v-slot:[`item.harga`]="{ item }">
            <p class="my-auto">{{ formatCurrency(item.harga) }}</p>
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
      <v-dialog
        v-model="isShow"
        max-width="500"
      >
        <v-card>
          <v-card-title class="headline mb-3">
            {{ nama_tryout }}
          </v-card-title>

          <v-card-text>
              <p class="font-weight-bold text-display-1 ml-n1">
                    <v-icon color="#4a47d6">
                        mdi-calendar-blank
                    </v-icon>
                    {{ formatDate(waktu_mulai) }} - {{ formatDate(waktu_akhir) }}
             </p>

              <p class="font-weight-bold ml-n1 my-purple-text">Link Tryout</p>
              <p class="font-weight-bold text-display-1 ml-n1 mt-n4"> link </p>

              <p class="font-weight-bold ml-n1 my-purple-text">Jenis Tryout</p>
              <p class="font-weight-bold text-display-1 ml-n1 mt-n4"> {{ jenis }} </p>

              <p class="font-weight-bold ml-n1 my-purple-text">Tipe Tryout</p>
              <p class="font-weight-bold text-display-1 ml-n1 mt-n4"> {{ tipe }} </p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="my-purple text-none"
              @click="gotoEdit(tryout_id)"
            >
              Edit Tryout
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="red"
              class="text-none"
              @click="onDeleteTryout"
            >
              Hapus Tryout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumb from '../../components/Breadcrumb.vue';
import DateAndCurrency from "../../mixins/DateAndCurrency";
import db from "../../firebase/db";

export default {
  components: { Breadcrumb },
  name: "Tryout",
  mixins: [DateAndCurrency],
  data() {
    return {
        items: [
        { text: 'Daftar Program', to: '/tryout'},
        { text: 'Daftar Tryout', to: '/tryout'},
      ],
      headers: [
          { text: 'Nama Tryout', value: 'nama_tryout' },
          { text: 'Tipe Tryout', value: 'tipe_tryout' },
          { text: 'Waktu Mulai', value: 'waktu_mulai' },
          { text: 'Waktu Selesai', value: 'waktu_akhir' },
          { text: 'Jenis', value: 'jenis_tryout' },
          { text: 'Harga', value: 'harga' },
          { text: '', value: 'actions', sortable: false },
        ],
      isShow: false,
      tryout_id: '',
      nama_tryout: '',
      waktu_mulai: '',
      waktu_akhir: '',
      jenis: '',
      tipe: '',
    }
  },
    computed: {
      ...mapGetters('tryout', ['getTryoutData']),
    },
    methods: {
      ...mapActions('tryout', ['init']),
      onDeleteTryout() {
        const response = new Promise((resolve, reject) => {
          const data = db.collection("tryout").doc(this.tryout_id).delete()
          resolve(data)
          reject(data)
        })
        response.then(() => {
          this.$store.dispatch('onNotificationSuccess', 'Success Delete Tryout', { root: true})
          this.init()
        })
        this.isShow = false
      },
      viewItem(item){
        this.dialog = true;
        this.userToPopUp = item;
      },
      showDetail(item) {
        this.isShow = true
        this.tryout_id = item.id
        this.nama_tryout = item.nama_tryout
        this.waktu_mulai = item.waktu_mulai
        this.waktu_akhir = item.waktu_akhir
        this.jenis = item.jenis_tryout
        this.tipe = item.tipe_tryout
      },
      gotoEdit(id) {
          this.$router.push({ path: `/tryout/edit/${id}` })
      }
    },
    mounted() {
      this.init();
    },
}
</script>

<style>
</style>
