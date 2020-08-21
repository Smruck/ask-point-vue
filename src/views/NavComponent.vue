<template>
  <div id="nav">
    <template v-if="!logged">
      <template v-if="inlogreg">
        <router-link to="/login" class="nav-text">Login</router-link>
        <router-link to="/register" class="nav-text">Register</router-link>
        <router-link to="/select" class="nav-text">Select event</router-link>
        <template v-if="inevent">
          <router-link to="/messages" class="nav-text">{{eventName}}</router-link>
        </template>
        <router-link  to="/about" class="nav-text">About</router-link>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-text">Login</router-link>
        <router-link to="/select" class="nav-text">Select event</router-link>
        <template v-if="inevent">
          <router-link to="/messages" class="nav-text">{{eventName}}</router-link>
        </template>
        <router-link to="/about" class="nav-text">About</router-link>
      </template>
    </template>
    <template v-if="logged">
      <router-link to="/profile" class="nav-text">Profile</router-link>
      <router-link to="/select" class="nav-text">Select event</router-link>
      <template v-if="inevent">
        <router-link to="/messages" class="nav-text">{{eventName}}</router-link>
      </template>
      <template v-if="isAdmin" >
        <router-link  to="/archive" class="nav-text">Archive</router-link>
      </template>
      <router-link  to="/about" class="nav-text">About</router-link>
  </template>
  </div>
</template>

<script>
const state = require("../services/state.js");

export default {
  name: "NavComponent",
  computed: {
    logged() { return !!state.userstate.key; },
    inevent() { return !!state.eventstate.key; },
    eventName() { return state.eventstate.name; },
    isAdmin() { return state.userstate.key === state.eventstate.admin; },
    inlogreg() {
      return (
        this.$router.currentRoute.name === "login" ||
        this.$router.currentRoute.name === "register" ||
        this.$router.currentRoute.name === "forgotpassword"
      );
    },
  }
};
</script>

<style scoped>
#nav {
  position: fixed;
  display: table;
  margin: 0 auto;
 
}
#nav a {
  font-weight: bold;
  color: #7d848b;
}
#nav a.router-link-exact-active {
  color: #01c288;
 }
.nav-text {
  color: rgb(105, 103, 103);
  margin-top: 3px;
  margin: 24px;
  font-family: sans-serif;
  letter-spacing: 3px;
}
</style>