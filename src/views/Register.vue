<template>
  <div class="register">
    <div class="navcontainer">
      <NavComponent />
    </div>
    <div class="container">
      <div class="register-form">
        <form class="form" @submit.prevent="register">
          <div class="form-group">
            <input
              type="text"
              id="email"
              v-focus
              class="form-control"
              name="email"
              placeholder=" Email..."
              spellcheck="false"
              oninput="setCustomValidity('')"
              v-model="email"
              @keyup="emailRepo"
            />
          </div>
          <br>
          <div class="form-group">
            <input
              type="text"
              id="username"
              class="form-control"
              name="username"
              placeholder=" Username..."
              spellcheck="false"
              oninput="setCustomValidity('')"
              v-model="username"
            />
          </div>
          <button type="submit" id="btn" class="btn btn-primary-outline regbtn"><b class="textbtn">Register</b></button>
        </form>
       <br>
        <div v-if="showLoader">
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../views/Loader.vue";
import NavComponent from "../views/NavComponent.vue";

const registerService = require("../services/register-service.js");
const errorService = require("../services/custom-error.js");
const state = require("../services/state.js");

export default {
  name: "Register",
  data() {
    return {
      email: null,
      username: null,
      showLoader: false
    }; 
  },
  methods: {
    register: async function() {
      if(!this.email) { errorService.setError("Please type your email", "email"); return; }
      if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.email))) { errorService.setError("Please type correct email address", "email"); return;}
      if(!this.username) { errorService.setError("Please choose an username", "username"); return; }
      if(this.username.length > 30 || this.username.length < 3) { errorService.setError("Username should be between 3 and 30 symbols", "username"); return;}
      else if(!this.username.match('^[a-zA-Z0-9 ]+$')) { errorService.setError("Username should contain only letters numbers and spaces", "username"); }
      else { 
        this.showLoader = true;
        const regResult = await registerService.register(this.$data); 
        if(regResult) { this.$router.push('checkemail'); }
        this.showLoader = false;
      }
    },
    emailRepo() { state.repo.email = this.email;  }
  },
  components: { Loader, NavComponent },
  created: function() { 
    if(state.userstate.key) { this.$router.push('select', this.$router); }
    if(state.repo.email) { this.email = state.repo.email; }
    state.repo.email = '';
  }
}
</script>

<style scoped>
.navcontainer {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  top: 50%;
  left: 50%;
}
.register {
  margin-top: 40px;
}
.textbtn {
  letter-spacing: 2px;
}
.regbtn {
  color: rgb(145, 144, 144);
  font-family: sans-serif;
  letter-spacing: 2px;
  font-size: 16px;
  margin-top: 34px;
  margin-left: 120px;
  width: 100px;
  text-align: center;
  transition: transform 0.3s ease;
}
.regbtn:hover {
  border-color: white;
  background-color: white;
  color: rgb(226, 98, 6);
  transform: scale(1.1);
}
.regbtn:active {
  opacity: 0.8;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}
.textbtn {
  letter-spacing: 2px;
}
::-webkit-input-placeholder {
  letter-spacing: 1px;
  font-size: 16px;
  color: grey;
  opacity: 0.6;
}
.register-form {
  width: 350px;
  position: absolute;
  top: 10%;
  left: 10%;
}
.regbtn:hover {
  font-weight: 544;
  color: rgb(170, 80, 16);
}
.form-group {
  background: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 6px;
}
.register-form {
  position: absolute;
  top: 30%;
  right: 10%;
  margin: 0 auto;
  animation: fadein 1s;
  -moz-animation: fadein 1s;
  -webkit-animation: fadein 1s;
  -o-animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
    width: 500px;
  }
  to {
    opacity: 1;
    width: 350px;
  }
}
.boxhead a {
  text-decoration: none;
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
.form-control {
  border-radius:  6px;
}
.form-control:focus {
  border-color: #6fb1dd;
  box-shadow: 0px 2px 2px rgba(60, 61, 63, 0.075) inset,
    0px 0px 8px rgba(85, 193, 243, 0.5);
}
</style>