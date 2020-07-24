<template>
  <div class="container" id="app">
    <div class="navcontainer">
      <NavMessages />
      <template v-if="showNumber">
      <div class="number"><b>{{messNumber}}</b></div>
    </template> 
    </div>
    <button class="btn logbtn" @click.prevent="sendMessage">Send message</button>
    <div class="nav-background"></div>
    <div class="messages-container">
      <transition-group name="list" tag="div" class="list-item">
        <div v-for="(message, index) in messages" :key="message._id + message.username + message.image">
         <Message
           :message="message"
           :index="index"
          />
        </div>
      </transition-group>
    </div>
    <br>
    <div v-if="hasMessage" id="modal" class="modal" @click.prevent="modaloff">
      <div class="modal-content">
        <p class="text">
          <b>{{getMessage}}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "../views/Message.vue";
import NavMessages from "../views/NavMessages.vue";

const state = require("../services/state");

export default {
  name: "Messages",
  data() {
    return { 
      messages: state.eventstate.messages, 
      messNumber: state.eventstate.messages.length, 
      keyStatus: true 
    };
  },
  methods: {
    modaloff() {
      document.getElementById("modal").style.display = "none";
      state.message.mess = null;
    },
    sendMessage() { this.$router.push('sendmessage'); },
    handleKeyEvent(e) { 
      if(this.keyStatus) {
        if(e.keyCode === 66 && e.ctrlKey) { this.keyStatus = false; this.$router.push('profile'); } 
        else if(e.keyCode === 77  && e.ctrlKey) { this.keyStatus = false; this.$router.push('sendmessage');} 
        else if(e.keyCode === 89 && e.ctrlKey) { this.keyStatus = false; this.$router.push('archive'); }
      }
    }
  },
  components: { Message, NavMessages },
  computed: {
    hasMessage() { return !!state.message.mess; },
    getMessage() { return state.message.mess; },
    showNumber() { return state.eventstate.admin === state.userstate.key; }
  },
  mounted() {
    setInterval(() => {
      this.messages = state.eventstate.messages;
      this.messNumber = state.eventstate.messages.length;
    }, 100);
    setTimeout(() => {
      const element = document.getElementById("modal");
      if (element) { element.style.display = "none"; }
      state.message.mess = null;
    }, 3000);
    const that = this;
    document.addEventListener('keydown', function(e) { that.handleKeyEvent(e); });
  }
};
</script>

<style scoped>
.number {
  cursor: default;
  color: rgb(20, 167, 96);
  font-size: 18px;
  position: fixed;
  z-index: 9;
  top: 62px;
  left: 49.6%;
}
.list-item {
  display: inline-block;
  margin: 0 auto;
}
.list-enter-active, .list-leave-active {
  position: relative;
  transition: all .40s;
}
.list-enter, .list-leave-to {
  position: relative;
  opacity: 0;
  transform: translatex(700px);
}
.messages-container {
  margin-left: 19%;
  margin-top: 68px;
}
.navcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 42px;
}
.nav-background {
  width: 100%;
  height: 124px;
  position: fixed;
  top: 0;
  z-index: 2;
  background: linear-gradient(
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
  margin: 18% auto;
  padding: 40px;
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
  text-align: center;
}
.btn {
  z-index: 9;
  position: fixed !important;
  top: -4px;
  left: 70%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  text-align: center;
  outline: none !important;
  box-shadow: none;
  color: grey;
  box-shadow: 0 20px 12px 0px rgba(0, 0, 0, 0.2);
  animation: float ease 3s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
}
@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatex(-16px);
  }
  100% {
    transform: translatey(0px);
  }
}
.logbtn {
  border: none;
  color: rgb(168, 168, 168);
  font-family: sans-serif;
  letter-spacing: 2px;
  font-size: 16px;
}
.logbtn:hover {
  color: rgb(214, 129, 0);
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: 0 20px 12px 0px rgba(0, 0, 0, 0.2);
}
</style>