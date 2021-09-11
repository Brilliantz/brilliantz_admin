function state() {
    return {
        breadcrumbs: []
    }
}

const mutations = {
    set(state, breadcrumbs) {
        state.breadcrumbs = breadcrumbs;
    },
    push(state, breadcrumb) {
        state.breadcrumbs.push(breadcrumb)
    },
    pop(state) {
        state.breadcrumbs.pop();
    },
    replace(state, payload) {
        const index = state.breadcrumbs.findIndex((breadcrumb) => {
            return breadcrumb.text === payload.find;
        });

        if (index) {
            state.breadcrumbs.splice(index, 1, payload.replace);
        }
    },
    empty(state) {
        state.breadcrumbs = [];
    }
}

const getters = {
    getBreadcrumbs(state) {
        return state.breadcrumbs
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}