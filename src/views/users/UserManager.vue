<template>
  <v-container fluid>
      <v-row no-gutters class="mt-3 ml-3">
        <Breadcrumb :items="items"/>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <p class="text-h4 font-weight-bold">{{ header }}</p>
      </v-row>
      <v-row no-gutters class="ml-8 mt-3">
        <v-card class="maximize-width">
          <v-container fluid>
            <v-row class="pt-3 pl-3">
              <v-col cols="3">
                <v-img
                ref="profile"
                max-width="300"
                max-height="300"
                :src="url">
                </v-img>
                <v-btn 
                outlined
                large
                block
                @click.prevent="chooseFile"
                class="text-none mt-4">
                  Pilih Foto
                </v-btn>
                <p class="text-grey text-body-2 mt-3">
                  Gunakan foto dengan format .JPG, .PNG, .JPEG dengan ukuran file maksimal 3 MB.
                </p>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                >
              </v-col>
              <v-col cols="6" class="ml-3">
                <p class="text-grey">Nama Lengkap</p>
                <v-text-field
                  v-model="nama_lengkap"
                  outlined
                  dense
                  class="my-n3"
                ></v-text-field>
                <p class="text-grey">Jenis Kelamin</p>
                <v-select
                  v-model="jenis_kelamin"
                  :items="genders"
                  outlined
                  dense
                  value="Laki-laki"
                  class="my-n3"
                ></v-select>
                <p class="text-grey">Asal Sekolah</p>
                <v-text-field
                  v-model="asal_sekolah"
                  outlined
                  dense
                  class="my-n3"
                ></v-text-field>
                <p class="text-grey">Provinsi</p>
                <v-select
                  v-model="provinsi"
                  :items="list_provinsi"
                  outlined
                  dense
                  @change="onProvinsiChange"
                  class="my-n3"
                ></v-select>
                <p class="text-grey">Kabupaten</p>
                <v-select
                  v-model="kabupaten"
                  :items="list_kabupaten"
                  :disabled="is_kabupaten_disabled"
                  outlined
                  dense
                  class="my-n3"
                ></v-select>
                <p class="text-grey">Universitas Impian</p>
                <v-select
                  v-model="universitas_impian"
                  :items="list_ptn"
                  outlined
                  dense
                  @change="onUniversitasChange"
                  class="my-n3"
                ></v-select>
                <p class="text-grey">Jurusan Impian</p>
                <v-select
                  v-model="jurusan_impian"
                  :items="list_jurusan"
                  :disabled="is_jurusan_disabled"
                  outlined
                  dense
                  class="my-n3"
                ></v-select>
                <p class="text-grey">No HP / Whatsapp</p>
                <v-text-field
                  v-model="no_hp"
                  outlined
                  dense
                  class="my-n3"
                ></v-text-field>
                <v-btn 
                  large 
                  depressed
                  block
                  @click.prevent="addUser"
                  class="my-purple text-none">
                  Tambah Pengguna
                </v-btn>
                <v-btn 
                  large 
                  depressed
                  block
                  outlined
                  color="red"
                  class="mt-3 text-none">
                  Batalkan
                </v-btn>
                <v-row v-if="is_edit" no-gutters class="mt-5">
                  <v-col cols="3">
                     <v-btn 
                      large 
                      depressed
                      outlined
                      color="red"
                      class="text-none">
                      Hapus Akun
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="ml-4">
                    <p class="text-grey text-body-2">Dengan menekan tombol Hapus Akun, Anda akan menghapus permanen akun tersebut.</p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
  </v-container>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue';
import db from '../../firebase/db';

