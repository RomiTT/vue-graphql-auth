<template>  
  <div id="app">
    <v-app>
      <v-navigation-drawer fixed v-model="drawer" app>
        <v-list dense>
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/about">
            <v-list-tile-action>
              <v-icon>info</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar dark color="primary" fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">GraphQL Application</v-toolbar-title>
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
  data: () => {
    return {
      drawer: null
    }
  },

  computed: {

  },

  methods: {
  },

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

.content-root {
  padding:0px;
}
.side-bar {
  background:silver;
  padding-right:1px;
}

.active-side-bar-item {
  background: gray;
}

.main-content {
  background:white;
}

.item {
  margin:5px;
}
</style>
