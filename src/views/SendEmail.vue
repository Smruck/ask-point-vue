<template>
<div class="container" id="container" @click.prevent="goback">
  <div class="form-container">
  <p class="evname">Send personal email To:&nbsp;<b>{{touser}}</b></p>
  <form class="form" id="form">
    <textarea v-focus class="form-control rounded-1" id="message" name="message" placeholder="Email content..." v-model="content" rows="21" spellcheck="false"></textarea>
    <button id="btn" type="submit" class="btn btnAsk" @click.prevent="send" :disabled="status">Send email</button>
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
const emailService = require('../services/mail-service.js');

export default {
  name: "SendEmail",
  data() { return { content: null, touser: state.message.mess.username, showLoader: false, status: false } },
  methods:{
    gobackBtn() { 
      this.status = true; 
      state.message.mess = null; 
      this.$router.push('messages');
    },
    goback(e) {   
      if(e.target.id === 'container') { 
        this.status = true; 
        state.message.mess = null; 
        this.$router.push('messages');
      }
    },
    send: async function() { 
      this.showLoader = true;
      if(this.content) { 
        const result = await emailService.sendMail(state.userstate.key, state.message.mess.user_id, this.content); 
        if(result) { 
          state.message.mess = "Email was send successfully!"; 
          this.$router.push('messages');
        }
        else { 
          state.message.mess = "Oops, your email has not been sent"; 
          this.$router.push('messages');
        }
      }
      this.showLoader = false;
    }
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
  height: 560px;
  position: relative;
  margin: 0 auto;
  margin-top: 2%;
  box-shadow: 0 12px 12px 0px rgba(0,0,0,0.2);
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
  color: rgb(180, 179, 179);
  opacity: 0.8;
}
input[type="text"],
.form-control {
  background: transparent;
  border: 1px solid rgb(231, 228, 219);
  box-shadow: 0 20px 12px 0px rgba(0,0,0,0.2);
  box-shadow: none;
}
.btn {
  color: #adadad;
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
  font-family: sans-serif;
  letter-spacing: 2px;
  font-size: 16px;
}
.btn:hover {
  color: rgb(214, 129, 0);
}
.btn:focus,
.btn:active {
  color:#adadad;
  outline: none !important;
  box-shadow: 0 20px 12px 0px rgba(0,0,0,0.2);
}
.btn1 {
  z-index: 9;
  position: fixed !important;
  top: 50%;
  left: 35%;
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
  margin-top: 2%;
  text-align: center;
  cursor:default;
  font-size: 18px;
  color:rgb(177, 178, 179);
  font-family:'Segoe UI';
}
.username {
  font-size: 19px;

  color:rgb(148, 147, 147)
}
</style>