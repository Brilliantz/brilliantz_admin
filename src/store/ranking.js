import { firestoreAction } from 'vuexfire';
import db from '../firebase/db';

function state() {
    return {
        rankingData: [],
    }
}

const mutations = {
    resetRankingState(state) {
        state.rankingData = [];
    }
}

const getters = {
    getRankingData(state) {
        return state.rankingData;
    }
}

const actions = {
    init: firestoreAction(({ bindFirestoreRef }, testId) => {
        bindFirestoreRef('rankingData', db.collection('ranking').where('tryout_id', '==', testId).orderBy("total_nilai", "desc"));
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}