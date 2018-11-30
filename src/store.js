import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggined: false
  },
  getters: {
    isLoggined: function(state) {
      return state.loggined
    }
  },
  mutations: {
    changeLoginState: function(state, payload) {
      state.loggined = payload.value
    }
  }
})