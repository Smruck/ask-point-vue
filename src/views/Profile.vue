<template>
  <div id="profile">
    <div class="navcontainer">
      <NavComponent />
    </div>
    <div class="container">
      <form @submit.prevent="change">
        <div class="form-group">
          <span>
            <br />
            <br />
            <input
              id="username"
              class="form-control"
              name="username"
              :placeholder="getusername"
              spellcheck="false"
              oninput="setCustomValidity('')"
              v-model="username"
            />
            <br />
            <input
              type="password"
              id="password"
              class="form-control"
              name="password"
              placeholder="Change password..."
              spellcheck="false"
              oninput="setCustomValidity('')"
              v-model="password"
            />
            <br />
            <input
              type="password"
              id="confirmpassword"
              class="form-control"
              name="confirmpassword"
              placeholder="Confirm password..."
              spellcheck="false"
              oninput="setCustomValidity('')"
              v-model="confirmpassword"
            />
          </span>
        </div>
        <br />
        <br />
        <button type="submit" id="btn" class="button btn btn-outline logbtn" :disable="status">
          <b>Update profile</b>
        </button>
        <br>
        <br>
         <button @click="logout" id="btn1" class="button btn btn1 btn-outline logbtn">
          <b> Log out </b>
        </button>
      </form >
      <input id="input" class="input" type="file" ref="file" name="file" @change="changeImage" />
      <template v-if="hasImage">
        <img id="img" class="img" :src="getImage" />
      </template>
      <template v-else>
        <img id="img" class="img" src="../assets/user-icon.svg"  />
      </template>
      <br />
      <br />
      <div v-if="showLoader" class="loadercontainer">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
import NavComponent from "../views/NavComponent.vue";
import Loader from "../views/Loader.vue";

const state = require("../services/state.js");
const profileService = require("../services/profile-service.js");
const imageService = require("../services/image-service.js");
const errorService = require("../services/custom-error.js");

export default { 
  name: "Profile",
  data: function() {
    return {
      username: null,
      password: null,
      confirmpassword: null,
      showLoader: false,
      showbtn: false,
      status: true
    };
  },
  methods: {
    change: async function() {
      if (this.password) {
        if (this.password.length > 30 || this.password.length < 3) { errorService.setError("Password should be between 3 and 30 symbols", "password"); } 
        else if (this.password !== this.confirmpassword) { errorService.setError("Password and confirm password do not match", "confirmpassword"); } 
        else { 
          this.status = false;
          this.showLoader = true;
          const result = await profileService.change(this.$data); 
          if(result) { 
            if(state.eventstate.key) { this.$router.push('messages' ); }
            else { this.$router.push('select' ); } 
          }
        }
      }
      else if (this.username) {
        if(this.username === state.userstate.username) { this.$router.push('select'); }
        if (this.username.length > 30 || this.username.length < 3) { errorService.setError("Username should be between 3 and 30 symbols", "username"); }
        else if (!this.username.match("^[a-zA-Z]+$")) { errorService.setError("Username should contains only letters", "username"); } 
        else { 
          this.status = false;
          this.showLoader = true;
          const resultChange = await profileService.change(this.$data); 
          if(resultChange) { 
            if(state.eventstate.key) { this.$router.push('messages'); }
            else { this.$router.push('select'); }
          }
        }
      } 
      if(state.eventstate.key) { this.$router.push('messages'); }
      else { this.$router.push('select'); } 
    },
    changeImage: async function(e) {
      this.showLoader = true;
      await imageService.saveImage(e.target.files[0]);
      this.showLoader = false;  
    },
    logout: async function() { 
      await state.clearUserState(); 
      if(state.eventstate.key) { this.$router.push('messages'); }
      else { this.$router.push('select'); }
    },
    handleKeyEvent(e) { 
      if(e.keyCode === 81) { this.$router.push('messages'); }
    },
  },
  computed: {
    getusername() { return state.userstate.username; },
    getImage() { return state.userstate.image; },
    hasImage() { return !!state.userstate.image; }
  },
  components: { NavComponent, Loader },
  created() { if(!state.userstate.key) { this.$router.push('login'); }},
  mounted() { 
    const that = this;
    window.addEventListener('keydown', function(e) { that.handleKeyEvent(e); }); 
  }
}
</script>

<style scoped>
.container {
  width: 380px;
  position: absolute;
  top: 40%;
  left: 48%;
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
.form-control {
  border: 1px solid rgb(177, 175, 175);
  border-radius: 6px;
}
.form-group {
  background: white;

  border: none;
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
  left: 15%;
  font-family: sans-serif;
  letter-spacing: 3px;
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
  font-family: sans-serif;
  letter-spacing: 3px;
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
  border-radius: 6px;
}
.btn:focus,
.btn:active {
  cursor: pointer;
  outline: none !important;
  box-shadow: none;
}
.navcontainer {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
input[name="email"] {
  pointer-events: none;
}
.img {
  z-index: 0;
  position: absolute;
  cursor: pointer;
  top: 12%;
  right: -19%;
  width: 188px;
  height: 188px;
  animation: fadeIn ease 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  border-radius: 50%;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px rgb(138, 137, 135), 0em 0em 0.4em rgba(0, 0, 0, 0.6);
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
}
.base {
  position: absolute;
  background-color: white;
  top: 4%;
  right: 0%;
  width: 160px;
  height: 160px;
}
.input {
  cursor: pointer;
  z-index: 9;
  position: absolute;
  top: 18%;
  right: -6%;
  width: 160px;
  height: 160px;
  background-color: transparent;
  border: none;
  opacity: 0;
  border-radius: 50%;
}
.loadercontainer {
  position: relative; 
  left: 8%;
}
.form-control:focus {
  border-color: #6fb1dd;
  box-shadow: 0px 2px 2px rgba(60, 61, 63, 0.075) inset,
    0px 0px 8px rgba(85, 193, 243, 0.5);
}
.btn1:hover {
  border-color: white;
  background-color: white;
  color: rgb(49, 181, 214);
  transform: scale(1.1);
}
.btn1:focus,
.btn1:active {
  cursor: pointer;
  outline: none !important;
  box-shadow: none;
}
</style>