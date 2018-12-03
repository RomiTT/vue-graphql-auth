import Vue from 'vue'
import Vuex from 'vuex'
import { onLogin, onLogout } from './vue-apollo'
import * as query from './graphql/users/queries'
import * as mutation from './graphql/users/mutations'
import * as subscription from './graphql/users/subscriptions'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initializedApp: false,
    user: null,
    subscriptionOnAllEvents: {
      unsubscribe: function () {}
    }
  },

  getters: {
    isAppInitialized: (state) => {
      return state.initializedApp
    },
    isLoggined: (state) => {
      return state.user !== null
    },

    user: (state) => {
      return state.user
    }
  },

  mutations: {
    initializeOK(state) {
      state.initializedApp = true;
    },

    setUser(state, payload) {
      state.user = payload.user
      localStorage.setItem('user', JSON.stringify(state.user))
      
    },

    clearUser(state) {
      state.user = null      
      localStorage.removeItem('user')
    },    

    loadUser(state) {
      const user = localStorage.getItem('user')
      if (user !== null) {
        state.user = JSON.parse(user)
      }
    }
  },

  actions: {
    login(context, {apollo, email, password}) {
      mutation
        .login(apollo, email, password)
        .then((result) => {
          console.log(result.data)                    
          onLogin(apollo.provider.defaultClient, result.data.login.token)
          result.data.login.token = ''
          context.commit('setUser', {user:result.data.login})
        })
        .catch((err) => {
          console.error(err)
        })
    },

    logout(context, {apollo}) {
        mutation
          .logout(apollo)
          .then((result) => {
            console.log(result.data)
            context.dispatch('unsubscribeAll')
            onLogout(apollo.provider.defaultClient)
            context.commit('clearUser')
          })
          .catch((err) => {
            console.error(err)
          })
    },

    subscribeOnAll(context, {apollo, callback}) {
      try {
        const subscriber = subscription.subscribeOnAllEvents(apollo)
        context.state.subscriptionOnAllEvents = subscriber.subscribe(result => {
          callback(result)
        })
      } catch (err) {
        console.log(err)
      }
    },

    unsubscribeAll(context) {
      context.state.subscriptionOnAllEvents.unsubscribe()
      context.state.subscriptionOnAllEvents = {
        unsubscribe: function () {}
      }
    }
  }
})