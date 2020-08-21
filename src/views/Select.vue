<template>
  <div class="messages">
    <div class="navcontainer">
      <NavComponent />
    </div>
    <div class="container">
      <br>  
      <div class="imgcontainer">
        <img class="img" src="../assets/events.jpg" alt="image" />
      </div>
      <form id="form" @submit.prevent="selectEvent">
        <div class="form-group">
          <span>
            <input
              type="text"
              list="events"
              id="event"
              class="form-control"
              name="event"
              v-focus
              placeholder=" Event name..."
              spellcheck="false"
              oninput="setCustomValidity('')"
              v-model="event"
              @keyup.prevent="suggestions"
            />
            <datalist id="events">
              <option v-for="event in events" :key="event">{{event}}</option>
            </datalist>
          </span>
        </div>
        <br />
        <div class="form-group">
          <span>
            <input
              type="password"
              id="password"
              class="form-control"
              name="password"
              placeholder=" Event password..."
              oninput="setCustomValidity('')"
              v-model="password"
            />
          </span>
        </div>
        <br />
        <br />
        <div class="btns">
          <span>
            <button
              @click.prevent="selectEvent"
              class="btn btnask"
              data-toggle="tooltip"
              data-placement="bottom"
            >
            <b>Select event</b>
            </button>
          </span>
          <span>
            <button
              id="btncreate"
              class="btn btncreate"
              data-toggle="tooltip"
              data-placement="bottom"
              @click="createEvent"
            >
            <b>Create event</b>
            </button>
            <button id="btn" type="submit" class="b"></button>
          </span>
        </div>
         <div v-if="showLoader" class="loader">
          <Loader />
         </div>
      </form>
    </div>
    <div v-if="hasMessage" id="modal" class="modal" @click="modaloff">
      <div class="modal-content">
        <p class="text">
          <b>{{getMessage}}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../views/Loader.vue";
import NavComponent from "../views/NavComponent.vue";

const selectService = require("../services/select-service.js");
const state = require("../services/state.js");

export default {
  name: "Select",
  data() { return { password: null, event: null, events: null, showLoader: false, initial: null }; },
  methods: {
    modaloff() { 
      state.message.mess = null;
      document.getElementById("modal").style.display = "none";
    },
    selectEvent: function() { selectService.checkInputDataSelect(this); },
    createEvent: function() { selectService.checkInputDataCreate(this); },
    clearErrors: function() {
      document.getElementById("event").setCustomValidity("");
      document.getElementById("password").setCustomValidity("");
    },
    suggestions: async function() { this.events = await selectService.getSuggestions(this.event); },
    handleKeyEvent(e) { 
      if(e.keyCode === 66 && e.ctrlKey) { this.$router.push('profile'); }
      if(e.keyCode === 81 && e.ctrlKey) { this.$router.push('messages'); }
    }
  },
  computed: {
    hasMessage: function() { return !!state.message.mess; },
    getMessage: function() { return state.message.mess; },
  },
  components: { NavComponent, Loader },
  mounted() {
    document.addEventListener('keydown', (e) => this.handleKeyEvent(e));
    setTimeout(() => {
      const element = document.getElementById("modal");
      if (element) { element.style.display = "none"; }
      state.message.mess = null;
    }, 3000);
  }
};
</script>

<style scoped>
.navcontainer {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  width: 360px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fadeInAnimation ease 1.2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
    height: 500px;
  }
  100% {
    opacity: 1;
    height: 200px;
  }
}
.form-control {
  border-radius: 8px;
}
::-webkit-input-placeholder {
  letter-spacing: 1px;
  font-size: 16px;
  color: grey;
  opacity: 0.6;
}
.load {
  margin-top: 5px;
}
.btncreate {
  position: absolute;
  left: 48%;
  font-family: sans-serif;
  letter-spacing: 3px;
  font-size: 16px;
  color: rgb(148, 143, 143);
  transition: transform 0.3s ease;
}
.btnask {
  position: absolute;
  left: 2%;
  font-family: sans-serif;
  letter-spacing: 3px;
  background: transparent;
  font-size: 16px;
  color: rgb(148, 143, 143);
  transition: transform 0.3s ease;
}
.btnask:hover {
  border-color: white;
  background-color: white;
  transform: scale(1.2);
  color: rgb(204, 90, 14);
}
.btnask:active {
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}
.btncreate:hover {
  border-color: white;
  background-color: white;
  transform: scale(1.2);
  opacity: 0.9;
  color: rgb(43, 181, 202);
  text-shadow: 0px, 0px, 2px, rgb(112, 183, 241);
}
.btncreate:active {
  opacity: 0.9;
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}
.logout {
  animation: fadeInAnimation ease 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  background: transparent;
  border-style: none;
  border-color: white;
  background-color: white;
  color: lightgrey;

  position: absolute;
  top: 4%;
  right: 10%;
  transition: transform 0.5s ease;
}
.btns {
  width: 400px;
  position: absolute;
  top: 90%;
  left: 57%;

  transform: translate(-50%, -50%);
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
.img {
  z-index: -1;
}
.imgcontainer {
  z-index: -1;
  position: absolute;
  margin: 0 auto;
  padding: 0px;
  bottom: 60%;
  left: -64%;
  vertical-align: middle;
  animation: fadeIn ease 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}
.loader {
  margin-top: 30px;
  margin-left: 10px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(110, 110, 110, 0.6);
  animation: fadeInAnimation1 ease 2.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeInAnimation1 {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.modal-content {
  background-color: #ffffff;
  margin: 15% auto;
  padding: 20px;
  border: none;
  border-radius: 10px;
  width: 40%;
}
.text {
  margin-left: 30px;
  margin-top: 14px;
  color: rgb(153, 149, 149);
  font-family: sans-serif;
  letter-spacing: 3px;
}
.messcontainer {
  margin-top: 80px;
}
.messages {
  text-align: center;
  letter-spacing: 20px;
  margin-top: 20px;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.form-control:focus {
  border-color: #6fb1dd;
  box-shadow: 0px 2px 2px rgba(60, 61, 63, 0.075) inset,
    0px 0px 8px rgba(85, 193, 243, 0.5);
  border-radius: 8px;
}
.b{
  pointer-events: none;
  cursor: default;
  opacity: 0;
} 
</style>