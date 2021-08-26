<template>
  <v-toolbar flat class="topbar">
        <v-container>
            <v-row align="center" justify="center">
                <v-spacer/>
                <v-avatar size="36">
                    <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                    >
                </v-avatar>
                <p class="ml-4 my-auto text-subtitle-2 text-right">Muhammad Ridlo</p>
            </v-row>
        </v-container>
    </v-toolbar>
</template>

<script>
export default {
    name: "TopBar",
    data: () => ({
        cari: ""
    }),
    }
</script>

<style scoped>
.topbar {
    border-bottom: #E0E0E0 1px solid;
}
</style>