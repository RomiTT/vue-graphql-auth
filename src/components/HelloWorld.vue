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
import { getTotalNumberOfUsers, takeUsers } from '../graphql/users/queries'
import { signup, login, logout, deleteUser } from '../graphql/users/mutations'
import { subscribeOnAllEvents } from '../graphql/users/subscriptions'

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
        const result = await getTotalNumberOfUsers(this.$apollo)
        console.log(result.data)  
      }
      catch (err) {
        console.log(err)
      }
    },

    async takeUsers(offset, count) {
      try {
        const result = await takeUsers(this.$apollo, offset, count)
        console.log(result.data)
      }
      catch (err) {
        console.log(err)
      }
    },

    async deleteUser(email) {
      try {
        const result = await deleteUser(this.$apollo, email)
        console.log(result.data)
      }
      catch (err) {
        console.log(err)
      }
    },

    async signupTest() {
      try {
        const result = await signup(this.$apollo, "vue@email.com", "3333", "Apollo", "Vue")
        console.log(result.data)
      }
      catch (err) {
        console.log(err)
      }
    },

    async loginTest() {
      try {
        const result = await login(this.$apollo, "bowgum.kim@gmail.com", "1111")
        console.log(result.data)
        onLogin(this.$apollo.provider.defaultClient, result.data.login.token)
      }
      catch (err) {
        console.log(err)
      }
    },

    async logoutTest() {
      try {
        const result = await logout(this.$apollo)
        console.log(result.data)       
        this.subscriptionOnAllEvents.unsubscribe()
        onLogout(this.$apollo.provider.defaultClient)
      }
      catch (err) {
        console.log(err)
      }
    },

    subscribeOnAllEvents() {
      try {
        const subscriber = subscribeOnAllEvents(this.$apollo)
        console.log( this.subscriptionOnAllEvents)

        this.subscriptionOnAllEvents= subscriber.subscribe(result => {
          console.log(`onAllEvents: ${result.data.subscribeOnAllEvents.eventName}`)
        })
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
