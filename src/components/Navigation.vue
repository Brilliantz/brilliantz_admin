<template>
  <div>
    <v-navigation-drawer app permanent class="nav-drawer">
        <v-img
            class="mt-5 mx-auto"
            max-height="50"
            max-width="200"
            src="../assets/logo_brilliantz.png"
        ></v-img>

        <v-list
            class="pa-0"
        >
            <v-list-item-group
                light
                color="#4a47d6">
                <template
                    v-for="item in items">
                    <v-list-group
                        :key="item.title"
                        v-if="item.hasChild"
                        :value="true"
                        :prepend-icon="item.icon"
                        no-action
                        class="my-2"
                        color="#4a47d6"
                    >
                        <template v-slot:activator>
                            <v-list-item-title class="font-weight-medium text-caption">{{ item.title }}</v-list-item-title>
                        </template>

                        <v-list-item
                            v-for="program in programs"
                            :key="program.name"
                            ripple
                            link
                            router
                            :to="program.link"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="font-weight-medium text-caption">{{ program.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                        :key="item.title"
                        v-else
                        link
                        ripple
                        class="my-2"
                        router
                        :to="item.link"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title class="font-weight-medium text-caption">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data: () => ({
        items: [
        { title: 'Daftar Peserta', icon: 'mdi-collage', link: '/users', hasChild: false },
        { title: 'Daftar Program', icon: 'mdi-clipboard-text', link: '/tests', hasChild: true },
        { title: 'Daftar Transaksi', icon: 'mdi-script-text', link: '/transaksi', hasChild: false },
        { title: 'Submisi', icon: 'mdi-page-previous-outline', link: '/submisi', hasChild: false },
        { title: 'Ranking', icon: 'mdi-podium', link: '/ranking', hasChild: false },
        ],
        programs: [
            { title: 'Tryout', link: '/tryout' },
            { title: 'Webinar', link: '/webinar' },
            { title: 'Bimbingan Prakuliah', link: '/bimbingan-prakuliah' },
        ]
    })
}
</script>

<style scoped>

#divider{
  border: 0.5px solid #F2F2F2;
}
</style>
