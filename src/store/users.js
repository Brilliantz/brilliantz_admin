import { firestoreAction } from 'vuexfire';
import db from '@/firebase/db';

function state() {
    return {
        usersData: [],
    }
}

const mutations = {
    resetUsersState(state) {
        state.usersData = [];
    }
}

const getters = {
    getUsersData(state) {
        return state.usersData;
    }
}

const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('usersData', db.collection('users'));
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}