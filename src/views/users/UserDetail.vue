<template>
    <v-container fluid>
        <v-row no-gutters class="mt-3 ml-3">   
            <Breadcrumb :items="items"/>
        </v-row>
        <v-row no-gutters class="ml-8 mt-3">
            <p class="text-h4 font-weight-bold">Detail Pengguna</p>
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
                @click.prevent="editProfile"
                class="text-none mt-4">
                <v-icon left>
                    mdi-pencil
                </v-icon>
                  Edit Profil
                </v-btn>
              </v-col>
              <v-col cols="4" class="ml-5">
                <p class="text-grey">Nama Lengkap</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ nama_lengkap }}</p>
                <p class="text-grey">Asal Sekolah</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ asal_sekolah }}</p>
                <p class="text-grey">Kabupaten</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ kabupaten }}</p>
                <p class="text-grey">Jurusan Impian</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ jurusan_impian }}</p>
                <p class="text-grey">Email</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ email }}</p>
              </v-col>
              <v-col cols="4">
                <p class="text-grey">Jenis Kelamin</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ jenis_kelamin }}</p>
                <p class="text-grey">Provinsi</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ provinsi }}</p>
                <p class="text-grey">Universitas Impian</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ universitas_impian }}</p>
                <p class="text-grey">No HP / Whatsapp</p>
                <p class="font-weight-bold text-subtitle-1 mt-n4">{{ no_hp }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue'
import db from '../../firebase/db'

export default {
    name: "UserDetail",
    components: { Breadcrumb },
    data() {
        return {
            items: [
                { text: 'Daftar Peserta', to: '/users'},
            ],
            url: '',
            nama_lengkap: '',
            asal_sekolah: '',
            kabupaten: '',
            jurusan_impian: '',
            email: '',
            jenis_kelamin: '',
            provinsi: '',
            universitas_impian: '',
            no_hp: ''
        }
    },
    methods: {
        editProfile() {
            const userId = this.$route.path.split("/")[3]
            this.$router.push({ path: `/users/edit/${userId}` })
        }
    },
    async mounted() {
        const userId = this.$route.path.split("/")[3]
        const query = await db.collection("users").doc(userId).get()
        if (query.exists) {
            const data = query.data()
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

        this.items.push({
            text: 'Detail Pengguna', to: this.$route.path
        })
    }
}
</script>

<style>

</style>