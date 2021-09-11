<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">Daftar Peserta</p>
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
            to="/users/add"
            class="my-purple text-none">
            <v-icon left>
              mdi-plus
            </v-icon>
            Tambah Pengguna
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters class="mx-8 mt-5">
        <v-data-table
          :headers="headers"
          :items="getUsersData"
          :items-per-page="5"
          class="maximize-width"
        >
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

export default {
  components: { Breadcrumb },
  name: "Users",
  data() {
    return {
        items: [
        { text: 'Daftar Peserta', to: '/users'},
      ],
      headers: [
          { text: 'Nama Siswa', value: 'nama_lengkap' },
          { text: 'Email', value: 'email' },
          { text: 'Asal SMA', value: 'asal_sekolah' },
          { text: '', value: 'actions', sortable: false },
        ],
    }
  },
    computed: {
      ...mapGetters('users', ['getUsersData']),
    },
    methods: {
      ...mapActions('users', ['init']),
      viewItem(item){
        console.log(item);
        this.dialog = true;
        this.userToPopUp = item;
      },
      showDetail(item) {
        this.$router.push({ path: `/users/detail/${item.id}` })
      }
    },
    mounted() {
      this.init();
      console.log(this.getUsersData.value);
      Array.from(this.getUsersData).forEach((index, element) => {
        console.log(index, element);
      });
    },
}
</script>

<style>
</style>