export default {
    name: "UserManager",
    components: { Breadcrumb },
    data() {
      return {
          items: [
          { text: 'Daftar Peserta', to: '/users'},
        ],
        nama_lengkap: '',
        jenis_kelamin:'',
        provinsi: '',
        kabupaten: '',
        universitas_impian: '',
        jurusan_impian: '',
        asal_sekolah: '',
        no_hp: '',
        genders: [
          "Laki-laki",
          "Perempuan"
        ],
        selected_file: null,
        list_provinsi: [],
        list_kabupaten: [],
        list_ptn: [],
        list_jurusan: [],
        is_kabupaten_disabled: true,
        is_jurusan_disabled: true,
        url: "https://firebasestorage.googleapis.com/v0/b/brilliantz-edu.appspot.com/o/users%2Fphotos.png?alt=media&token=0d015a23-de82-4aef-9a5b-1dfecf9bd51a",
        is_edit: false,
        header: ''
      }
    },
    methods: {
      async getProvinsi() {
        const query = await db.collection("config").where("type", "==", "list_provinsi").get()
        query.forEach((doc) => {
          this.list_provinsi.push(...doc.data().data)
        })
      },
      async getPtn() {
        const query = await db.collection("config").where("type", "==", "list_ptn").get()
        query.forEach((doc) => {
          this.list_ptn.push(...doc.data().data)
        })
      },
      async onProvinsiChange() {
        this.getListKabupaten(this.provinsi)
      },
      async onUniversitasChange() {
        this.getListJurusan(this.universitas_impian)
      },
      async getListJurusan(universitas_impian) {
        this.list_jurusan = []
        const key = `list_jurusan_${universitas_impian.toLowerCase().replaceAll(" ", "_")}`
        const query = await db.collection("config").where("type", "==", key).get()
        query.forEach((doc) => {
          this.list_jurusan.push(...doc.data().data)
        })
        this.is_jurusan_disabled = false
      },
      async getListKabupaten(provinsi) {
        this.list_kabupaten = []
        const key = `list_kabupaten_${provinsi.toLowerCase().replaceAll(" ", "_")}`
        const query = await db.collection("config").where("type", "==", key).get()
        query.forEach((doc) => {
          this.list_kabupaten.push(...doc.data().data)
        })
        this.is_kabupaten_disabled = false
      },
      chooseFile() {
        this.$refs.uploader.click()
      },
      onFileChanged(e) {
        this.selectedFile = e.target.files[0]
        this.url = URL.createObjectURL(this.selectedFile);
      },
      addUser() {
        console.log(this.nama_lengkap, this.jenis_kelamin, this.provinsi, this.universitas_impian);
      },
      checkIfEdit() {
        const path = this.$route.path.split("/")
        if (path.includes("edit")) {
          this.is_edit = true
        } 
        return path
      },
      async populateData(data) {
        await this.getListKabupaten(data.provinsi)
        await this.getListJurusan(data.universitas_impian)
        this.nama_lengkap = data.nama_lengkap
        this.asal_sekolah = data.asal_sekolah
        this.kabupaten = data.kabupaten
        this.jurusan_impian = data.jurusan_impian
        this.email = data.email
        this.jenis_kelamin = data.jenis_kelamin
        this.provinsi = data.provinsi
        this.universitas_impian = data.universitas_impian
        this.no_hp = data.no_hp
        this.url = data.foto_profil
      }
    },
    async mounted() {
      const path = this.checkIfEdit()
      const userId = path[3]
      this.getProvinsi()
      this.getPtn()

      if (this.is_edit) {
        // breadcrumb
        this.items.push(
          { text: 'Detail Pengguna', to: `/users/detail/${userId}` },
          { text: 'Edit Pengguna', to: `/users/edit/${userId}` }
        )

        // header
        this.header = 'Edit Pengguna'

        // populate item
        const doc = await db.collection("users").doc(userId).get()
        const data = doc.data()
        this.populateData(data)
      } else {
        // breadcrumb
        this.items.push(
          { text: 'Tambah Pengguna', to: '/users/add' }
        )

        // header
        this.header = 'Tambah Pengguna'
      }
    }
}
</script>

<style>

</style>