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
          </span>
        </div>
         <button id="btn" type="submit" class="b"></button>
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
const messageService = require("../services/message-service.js");
const state = require("../services/state.js");
const errorService = require('../services/custom-error.js');

export default {
  name: "Select",
  data() { return { password: null, event: null, events: null, showLoader: false, initial: null }; },
  methods: {
    modaloff() { 
      state.message.mess = null;
      document.getElementById("modal").style.display = "none";
    },
    selectEvent: async function() {
      if(!this.event) { errorService.setError("Please select your event", "event"); return; }
      if(!this.password) { errorService.setError("Please type event's password", "password"); return; }
      this.showLoader = true;
      const event = await selectService.checkEventPassword({ event: this.event, password: this.password }); 
      if(!event) { errorService.setError("Event name and password do not match", "event"); this.showLoader = false; }
      else {
        const updateResult = await messageService.updateMessages();
        if(updateResult) { this.$router.push('messages'); }
      }
    },
    createEvent: async function() {
      this.clearErrors();
      if(!state.userstate.key) { errorService.setError("Please log in first in order to create an event", "btn"); return; }
      if(!this.event) { errorService.setError("Please select event's name", "event"); return; }
      if(!this.event.match('^[a-zA-Z0-9 ]+$')) { errorService.setError('Event name should contain letters numbers and spaces only', 'event'); return; }
      if(this.event.length > 30 || this.event.length < 3) { this.setCustomError("Your event name should be between 3 and 30 symbols", "event"); return; }
      if(!this.password) { errorService.setError("Please choose a password for this event", "password"); return; }
      if(this.password.length > 30 || this.password.length < 3) { errorService.setError("Your password should be between 3 and 30 symbols", "password"); return; }
      this.showLoader = true;
      const eventExists = state.eventNames.names.includes(this.event);
      if(eventExists) { errorService.setError("Sorry but this name is already taken", "event"); this.showLoader = false; }
      else { 
        const resultSave = await selectService.saveNewEvent(this.event, this.password);
        if(resultSave) { this.$router.push('messages'); }
      }
    },
    clearErrors: function() {
      document.getElementById("event").setCustomValidity("");
      document.getElementById("password").setCustomValidity("");
    },
    suggestions: async function() {
      this.events = await selectService.getSuggestions(this.event);
    }
  },
  computed: {
    hasMessage: function() { return !!state.message.mess; },
    getMessage: function() { return state.message.mess; },
  },
  components: { NavComponent, Loader },
  beforeCreate: async function() { await selectService.getAllEvents(); },
  mounted() {
    setTimeout(() => {
      const element = document.getElementById("modal");
      if (element) { element.style.display = "none"; }
      state.message.mess = null;
    }, 3100);
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
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(171, 188, 190, 0.4);

  animation: fadeInAnimation1 ease 3s;
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
  box-shadow: inset 0 0 0 2px rgb(184, 176, 158), 0em 0em 1em rgba(0, 0, 0, 0.3);
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