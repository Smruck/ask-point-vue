<template>
<div class="container" @click.prevent="goback" id="container">
  <div class="form-container">
  <p class="evname">{{eventname}}</p>
  <form class="form" id="form">
    <textarea v-focus class="form-control rounded-1" id="message" name="message" placeholder="Message content..." v-model="content" rows="20" spellcheck="false" @keypress="listenForEnter"></textarea>
    <button id="btn" type="submit" class="btn btnAsk" @click.prevent="send" :disabled="status">Send message</button>
    <button class="btn btn1" @click.prevent="gobackBtn" :disabled="status">Go back</button>
  </form>
  </div>
    <div v-if="showLoader" class="loader-container">
      <Loader />
    </div>
</div> 
</template>

<script>
import Loader from "../views/Loader.vue";

const state = require('../services/state.js');
const messageService = require('../services/message-service.js');

export default {
  name: "SendMessage",
  data() { return { 
      eventname: state.eventstate.name, 
      content: '', 
      showLoader: false,  
      status: false, 
      enterStatus: true, 
    } 
  },
  methods:{
    gobackBtn() { 
      this.status = true; 
      this.$router.push('messages');
    },
    goback(e) { 
      if(e.target.id === 'container') { 
       this.status = true; 
       this.$router.push('messages');
      }
    },
    getDateAsString() { return new Date().toString().substring(0, 24); },
    send: async function() { 
      if(this.content.trim() !== '') { 
        this.showLoader = true;
        const result = messageService.sendMessage(this.content);
        if(result) { this.$router.push('messages');  }
      }
    },
    listenForEnter(e) { 
      const shiftEnter = e.keyCode === 13 && e.shiftKey;
      if(shiftEnter && !!this.content.trim() && this.enterStatus) { this.enterStatus = false; this.send(); }
    },
  },
  created() { if(!state.eventstate.key) { this.$router.push('select'); }},
  components: { Loader }
}
</script>

<style scoped>

.loader-container {
  position: absolute;
  width: 10%;
  margin: 0 auto;
  top: 58%;
  left: 44.4%;
}
.form-container {
  width: 660px;
  height: 540px;
  position: relative;
  margin: 0 auto;
  margin-top: 2%;
  box-shadow: 0 18px 18px 0px rgba(0,0,0,0.2);
  border-radius: 8px;
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
::-webkit-input-placeholder {
  letter-spacing: 2px;
  font-size: 16px;
  color:lightgray;
  opacity: 1;
}
input[type="text"],
.form-control {
  border: 1px solid rgb(231, 228, 219);
  box-shadow: 0 20px 12px 0px rgba(0,0,0,0.2);
  box-shadow: none;
}
.btn {
  z-index: 9;
  position: fixed !important;
  top: 50%;
  left: 58.4%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  text-align: center;
  outline: none !important;
  box-shadow: none;
  box-shadow: 0 20px 12px 0px rgba(0,0,0,0.2);
  animation: float ease 3s ;
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
.btn {
  border:none;
  color:rgb(206, 206, 206);
  font-family: sans-serif;
  letter-spacing: 2px;
  font-size: 16px;
}
.btn:hover {
  color: rgb(214, 129, 0);
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: 0 20px 12px 0px rgba(0,0,0,0.2);
}
.btn1 {
  z-index: 9;
  position: fixed !important;
  top: 50%;
  left: 35%;
  color:rgb(206, 206, 206);
  animation: float1 ease 3s ;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
}
@keyframes float1 {
	0% {
		transform: translatex(0px);
	}
	50% {
		transform: translatex(16px);
	}
	100% {
		transform: translatex(0px);
	}
}
.btn1:hover {
  color: rgb(0, 189, 214);
}
.evname {
  width:100%;
  text-align: center;
  cursor:default;
  font-size: 20px;
  color:rgb(206, 206, 206);
  font-family:'Segoe UI';
}
</style>