<template>
  <div id="nav">
    <template>
        <template v-if="isLogged">
            <router-link to="/profile" class="nav-text">Profile</router-link>
        </template>
        <template v-else>
            <router-link to="/login" class="nav-text">Login</router-link>
        </template>
      <router-link to="/select" class="nav-text">Select event</router-link>
      <router-link to="/messages" class="nav-text">{{eventName}}</router-link>
    <template v-if="isAdmin" >
      <router-link  to="/archive" class="nav-text">Archive</router-link>
    </template>
     <template v-else >
      <router-link  to="/about" class="nav-text">About</router-link>
    </template>
    </template>
  </div>
</template>

<script>
const state = require("../services/state.js");

export default {
  name: "NavMessages",
  computed: { 
    eventName() { return state.eventstate.name; },
    isLogged() { return !!state.userstate.key; },
    isAdmin() { return state.userstate.key === state.eventstate.admin; },
  }
};
</script>

<style scoped>
#nav {
  z-index: 3;
  position: fixed;
  margin: 0 auto;
  display: table;
  animation: fadein 1s;
  -moz-animation: fadein 1s;
  -webkit-animation: fadein 1s;
  -o-animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#nav a {
  font-weight: bold;
  color: #7d848b;
}

#nav a.router-link-exact-active {
  color: #11b382;
}
.nav-text {
  color: rgb(105, 103, 103);
  margin-top: 3px;
  margin: 24px;
  font-family: sans-serif;
  letter-spacing: 3px;
}
</style>