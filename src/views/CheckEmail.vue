<template>
    <div class="container">
        <p class="text">A shortcut to your email provider</p>
        <div class="icons">
            <span><a href="https://accounts.google.com/ServiceLogin"><img class="img" src="../assets/gmail-icon.png" alt="image" data-toggle="tooltip" data-placement="bottom" title="Gmail"></a></span>
            <span><a href="https://login.yahoo.com/config/login?.src=fpctx&.intl=us&.lang=en-US&.done=https://www.yahoo.com"><img class="img" src="../assets/yahoo-icon.png" alt="image" data-toggle="tooltip" data-placement="bottom" title="Yahoo mail"></a></span>
            <span><a href="https://www.abv.bg/"><img class="img" src="../assets/Mail-icon.png" alt="image" data-toggle="tooltip" data-placement="bottom" title="Abv.bg mail"></a></span>
            <span><a href="#"><img class="img" src="../assets/mail-icon (3).png" alt="image"></a></span>
            <span><a href="#"><img class="img" src="../assets/mail-icon (2).png" alt="image"></a></span>
            <span><a href="#"><img class="img" src="../assets/email-icon(1).png" alt="image"></a></span>
        </div>
</div>
</template>

<script>
export default {
  name: "CheckEmail"
}
</script>

<style scoped>
.text {
  font-size: 18px;
  position: absolute;
  left: 42%;
  color: rgb(151, 150, 150);
  opacity: 0.8;
  animation: textanim ease 1.2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes textanim {
  0% {
    opacity: 0;
    top: 10%;
  }
  100% {
    opacity: 1;
    top: 38%;
  }
}
.icons {
  position: absolute;
  top: 50%; 
  left: 50%; 
  opacity: 0.8;
  transform: translate(-50%, -50%);
  animation: textanim ease 1.2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.img {
  width: 70px;
  height: 70px;
  margin-left: 10px;
  margin-right: 10px;
  overflow: hidden;
  transition: transform 0.24s ease;
}
.img:hover {
  transform: scale(1.3);
}
.icons {
  animation: fadein 3s;
  -moz-animation: fadein 3s;
  -webkit-animation: fadein 3s;
  -o-animation: fadein 3s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.load {
  margin-top: 5px;
}
.container {
  animation: fadeInAnimation ease 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>