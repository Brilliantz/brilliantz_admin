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
              :value="soal.a"
              prepend-inner-icon="A"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban B</p>
            <v-text-field
              outlined
              label="Opsi Jawaban B"
              :value="soal.b"
              prepend-inner-icon="B"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban C</p>
            <v-text-field
              outlined
              label="Opsi Jawaban C"
              :value="soal.c"
              prepend-inner-icon="C"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban D</p>
            <v-text-field
              outlined
              label="Opsi Jawaban D"
              :value="soal.d"
              prepend-inner-icon="D"
            ></v-text-field>
            <p class="text-grey">Opsi jawaban E</p>
            <v-text-field
              outlined
              label="Opsi Jawaban E"
              :value="soal.e"
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
    }
  },
  data: () => ({
    tryoutId: '',
    subbidangId: '',
    nomorSoalNow: ''
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
    storage,
    syncImageSoal(image){
      this.soal.gambar_soal = image
      //this.uploadImageToStorage(image)
    },
    syncTextSoal(textSoal){
      this.filtered_image_text(textSoal)
      this.soal.text_soal = textSoal.html
    },
    async uploadImageToStorage(image){
      const uploadTask = await this.storage
        .ref(`tryout/${this.tryoutId}/${this.subbidangId}/${this.nomorSoalNow}/${image.name}`).put(image)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case storage.TaskState.PAUSED: // or 'paused'
          //     console.log('Upload is paused');
          //     break;
          //   case storage.TaskState.RUNNING: // or 'running'
          //     console.log('Upload is running');
          //     break;
          // }
        }
        ,
        error => {
          console.log(error)
        },
        () => {
          this.storage.ref()
          .child(`tryout/${this.tryoutId}/${this.subbidangId}/${this.nomorSoalNow}/${image.name}`)
          .getDownloadURL()
          .then(url => {
            console.log(url)
          })
        }
      )
      console.log(image)
    },
    filtered_image_text(text){
      const regex = new RegExp('<' + 'img' + ' .*?' + 'src' + '="(.*?)"', "gi");
      let res = []
      let result
      while ((result = regex.exec(text))) {
        res.push(result[1]);
      }
      this.soal.gambar_soal = res[0]
    },
    async saveSoal(){
      //const response = await db.collection('tryout').doc(this.tryoutId).get().data()
      const response = await db.collection('tryout').doc(this.tryoutId)
        .collection(this.subbidangId).doc(this.nomorSoalNow).set({
        gambar_soal: this.soal.gambar_soal || '',
        text_soal : this.soal.text_soal,
        nomor_soal : parseInt(this.nomorSoalNow),
        a: this.soal.a,
        b: this.soal.b,
        c: this.soal.c,
        d: this.soal.d,
        e: this.soal.e,
      })
      console.log(response)
      console.log(this.nomorSoalNow)
      console.log(this.tryoutId)
      console.log(this.subbidangId)
      this.$store.dispatch('onNotificationSuccess', 'Success Save Soal', { root: true})
    }
  }
}
</script>

<style scoped>

</style>
