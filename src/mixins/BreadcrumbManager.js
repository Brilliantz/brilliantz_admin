import { mapMutations, mapGetters } from 'vuex';

export default {
    methods: {
        ...mapMutations('breadcrumbs', {
            setBreadcrumbs: 'set',
            pushBreadcrumb: 'push',
            popBreadcrumb: 'pop',
            replaceBreadcrumb: 'replace',
            emptyBreadcrumbs: 'empty'
        }),
        ...mapGetters('breadcrumbs', {
            getBreadcrumbs: 'getBreadcrumbs'
        })
    }
}