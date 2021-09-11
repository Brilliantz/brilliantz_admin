<template>
  <v-breadcrumbs
        :items="this.getBreadcrumbs()"
        large
    >
        <template v-slot:item="{ item }">
        <v-breadcrumbs-item
            exact
            class="my-breadcrumb"
            :href="item.to"
        >
            {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>

<script>
import BreadcrumbManager from '../mixins/BreadcrumbManager';

export default {
    name: "Breadcrumb",
    mixins: [BreadcrumbManager],
    props: {
        items: Array
    },
    created() {
      this.setBreadcrumbs(this.items);
    }
}
</script>

<style>

</style>