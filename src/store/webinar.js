import { firestoreAction } from 'vuexfire';
import db from '@/firebase/db';

function state() {
    return {
        webinarData: [],
    }
}

const mutations = {
    resetWebinarState(state) {
        state.webinarData = [];
    }
}

const getters = {
    getWebinarData(state) {
        return state.webinarData;
    }
}

const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('webinarData', db.collection('webinar').orderBy('waktu_mulai', 'desc'));
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}