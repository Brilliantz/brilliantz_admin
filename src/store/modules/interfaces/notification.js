
export default {
  namespaced: true,
  state: {
    snackbar: {
      message: null,
      status: null,
      drawer: false,
    },
    errors: {},
  },
  mutations: {
    setSnackbar(state, {message, status, drawer}) {
      state.snackbar = {
        message: message,
        status: status,
        drawer: drawer
      }
    },
    setError(state, e) {
      state.errors = e.response.data.errors
      setTimeout(() => {
        state.errors = {}
      }, 3000)
    }
  },
}