<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="margin:5px"><v-btn color="info" @click="signupTest()">Signup Test</v-btn></div>
    <div style="margin:5px"><v-btn color="info" @click="loginTest()">Login Test</v-btn></div>
    <div style="margin:5px"><v-btn color="info" @click="logoutTest()">Logout Test</v-btn></div>
    
    <div style="margin:5px"><v-btn color="info" @click="getTotalNumberOfUsers()">Get total number of users</v-btn></div>
    <div style="margin:5px"><v-btn color="info" @click="takeUsers(offset=0, count=10)">Take users</v-btn></div>
    <div style="margin:5px"><v-btn color="info" @click="deleteUser(email='vue@email.com')">Delete user</v-btn></div>
    <div style="margin:5px"><v-btn color="info" @click="subscribeOnAllEvents()">Subscribe all events</v-btn></div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { onLogin, onLogout } from '../vue-apollo'
import * as query from '../graphql/users/queries'
import * as mutation from '../graphql/users/mutations'
import * as subscription from '../graphql/users/subscriptions'

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: "Welcome to my application!"
    }
  },
  data: function() {
    return {
      subscriptionOnAllEvents: {
        unsubscribe: function() {}
      }
    }
  },
  methods: {
    async getTotalNumberOfUsers() {
      try {
        const result = await query.getTotalNumberOfUsers(this.$apollo)
        console.log(result.data)  
      }
      catch (err) {
        console.log(err)
      }
    },

    async takeUsers(offset, count) {
      try {
        const result = await query.takeUsers(this.$apollo, offset, count)
        console.log(result.data)
      }
      catch (err) {
        console.log(err)
      }
    },
    
    async deleteUser(email) {
      try {
        const result = await mutation.deleteUser(this.$apollo, email)
        console.log(result.data)
      }
      catch (err) {
        console.log(err)
      }
    },

    async signupTest() {
      try {
        const result = await mutation.signup(this.$apollo, "vue@email.com", "3333", "Apollo", "Vue")
        console.log(result.data)
      }
      catch (err) {
        console.log(err)
      }
    },

    async loginTest() {
      //this.$store.dispatch('login', {apollo:this.$apollo, email:"bowgum.kim@gmail.com", password:"1111"})
      this.$store.dispatch('login', {apollo:this.$apollo, email:"vue@email.com", password:"3333"})
    },

    async logoutTest() {
      this.$store.dispatch('logout', {apollo:this.$apollo})
    },

    subscribeOnAllEvents() {
      this.$store.dispatch('subscribeOnAll', {apollo:this.$apollo, callback: (result) => {
        console.log(result.data.subscribeOnAllEvents)
      }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
