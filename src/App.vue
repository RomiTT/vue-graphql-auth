<template>
  <v-app>
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <v-content>
        <h2>Loggined: {{$store.getters.isLoggined}}</h2>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>      
    </div>
  </v-app>
</template>

<script>
import { getAuthTokenName } from './vue-apollo'
import { validateToken } from './graphql/users/queries'

export default {
  created: async function () {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(getAuthTokenName(), token)
      if (token !== null) {
        // validate token
        try {
          var result = await validateToken(this.$apollo, token)
          this.$store.commit('changeLoginState', {value: result.data.validateToken})

          if (result.data.validateToken === false) {
            localStorage.removeItem(getAuthTokenName())
          }
        }
        catch (err) {
          this.$store.commit('changeLoginState', {value: false})
          localStorage.removeItem(getAuthTokenName())
        }      
      }
      else {
        this.$store.commit('changeLoginState', {value: false})
      }
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
