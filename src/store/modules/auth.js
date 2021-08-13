import Vue from 'vue'
import {MUTATIONS as BASE_MUTATION, STATUS} from './../baseTypes';

// Token lifetime needs to be converted to javascript
const tokenLifetime = (process.env.VUE_APP_SESSION_LIFETIME || 120) * 60000

const url = {
  LOGIN: '/auth/token',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/password/email',
  RESET_PASSWORD: '/auth/password/reset',
  VERIFY_EMAIL: '/auth/email/verify',
  RESEND_VERIFY_EMAIL: '/auth/email/resend',
}

const defaultState = {
  status: STATUS.IDLE,
  last_fetched: null,
  data: {
    token: null,
    token_type: 'Bearer'
  }
}

const state = {...defaultState}

const MUTATION = {
  ...BASE_MUTATION,
  SAVE_CREDENTIALS: 'save_credentials',
  TOKEN_FETCHED: 'token_fetched'
}

const mutations = {
  [MUTATION.CHANGE_STATUS](state, payload) {
    state.status = payload
  },
  [MUTATION.SAVE_CREDENTIALS](state, payload) {
    state.data = {...state.data, ...payload.data}
  },
  [MUTATION.TOKEN_FETCHED](state) {
    state.last_fetched = new Date()
  },
  [MUTATION.RESET_STATE](state) {
    state.status = STATUS.IDLE
    state.data = {
      token: null,
      token_type: 'Bearer'
    }
    state.last_fetched = null
  }
}

const actions = {
  async getToken({state, commit, dispatch}, data) {
    if (state.status === STATUS.IDLE) {
      commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)

      try {
        const response = await Vue.axios.post(url.LOGIN, data)

        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)
        commit(MUTATION.SAVE_CREDENTIALS, response.data)
        commit(MUTATION.TOKEN_FETCHED)

        await dispatch('fetchRoutesConfig', null, {root: true})
        //await dispatch('account/fetchUserProfile', null, {root: true})

        return response
      } catch (e) {
        commit('notification/setError', e, {root: true})
        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)
        throw e
      }
    }
    throw new Error('Resource busy!')
  },

  async resendEmailVerification({dispatch, commit}) {
    if (state.status === STATUS.IDLE) {
      commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)

      try {
        const response = await Vue.axios.get(url.RESEND_VERIFY_EMAIL)

        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)

        await dispatch('onNotificationSuccess', response.data.message, {root: true})

        return response
      } catch (e) {
        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)
        throw e
      }
    }
    throw new Error('Resource busy!')
  },

  async verifyEmail({dispatch, commit}, {userId, token}) {
    if (userId && token) {
      commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)

      try {
        let response = await Vue.axios.get(url.VERIFY_EMAIL + '/' + userId + '/' + token );

        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)
        //await dispatch('account/fetchUserProfile', null, {root: true})
        dispatch('onNotificationSuccess', response.data ? response.data.message : "Your email has been verified", {root: true})

        return response;
      }
      catch (e) {
        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)
        throw e
      }
    }
    throw new Error('Resource busy!')
  },

  async register({dispatch, commit}, data) {
    if (data) {
      commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)

      try {
        let response = await Vue.axios.post(url.REGISTER, data);

        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)
        commit(MUTATION.SAVE_CREDENTIALS, response.data)
        commit(MUTATION.TOKEN_FETCHED)

        await dispatch('fetchRoutesConfig', null, {root: true})
        //await dispatch('account/fetchUserProfile', null, {root: true})

        return response;
      }
      catch (e) {
        commit('notification/setError', e, {root: true})
        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)
        throw e
      }
    }

    throw new Error('No data found!')
  },

  async forgotPassword({ commit }, data) {
    if(data) {
      commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)

      try{
        let response = await Vue.axios.post(url.FORGOT_PASSWORD, data)

        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)

        return response
      }
      catch (e){
        commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)
        throw e
      }
    }
  },

  async resetPassword({ commit }, data) {
    if(data) {
      commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)
      try{
        let response = await Vue.axios.post(url.RESET_PASSWORD, data)

        commit(MUTATION.CHANGE_STATUS, STATUS.IDLE)

        return response
      }
      catch (e){
        commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)
        throw e
      }
    }
  },

  async boot({dispatch}) {
    await dispatch
  },

  async logout({state, commit, dispatch}) {
    if (state.status === STATUS.IDLE) {
      commit(MUTATION.CHANGE_STATUS, STATUS.FETCHING)
      let response = await Vue.axios.post(url.LOGOUT);
      await dispatch('onNotificationSuccess', response.data.message, {root: true})
      commit(MUTATION.RESET_STATE)

      localStorage.clear()
      sessionStorage.clear()

      return true
    }
    throw new Error('Resource busy!')
  }
}

const getters = {
  authenticated: state => {
    if (state.last_fetched) {
      const date = new Date(state.last_fetched)

      return date.getTime() < (date.getTime() + tokenLifetime)
    }

    return false
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
