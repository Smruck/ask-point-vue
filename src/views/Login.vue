<template>
  <div class="login">
    <div class="navcontainer">
    <NavComponent />
    </div>
    <div class="container">
      <div class="login-form">
        <form @submit.prevent="login">
          <div class="form-group">
            <div class="fields">
              <input
                type="text"
                id="email-login"
                class="form-control"
                name="email"
                v-focus
                placeholder=" Your email..."
                spellcheck="false"
                oninput="setCustomValidity('')"
                v-model="email"
                @keyup="emailRepo"
              />
            </div>
            <br />
            <br />
            <div class="form-group">
              <input
                type="password"
                id="password-login"
                class="form-control"
                name="password"
                placeholder=" Password..."
                oninput="setCustomValidity('')"
                v-model="password"
              />
            </div>
          </div>
          <button type="submit" id="btn" class="button btn btn-outline logbtn"><b class="textbtn">Login</b></button>
        </form>
        <br/>
        <div class="boxhead">
          <p class="hrefReg">
            Forgot password&nbsp;?&nbsp;&nbsp;
            <router-link to="/forgotpassword" class="rgt">Click here</router-link>
          </p>
        </div>
        <br />
        <div v-if="showLoader" class="loader-container">
          <Loader />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../views/Loader.vue";
import NavComponent from "../views/NavComponent.vue";
const loginService = require("../services/login-service.js");
const errorService = require("../services/custom-error.js");
const state = require("../services/state.js");

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      showLoader: false
    };
  },
  methods: {
    login: async function() {
      if(!this.email) { errorService.setError("Please type your email", "email-login"); return; }
      if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.email))) { errorService.setError("Please type correct email address", "email-login"); return; }
      if(!this.password) { errorService.setError("Please type your password", "password-login"); return; }
      this.showLoader = true;
      const result = await loginService.login(this);
      if(result) { 
        if(state.eventstate.key) { this.$router.push('messages'); }
        else { this.$router.push('select'); }
      }
      errorService.setError("Email and password do not match", "password-login");
      this.showLoader = false;
    },
    emailRepo() { state.repo.email = this.email;  }
  },
  components: { Loader, NavComponent },
  created: function() { 
    if(state.userstate.key) { this.$router.push('select'); }
    if(state.repo.email) { this.email = state.repo.email;  }
    state.repo.email = '';
  }
};
</script>

<style scoped>
.navcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  top:50%;
  left: 50%;
}
.login {
  margin-top: 40px;
}
.logbtn {
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
.logbtn:hover {
  border-color: white;
  background-color: white;
  color: rgb(226, 98, 6);
  transform: scale(1.1);
}
.logbtn:active {
  opacity: 0.8;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}
.textbtn {
  letter-spacing: 2px;
}
.hrefReg {
  color: grey;
  margin-top: 3px;
  margin-left: 30px;
  font-family: sans-serif;
  letter-spacing: 2px;
}
::-webkit-input-placeholder {
  letter-spacing: 1px;
  font-size: 16px;
  color: grey;
  opacity: 0.6;
}
.form-group {
  border: 1px solid rgb(224, 224, 224);
  border-radius: 6px; 
}
.login-form {
  width: 350px;
  position: absolute;
  top: 10%;
  left: 10%;
}

.logbtn:hover {
  font-weight: 544;
  color: rgb(170, 80, 16);
}
.form-group {
  background: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.login-form {
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
.loader-container {
  margin-left:0px;
}

</style>