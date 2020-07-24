<template>
  <div id="forgotpassword">
    <div class="navcontainer">
      <NavComponent />
    </div>
    <div class="container">
      <form @submit.prevent="send">
        <div class="form-group">
          <div class="fields">
            <input
              type="email"
              id="email"
              class="form-control"
              name="email"
              v-focus
              placeholder=" Your email..."
              spellcheck="false"
              oninput="setCustomValidity('')"
              v-model="email"
            />
          </div>
        </div>
        <br />
        <br />
        <button id="btn" class="button btn btn-outline logbtn">Get new password</button>
      </form>
      <br />
      <br />
      <div v-if="showLoader">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../views/Loader.vue";
import NavComponent from "../views/NavComponent.vue";

const forgotPassword = require("../services/forgotPassword-service.js");
const errorService = require("../services/custom-error.js");
const state = require("../services/state.js");

export default {
  name: "ForgotPassword",
  data: () => {
    return {
      email: null,
      showLoader: false
    };
  },
  methods: {
    send: async function() {
      this.showLoader = !this.showLoader;
      if(!this.email) { 
        this.showLoader = !this.showLoader; 
        errorService.setError("Type your email and we will send you a new password", "email"); 
        return; 
      }
      this.showLoader = true;
      const response = await forgotPassword.send(this.email); 
      if(response) { this.$router.push('checkemail'); }
        errorService.setError("Provided email address doesn't exist in the system", "email"); 
        this.showLoader = false;
    }
  },
  components: { Loader, NavComponent },
  created: function() { if(state.userstate.key) { this.$router.push('select'); }}
};
</script>

<style scoped>
.container {
  width: 380px;
  position: absolute;
  top: 53%;
  left: 50%;

  transform: translate(-50%, -50%);
  animation: fadeInAnimation ease 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
    height: 440px;
  }
  100% {
    opacity: 1;
    height: 200px;
  }
}
.form-group {
  background: white;

  border: 1px solid rgb(216, 214, 214);
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 6px;
}

::-webkit-input-placeholder {
  letter-spacing: 1px;
  font-size: 16px;
  color: grey;
  opacity: 0.6;
}

.logbtn {
  position: relative;
  top: 50%;
  left: 6.5%;
  font-family: sans-serif;
  letter-spacing: 2px;
  color: grey;
  font-size: 16px;
  margin-top: 0px;
  width: 300px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.logbtn:hover {
  border-color: white;
  background-color: white;
  color: rgb(170, 80, 16);
  transform: scale(1.1);
}
.logbtn:active {
  opacity: 0.8;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}

input[type="text"],
.form-control {
  background: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 3px;
}
.form-control:focus {
  border-color: #6fb1dd;
  box-shadow: 0px 2px 2px rgba(60, 61, 63, 0.075) inset,
    0px 0px 8px rgba(85, 193, 243, 0.5);
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
.navcontainer {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>