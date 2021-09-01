import { firestoreAction } from 'vuexfire';
import db from '../firebase/db';

function state() {
    return {
        transaksiData: [],
    }
}

const mutations = {
    resetTransaksiData(state) {
        state.transaksiData = [];
    }
}

const getters = {
    getTransaksiData(state) {
        return state.transaksiData;
    }
}

const actions = {
    init: firestoreAction(({ bindFirestoreRef }, programId) => {
        bindFirestoreRef('transaksiData', db.collection('transaksi').where('program_id', '==', programId).orderBy('created_at', 'desc'));
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}