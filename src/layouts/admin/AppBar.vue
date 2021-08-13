<template>
  <div>
    <v-app-bar
        id="app-bar"
        absolute
        app
        color="#fafafa"
    >
      <v-btn
          class="mr-3"
          elevation="1"
          fab
          small
          @click="setDrawer(!drawer)"
      >
        <v-icon v-if="value">
          mdi-view-quilt
        </v-icon>

        <v-icon color="black" v-else>
          mdi-menu
        </v-icon>
      </v-btn>

      <v-toolbar-title
          class="hidden-sm-and-down font-weight-light"
          v-text="$route.meta.title"
      />

      <v-spacer />

      <div class="mx-3" />

<!--
      <v-menu
          bottom
          left
          offset-y
          origin="top right"
          transition="scale-transition"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                  v-bind="attrs"
                  depressed
                  v-on="{...menu, ...tooltip}"
                  color="transparent"
              >
                <span class="text-black">Content</span>
                <v-icon
                    right
                >
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <span>Show All Content</span>
          </v-tooltip>
        </template>
        <v-list
            :tile="false"
            nav
        >
          <div class="d-flex justify-center flex-column align-center">
            <v-list-item
                v-for="(n, i) in contents.slice(0, 7)"
                :key="`item-${i}`"
                @click="() => ''"
            >
              <v-icon left>
                {{ n.icons}}
              </v-icon>
              <v-list-item-title v-text="n.words" />
            </v-list-item>
            <v-divider class="pa-1 width-full"></v-divider>
            <span class="text-uppercase text-center text-show-all-content">
                SHOW ALL CONTENT
              </span>
          </div>
        </v-list>
      </v-menu>
-->
<!--
      <v-menu
          bottom
          left
          offset-y
          origin="top right"
          transition="scale-transition"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                  class="ml-2"
                  min-width="0"
                  text
                  v-bind="attrs"
                  v-on="{...menu, ...tooltip}"
              >
                <v-badge
                    color="red"
                    overlap
                    bordered
                >
                  <template v-slot:badge>
                    <span>5</span>
                  </template>

                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <span>Active Alert</span>
          </v-tooltip>
        </template>
        <v-list
            :tile="false"
            nav
        >
            <v-list-item
              v-for="(n, i) in notifications"
              :key="`item-${i}`"
              @click="() => ''"
            >
              <v-list-item-title v-text="n" />
            </v-list-item>
        </v-list>
      </v-menu>
-->

      <v-menu
          bottom
          left
          offset-y
          origin="top right"
          transition="scale-transition"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                  class="ml-2"
                  min-width="0"
                  text
                  v-bind="attrs"
                  v-on="{ ...tooltip, ...menu }"
              >
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <span>{{ user ? user.name : "" }}</span>
          </v-tooltip>
        </template>
        <v-list
            :tile="false"
            nav
        >
          <v-list-item
            v-for="(n, i) in accounts"
            :key="`item-${i}`"
            @click="$router.push({name: n.route_name})"
          >
            <v-icon left>
              {{ n.icons }}
            </v-icon>
            <v-list-item-title v-text="n.words" />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

  </div>
</template>

<script>
  // Utilities
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'AdminDashboardAppBar',

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
      accounts: [
        {
          icons: 'mdi-account-circle',
          words: 'My Profile',
          route_name: 'user.profile',
        },
        {
          icons: 'mdi-help',
          words: 'Switch Solution',
          route_name: 'dashboard'
        },
        {
          icons: 'mdi-logout',
          words: 'Sign Out',
          route_name: 'logout'
        }
      ],
      contents: [
        {
          icons: 'mdi-view-dashboard',
          words : 'Valley Water'
        },
        {
          icons: 'mdi-view-dashboard',
          words : 'Valley Water'
        },
        {
          icons: 'mdi-view-dashboard',
          words : 'Valley Water'
        },
        {
          icons: 'mdi-view-dashboard',
          words : 'Valley Water'
        },
        {
          icons: 'mdi-view-dashboard',
          words : 'Valley Water'
        },
        {
          icons: 'mdi-view-dashboard',
          words : 'Valley Water'
        }
      ]
    }),

    computed: {
      ...mapState('setting', ['drawer']),
      ...mapState('account', ['user']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'setting/SET_DRAWER',
      }),
    },
  }
</script>

<style lang="scss" scoped>
 .text-black {
   color: black;
 }
 .text-show-all-content {
   color: #1976d2;
 }
 .width-full{
   width: 100%;
 }
</style>
