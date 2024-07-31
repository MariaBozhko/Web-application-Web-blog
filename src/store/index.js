import { createStore } from 'vuex';

const store = createStore({
  state: {
    globalState: {
        t: '',
        isAuthenticated: false,
        user:false
      }
  },
  mutations: {
    updateT(state, newToken) {
      state.globalState.t = newToken;
    },
    setAuthState(state, isAuthenticated) {
      state.globalState.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      state.globalState.user = user;
    }
  },
});

export default store;