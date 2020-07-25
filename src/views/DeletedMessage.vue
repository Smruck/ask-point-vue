<template>
    <div class="body" :id="message._id">
      <div class="operators">
        <div class="img"><img id="img" class="img" :src="getImage"/></div>
        <div class="username"><b>{{message.username}}</b></div>
        <div class="thumbup"><img class="thumb-up" src="../assets/like.png"></div>
        <div class="likes"><b>{{message.likes}}</b></div>
        <div class="thumb-down"><img class="thumb-down" src="../assets/disslike.png"></div>
        <button class="rotate btn" @click.prevent="destroyMessage"><b class="x" title="Delete forever">&times;</b></button>
        <div class="date"><b>{{message.date}}</b></div>
      </div>
      <br>
      {{message.content}}    
    </div>
</template>

<script>
const icon = require('../assets/user_icon.png');
const messageService = require("../services/message-service.js");

export default {
  name: "DeletedMessage",
  props: ["message", "index"],
  computed: { 
    getImage() { return this.message.image ? this.message.image : icon; },
  },
  methods:{ 
    destroyMessage: async function() {  messageService.removeDeletedMessage(this.index, this.message._id); }
  }
};
</script> 

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
.body {
  position: relative;
  margin: 0  auto;
  width: 680px;
  min-height: 220px;
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
  word-wrap: break-word;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.operators {
  position: relative;
  left:-20px;
  height: 100px; 
  width: 106.2%;
  background-color: rgb(231, 231, 231);
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 8px;
}
.icon {
  position: relative;
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
  width: 81px;
  height: 81px;
  border-radius: 50%;
  opacity: 0.8;
}
.username{
  cursor: pointer;
  height: 22px;
  color: rgb(128, 128, 128);  
  position: relative;
  width: 100%;
  top: -24px;
  left: 118px;
  opacity: 0.8;
}
.likes {
  height: 20px;
  cursor:default;
  width:40px;
  top: -96px;
  color: grey;
  position: relative;
  left: 480px;
  opacity: 0.6;
}
.thumbup{
  position: relative;
  top: 0px;
  left: 0px;
  width:24px;
  height:24px;
  opacity: 0.6;
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
  opacity: 0.6;
}
.thumb-down:hover {
  width:24px;
  height:24px;
  
}
.thumb-up:hover {
  width:24px;
  height:24px;
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
  opacity: 0.4;
}
.rotate:hover {
  transition: transform 1.0s linear;
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
  left:118px;
  opacity: 0.8;
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>