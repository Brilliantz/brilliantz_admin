<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor === 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    temporary
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props" v-if="barImage">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <div />

      <template v-for="(item, i) in items">
        <base-item-group
            v-if="item.children"
            :key="`group-${i}`"
            :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
            v-else
            :key="`item-${i}-x`"
            :item="item"
        />
      </template>

      <div />
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {mapState} from 'vuex'

  export default {
    name: 'AdminDashboardDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/admin/dashboard',
        },
        // {
        //   title: 'Tester',
        //   icon: 'mdi-cellphone-link',
        //   to: '/dashboard/tester',
        // },
        {
          title: 'Category',
          icon: 'mdi-format-list-numbered',
          to: '/admin/category',
        },
      ],
    }),

    computed: {
      ...mapState('setting', {drawerStatus: 'drawer', barColor: "barColor", barImage: "barImage"}),
      drawer: {
        get() {
          return this.drawerStatus;
        },
        set(val) {
          return !val ? this.$store.commit('setting/SET_DRAWER', val) : null
        }
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '../../../../node_modules/vuetify/src/styles/tools/rtl'

  .class--inherit
    color: rgba(0, 0, 0, 0.54) !important
    text-decoration: none
    text-underline: none

  .no--padding--child
    padding-left: 3rem !important

  .pointer--click
    cursor: pointer

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
