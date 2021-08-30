import { firestoreAction } from 'vuexfire';
import db from '@/firebase/db';

function state() {
    return {
        tryoutData: [],
    }
}

const mutations = {
    resetTryoutState(state) {
        state.tryoutData = [];
    }
}

const getters = {
    getTryoutData(state) {
        return state.tryoutData;
    }
}

const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('tryoutData', db.collection('tryout').orderBy("waktu_mulai", "desc"));
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}