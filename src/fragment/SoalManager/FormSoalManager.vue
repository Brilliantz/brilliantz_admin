<template>
  <v-col
    lg="7"
    sm="12"
  >
    <v-card>
      <v-container fluid>
        <v-row class="pt-3 px-6">
          <v-col cols="12">
            <p class="text-grey">Pertanyaan</p>
            <quill-editor-image
              @syncImageSoal="syncImageSoal"
            />
            <quill-editor-custom
              @syncTextSoal="syncTextSoal"
            />
            <p class="text-grey">Opsi jawaban A</p>
            <v-text-field
              outlined
              label="Opsi Jawaban A"
              v-model="soal.a"
              prepend-inner-icon="A"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban B</p>
            <v-text-field
              outlined
              label="Opsi Jawaban B"
              v-model="soal.b"
              prepend-inner-icon="B"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban C</p>
            <v-text-field
              outlined
              label="Opsi Jawaban C"
              v-model="soal.c"
              prepend-inner-icon="C"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban D</p>
            <v-text-field
              outlined
              label="Opsi Jawaban D"
              v-model="soal.d"
              prepend-inner-icon="D"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban E</p>
            <v-text-field
              outlined
              label="Opsi Jawaban E"
              v-model="soal.e"
              prepend-inner-icon="E"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="px-6 py-3">
          <v-col>
            <v-btn
              text
              min-width="100%"
              width="100%"
              class="my-purple"
              @click="saveSoal"
            >Simpan & Tambahkan</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</template>

<script>
import QuillEditorCustom from "../../components/QuillEditor/QuilEditorCustom";
import QuillEditorImage from "../../components/QuillEditor/QuilEditorImage";
import db from "../../firebase/db";
import storage from "../../firebase/storage";


export default {
  name: "FormSoalManager",
  components: {QuillEditorCustom, QuillEditorImage},
  props: {
    soal : {
      type: Object,
      required: true
    },
    isEditForm: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    tryoutId: '',
    subbidangId: '',
    nomorSoalNow: '',
  }),
  watch: {
    $route() {
      this.tryoutId = this.$route.params.tryoutid
      this.subbidangId = this.$route.params.subbidang
      this.nomorSoalNow = this.$route.params.no
    }
  },
  async mounted() {
    this.tryoutId = this.$route.params.tryoutid
    this.subbidangId = this.$route.params.subbidang
    this.nomorSoalNow = this.$route.params.no
    // await this.doWork()
  },
  methods: {
    syncImageSoal(image){
      this.soal.gambar_soal = image
      //this.onHandlerImageUpload(image)
    },
    syncTextSoal(textSoal){
      this.soal.text_soal = textSoal.html
    },

    async onHandlerImageUpload(image = ''){
      let imageLink = '';
      if(image == '')
        return  ''
      const uploadTask = storage
        .ref()
        .child(`tryout/${this.tryoutId}/${this.subbidangId}/${this.nomorSoalNow}/${this.nomorSoalNow}`)
        .put(image)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }
        ,
        error => {
          console.log(error)
        },
        () => {
          storage.ref()
            .child(`tryout/${this.tryoutId}/${this.subbidangId}/${this.nomorSoalNow}/${this.nomorSoalNow}`)
            .getDownloadURL()
            .then(url => {
              imageLink = url
              this.soal.gambar_soal = imageLink
              console.log( this.soal.gambar_soal)

            })
        }
      )
      imageLink = await uploadTask
      return imageLink
    },
    saveSoal(){
      //const response = await db.collection('tryout').doc(this.tryoutId).get().data()
     this.onHandlerImageUpload(this.soal.gambar_soal)
      .then(async (res) => {
        await console.log(res)
        console.log(db)
        // if(this.isEditForm === true) {
        //   const response = await db.collection('tryout').doc(this.tryoutId)
        //     .collection(this.subbidangId).doc(this.soal.id).update({
        //       gambar_soal: this.soal.gambar_soal || '',
        //       text_soal : this.soal.text_soal,
        //       nomor_soal : parseInt(this.nomorSoalNow),
        //       a: this.soal.a,
        //       b: this.soal.b,
        //       c: this.soal.c,
        //       d: this.soal.d,
        //       e: this.soal.e,
        //     })
        //   console.log(response)
        //   this.$store.dispatch('onNotificationSuccess', 'Success Edit Soal', { root: true})
        // }
        // else{
        //   const response = await db.collection('tryout').doc(this.tryoutId)
        //     .collection(this.subbidangId).add({
        //       gambar_soal: this.soal.gambar_soal || '',
        //       text_soal : this.soal.text_soal,
        //       nomor_soal : parseInt(this.nomorSoalNow),
        //       a: this.soal.a,
        //       b: this.soal.b,
        //       c: this.soal.c,
        //       d: this.soal.d,
        //       e: this.soal.e,
        //     })
        //   console.log(response)
        //   this.$emit('changeIsEdit',true)
        //   this.$store.dispatch('onNotificationSuccess', 'Success Save Soal', { root: true})
        // }
      })

    }
  }
}
</script>

<style scoped>

</style>
