import { firestoreAction } from 'vuexfire';
import db from '../firebase/db';

function state() {
    return {
        submisiData: [],
    }
}

const mutations = {
    resetSubmisiState(state) {
        state.submisiData = [];
    }
}

const getters = {
    getSubmisiData(state) {
        return state.submisiData;
    }
}

const actions = {
    init: firestoreAction(({ bindFirestoreRef }, testId) => {
        bindFirestoreRef('submisiData', db.collection('submisi').where('tryout_id', '==', testId));
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}