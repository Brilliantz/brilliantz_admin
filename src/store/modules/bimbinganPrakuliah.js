import { firestoreAction } from 'vuexfire';
import db from '@/firebase/db';

function state() {
    return {
        bimbinganData: [],
    }
}

const mutations = {
    resetBimbingaState(state) {
        state.bimbinganData = [];
    }
}

const getters = {
    getBimbinganData(state) {
        return state.bimbinganData;
    }
}

const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('bimbinganData', db.collection('bimbingan_prakuliah').orderBy('waktu_mulai', 'desc'));
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
