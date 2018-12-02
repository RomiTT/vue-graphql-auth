<template>  
  <div id="app">
    <v-app>
      <v-toolbar dark color="primary">
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title class="white--text">Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>      

      <v-container style="padding:0px;" fill-height fluid>
        <v-layout>
          <v-flex md3 side-bar>
            <div id="nav">
              <v-card dark color="yellow">
                <v-card-text>
                  <router-link to="/">Home</router-link>
                </v-card-text>                
              </v-card>
              <v-card dark color="red">
                <v-card-text>
                  <router-link to="/about">About</router-link>
                </v-card-text>                
              </v-card>
            </div>
          </v-flex>
          <v-flex main-content>
            <v-content>
              <h2>Loggined: {{$store.getters.isLoggined}}</h2>
              <v-container fluid>
                <router-view/>
              </v-container>
            </v-content>   
          </v-flex>
        </v-layout>
      </v-container>   
    </v-app>
  </div>
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
.content-root {
  padding:0px;
}
.side-bar {
  background:silver;
}

.main-content {
  background:white;
}

.item {
  margin:5px;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding:5px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
