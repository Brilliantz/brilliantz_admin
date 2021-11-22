<template>
  <div>
    <v-toolbar flat class="topbar">
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-img
            max-height="50"
            max-width="200"
            src="../../assets/logo_brilliantz.png"
          ></v-img>
          <v-spacer/>
        </v-row>
      </v-container>
    </v-toolbar>
    <v-main>
      <v-container
        class="transparent"
        fluid fill-height>
        <v-layout
          class="transparent"
          align-center
          justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-0">
              <v-card-text>
                <h1 class="my-4 big-text">Hai Admin,</h1>
                <p class="my-4 subtext">Login dulu yuk</p>
              </v-card-text>
              <v-card-text>
                <v-form>
                  <v-text-field
                    outlined
                    name="login"
                    v-model="email"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    outlined
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import firebase from '../../firebase/firebase'
export default {
    name: "Login",
    data: () => ({
      email: "",
      password: "",
      error: null
    }),
  methods: {
    submit() {
      console.log(this.email)
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ path: '/' })
          this.$store.dispatch('onNotificationSuccess', 'Success Login', { root: true})
        })
        .catch(error => {
          this.$store.dispatch('onNotificationError', error.message, { root: true})
        });
    }
  }
}
</script>

<style scoped>
.big-text{
  font-weight: bold;
  size: 1.5rem;
}
.subtext{

}
</style>
