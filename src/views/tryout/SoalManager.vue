<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">{{ header }}</p>
      </v-row>
      <v-row
        justify="space-between"
        no-gutters
        class="ml-8 mt-3">
        <form-soal-manager
          @changeIsEdit="changeIsEdit"
          :isEditForm="isEdit"
          :soal="soal"
        />
        <nomor-soal-manager
          @refresh-soal="refreshSoal"
          :nomor_soal="soal.nomor_soal"
        />
      </v-row>
  </v-container>
</template>

<script>
import FormSoalManager from "../../fragment/SoalManager/FormSoalManager";
import NomorSoalManager from "../../fragment/SoalManager/NomorSoalManager";
import Breadcrumb from '../../components/Breadcrumb.vue';
import db from '../../firebase/db';

export default {
    name: "SoalManager",
    components: { Breadcrumb, FormSoalManager, NomorSoalManager},
    data() {
      return {
        isEdit: false,
        tryoutId: '',
        subbidangId: '',
        nomorSoalNow: '',
        header: '',
        items: [
          { text: 'Daftar Program', to: '/tryout'},
          { text: 'Daftar Tryout', to: '/tryout'},
        ],
        allSoalFirebase: [],
        soal: {
          nomor_soal: 1,
          text_soal: 'jelaskan nama-nama ikan',
          gambar_soal: '',
          a: 'heheheh',
          b: 'kokokok',
          c: 'bobobobob',
          d: 'eeeeeeeeee',
          e: 'Fleeting word'
        },
      }
    },
    methods: {
      changeIsEdit(status){
        this.isEdit = status;
      },
      async getCurrentSoal(nomorSoal = parseInt(this.nomorSoalNow)){
        const defaultSoal = {
          nomor_soal: nomorSoal,
          text_soal: '',
          gambar_soal: '',
          a: '',
          b: '',
          c: '',
          d: '',
          e: ''
        }
        this.allSoalFirebase = []
        const tryoutCollection = await db.collection('tryout').doc(this.tryoutId).collection(this.subbidangId)
        tryoutCollection.onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            this.allSoalFirebase.push({
              id : doc.id,
              ...doc.data()
            })
          })
          const soalTryoutNow = this.allSoalFirebase.find( soal => soal.nomor_soal === parseInt(nomorSoal))
          this.isEdit = soalTryoutNow != undefined ? true : false
          this.soal = soalTryoutNow != undefined
            ? {...soalTryoutNow}
            : {...defaultSoal}
        })
        return true
      },
      async refreshSoal(nomorSoal){
        // const data = await db.collection("tryout")
        //   .doc(this.tryoutId).collection(this.subbidangId)
        //   .doc(`${nomorSoal}`)
        //   .get()
        this.getCurrentSoal(nomorSoal).then(() => {
          this.$router.push({ path: `/tryout/edit/${this.tryoutId}/${this.subbidangId}/${parseInt(nomorSoal)}` })
        })
      },
      checkIfEdit() {
        const path = this.$route.path.split("/")
        if (path.includes("edit")) {
          this.is_edit = true
        }
        return path
      },
    },
    watch: {
      $route (){
        this.tryoutId = this.$route.params.tryoutid
        this.subbidangId = this.$route.params.subbidang
        this.nomorSoalNow = this.$route.params.no

        //this.doWork()
      }
    },
    async mounted() {
      this.tryoutId = this.$route.params.tryoutid
      this.subbidangId = this.$route.params.subbidang
      this.nomorSoalNow = this.$route.params.no
      await this.getCurrentSoal()
      // await this.doWork()
    }
}
</script>

<style>

</style>
