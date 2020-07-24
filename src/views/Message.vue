<template>
    <div class="body" :id="message._id">
      <div class="operators">
        <div class="img"><img id="img" class="img" :src="getImage" @click="gotoProfile" :title="title"></div>
        <div class="username" @click.prevent="gotoProfile" :title="title"><b>{{message.username}}</b></div>
        <div class="thumbup"  @click.prevent="likesUp()"><img class="thumb-up" src="../assets/like.png"></div>
        <div class="likes"><b>{{message.likes}}</b></div>
        <div class="thumb-down" @click.prevent="likesDown"><img class="thumb-down" src="../assets/disslike.png"></div>
        <button class="rotate btn" @click.prevent="destroyMessage"><b class="x">&times;</b></button>
        <div class="date"><b>{{message.date}}</b></div> 
      </div>
      <br>
      {{message.content}}   
    </div>
</template>

<script>
const icon = require('../assets/user_icon.png');
const state = require('../services/state.js');
const messageService = require("../services/message-service.js");

export default {
  name: "Message",
  data(){ return { voted: true } },
  props: ["message", "index"],
  computed: { 
    getImage() { return this.message.image ? this.message.image : icon; },
    title() { 
      if(this.message.username === 'anonymous') { return ''; }
      else { return `Send personal email to ${this.message.username}`; }
    }
  },
  methods:{ 
    gotoProfile() { 
      if(this.message.username === 'anonymous') { return; }
      if(!state.userstate.key) {alert('You have to be logged to use this functionality'); return; }
      if(state.userstate.key === this.message.user_id) { this.$router.push('profile'); }
      else { 
        state.message.mess = this.message;
        this.$router.push('sendemail');
      }
    },
    destroyMessage: async function() { 
      if(state.userstate.key !== state.eventstate.admin) { alert('You have to be an event admin to delete this message\r\nFor more information go to about and then help section'); }
      else { messageService.removeMessage(this.index); }
    },
    likesUp() { if(this.voted) { this.voted = false; messageService.changeLikes(this.index, 1); }},
    likesDown() { if(this.voted) { this.voted = false; messageService.changeLikes(this.index, -1); }},
  },
};
</script> 

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
.body {
  margin: 0  auto;
  width: 680px;
  min-height: 200px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(104, 104, 104);
  animation: fadeInAnimation ease 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  margin-top:18px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-top-left-radius: 50px;
  opacity: 0.96;
  word-wrap: break-word;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.92;
  }
}
.operators {
  position: relative;
  left:-20px;
  height: 100px; 
  width: 106.2%;
  background-color: rgb(229, 235, 234);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 8px;
}
.icon {
  position: relative;
  z-index: 5;
  top: 10px;
  left:10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 0 6px rgb(145, 145, 140);
}
.img {
  position: relative;
  top: 5px;
  left:5px;
  z-index: 9;
  width: 81px;
  height: 81px;
  border-radius: 50%;
}
.img:hover {
  cursor: pointer;
}
.username{
  cursor: pointer;
  height: 22px;
  width: 100%;
  color: rgb(128, 128, 128);  
  position: relative;
  top: -24px;
  left: 118px;
}

.likes {
  height: 20px;
  cursor:default;
  width:40px;
  top: -96px;
  color: grey;
  position: relative;
  left: 480px;
}
.thumbup{
  position: relative;
  top: 0px;
  left: 0px;
  width:24px;
  height:24px;
}
.thumb-up {
  position: relative;
  top: -74px;
  left: 430px;
  width:24px;
  height:24px;
  opacity: 0.6;
}
.thumb-down {
  height: 20px;
  position: relative;
  top: -57px;
  left: 260px;
  width:24px;
  height:24px;
  opacity: 0.8;
}
.thumb-down:hover {
  cursor: pointer;
  width:24px;
  height:24px;
  opacity: 1;
}
.thumb-up:hover {
  cursor: pointer;
  width:25px;
  height:25px;
  opacity: 1;
}
.own {
  opacity: 0.6;
}
.rotate {
  position: relative;
  color: gray;
  font-size: 30px;
  left: 636px;
  top: -164px;
  width: 40px;
  height:40px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.6;
}
.rotate:hover {
  transition: transform 1.2s linear;
  transform: rotate(360deg);
  opacity: 1;
}
.x {
  position: relative;
  top: -13px;
  left: -4px
}
.date {
  cursor:default;
  opacity: 0.8;
  color: rgb(20, 155, 92);
  position: relative;
  width:220px;
  top: -186px;
  left:118px
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>