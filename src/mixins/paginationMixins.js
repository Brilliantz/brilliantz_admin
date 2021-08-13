import _ from 'lodash'

export default {
    beforeDestroy() {
        this.setFilter({
            per_page: 5,
            page: 1,
            total: 12,
            search: null,
            sortBy: [],
            desc: []
        })
        this.fetchAPI()
    },
    methods: {
        onPaginateClick: _.throttle(function (page){
            this.setFilter({
                page: page
            })
            this.fetchAPI()
        }, 1000),
        updateItemsPerPage: _.throttle(function (itemsPerPage) {
            this.setFilter({
                per_page: itemsPerPage
            })
            this.fetchAPI()
        }, 500),
    }
}
