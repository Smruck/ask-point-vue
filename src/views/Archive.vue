<template>
   <div class="container" id="app">
    <div class="navcontainer">
      <NavMessages />
      <div class="number"><b>{{messagesCount}}</b></div>
    </div>
    <div class="nav-background"></div>
     <button class="btn logbtn" @click.prevent="deleteAll">Delete all</button>
    <div class="messages-container">
      <transition-group name="list" tag="div">
      <div class="list-item" v-for="(message, index) in messages" :key="message._id">
        <DeletedMessage
          :message="message"
          :index="index"
        />
      </div>
      </transition-group>
      <br>
    </div>
   </div>
</template>

<script>
import NavMessages from '../views/NavMessages.vue';
import DeletedMessage from '../views/DeletedMessage.vue';

const archiveService = require('../services/archive-service.js');
const state = require('../services/state.js');

export default {
  name: "Archive",
  components: { NavMessages, DeletedMessage },
  data() { return { 
    messages: state.eventstate.deleted, 
    messagesCount: state.eventstate.deleted.length
    }
  },
  methods: {
    deleteAll: async function() { await archiveService.deleteAll(); },
    handleKeyEvent(e) { 
      if(e.keyCode === 66 && e.ctrlKey) { this.$router.push('profile'); }
      if(e.keyCode === 81 && e.ctrlKey) { this.$router.push('messages'); }
    },
  },
  created() { 
    archiveService.evaluateEnterCredentials(this); 
  }, 
  mounted() { 
    archiveService.updateState(this); 
    document.addEventListener('keydown', (e) => this.handleKeyEvent(e));
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
  margin-top: 40px;
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
.fade-enter {
  opacity: 0;
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
    transform: translatex(0px);
  }
  50% {
    transform: translatex(-16px);
  }
  100% {
    transform: translatex(0px);
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