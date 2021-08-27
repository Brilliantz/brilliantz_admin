<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">Daftar Transaksi</p>
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
                v-model="program"
                :items="programs"
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
          :items="getTransaksiData"
          :items-per-page="5"
          class="maximize-width"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-icon v-if="item.status == 'aktif' || item.status == 'selesai'" color="green">mdi-check-circle</v-icon>
            <v-icon v-else-if="item.status == 'ditolak'" color="red">mdi-close-circle</v-icon>
            <v-icon v-else color="blue">mdi-plus</v-icon>
          </template>
          <template v-slot:[`item.harga`]="{ item }">
              <p class="my-auto">{{ formatCurrency(item.harga) }}</p>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn 
              outlined 
              depressed 
              color="black"
              class="text-none"
              @click.prevent="showImage(item)">
              Cek Bukti
            </v-btn>
            <v-btn 
              outlined 
              depressed 
              color="#4a47d6"
              class="text-none ml-2"
              @click.prevent="verifikasi(item)">
              Verifikasi
            </v-btn>
            <v-btn 
              text
              depressed 
              color="red"
              class="text-none ml-2"
              @click.prevent="tolak(item)">
              Tolak
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
            Bukti Pembayaran
          </v-card-title>

          <v-img 
            :src="bukti_url"
            class="ma-3">
          </v-img>

          <v-card-text>
              <p class="font-weight-bold text-display-1 ml-n1"> {{ created_at }} </p>
              <p class="font-weight-bold text-display-1 ml-n1 mt-n2"> {{ updated_at }} </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="red"
              @click="isShow = false"
            >
              Tutup
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Breadcrumb from '../../components/Breadcrumb.vue'
import db from '../../firebase/db'
import firebase from "firebase/app";

export default {
    name: "Transaksi",
    components: { Breadcrumb },
    data() {
        return {
            items: [
                { text: 'Daftar Transaksi', to: '/transaksi'},
            ],
            headers: [
                { text: '', value: 'status', sortable: false},
                { text: 'Nama Peserta', value: 'nama_lengkap' },
                { text: 'Tipe Program', value: 'tipe_program' },
                { text: 'Bayar Via', value: 'bayar_via' },
                { text: 'Harga', value: 'harga' },
                { text: '', value: 'actions', sortable: false },
            ],
            program: null,
            programs: [],
            bukti_url: '',
            isShow: false,
            created_at: 'tes',
            updated_at: 'tes'
        }
    },
    methods: {
        ...mapActions('transaksi', ['init']),
        onChange(){
            this.init(this.program);
        },
        formatDate(d) {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
          const dd = d.getDate()
          const MM = months[d.getMonth()]
          const yy = d.getFullYear()
          const hh = d.getHours()
          const mm = d.getMinutes()
          const ss = d.getSeconds()
          return `${dd} ${MM} ${yy} ${hh}:${mm}:${ss}`
        },
        formatCurrency(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
        },
        showImage(item) {
            console.log(item);
            this.isShow = true;
            this.bukti_url = item.bukti_pembayaran
            this.created_at = `Waktu Transaksi: ${this.formatDate(new Date(item.created_at.seconds * 1000))}`
            this.updated_at = `Waktu Verifikasi/Ditolak: ${this.formatDate(new Date(item.updated_at.seconds * 1000))}`
        },
        verifikasi(item) {
            db.collection("transaksi").doc(item.id).update({
                status: 'aktif',
                updated_at: firebase.firestore.FieldValue.serverTimestamp()
            })
        },
        tolak(item) {
            db.collection("transaksi").doc(item.id).update({
                status: 'ditolak',
                updated_at: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    },
    computed: {
      ...mapGetters('transaksi', ['getTransaksiData']),
    },
    async mounted() {
        const tryoutList = await db.collection("tryout").get()
        tryoutList.forEach(doc => {
          this.programs.push({
            id: doc.id,
            name: doc.data().nama_tryout
          })
        });
        const webinarList = await db.collection("webinar").get()
        webinarList.forEach(doc => {
          this.programs.push({
            id: doc.id,
            name: doc.data().nama_webinar
          })
        });
        const bimbinganPrakuliah = await db.collection("bimbingan_prakuliah").get()
        bimbinganPrakuliah.forEach(doc => {
          this.programs.push({
            id: doc.id,
            name: doc.data().nama_program
          })
        });
    }
}
</script>

<style>

</style>