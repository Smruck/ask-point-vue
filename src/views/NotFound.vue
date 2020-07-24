<template>
  <div class="error-page-wrap">
    <article class="error-page gradient">
      <div class="text">
        <h1 class="h"><b>404</b></h1>
        <h2>Oops! page not found</h2>
      </div>
      <button @click.prevent="goback" class="btn logbtn">
        <b>Go back to AskPoint</b>
      </button>
    </article>
  </div>
</template>

<script>

export default {
  name: "NotFound",
  methods: {
    goback: function() { if(this.$router.name !== '/select') { this.$router.push('/select' ); } }
  }
};
</script>

<style scoped>

.error-page-wrap {
  width: 310px;
  height: 310px;
  margin: 155px auto;
}
.error-page-wrap:before {
  width: 310px;
  height: 310px;
  border-radius: 50%;
  position: relative;
  z-index: -1;
  content: "";
  display: block;
}
.text {
  position: absolute;
  top: 20%;
  left: 0%;
  color: rgb(222, 224, 224);
}
.error-page {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  top: -310px;
  left: 10%;
  position: relative;
  text-align: center;
  background: #c4c3bb;
  background: -moz-linear-gradient(top, #c4c3bb 0%, rgb(75, 75, 67) 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #c4c3bb),
    color-stop(100%, darkred)
  );
  background: -webkit-linear-gradient(top, #c4c3bb 0%, rgb(75, 75, 67) 100%);
  background: -o-linear-gradient(top, #c4c3bb 0%, rgb(75, 75, 67) 100%);
  background: -ms-linear-gradient(top, #c4c3bb 0%, rgb(75, 75, 67) 100%);
  background: linear-gradient(to bottom, #c4c3bb 0%, rgb(75, 75, 67) 100%);
  box-shadow: inset 0 0 0 2px rgb(173, 171, 167), 0em 0em 3em rgba(0, 0, 0, 0.3);
  animation: fadeInAnimation ease 2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
    top: -810px;
  }
  100% {
    opacity: 1;
    top: -340px;
  }
}
.h {
  color:rgb(214, 103, 29); 
  opacity: 0.8; 
  animation: fadeInAnimation1 ease 1s;
  animation-iteration-count: 3;
  animation-fill-mode: forwards;
    text-shadow: 0 0 6px rgb(104, 104, 99);

  font-size: 48px;
}
@keyframes fadeInAnimation1 {
  0% {
    opacity: 0.8;
     color:rgb(236, 107, 20); 
  }
  50% {
    opacity: 0;
     color:#a3a39d;
  }
  100% {
    opacity: 0.8;
     color:rgb(236, 107, 20); 
  }
}
.logbtn {
  color:grey;
  font-family: sans-serif;
  letter-spacing: 2px;
  font-size: 16px;
  position: absolute;
  top: 112%;
  left: 8%;
  letter-spacing: 2px;
  text-decoration: none;
  font-size: 18px;
  opacity: 0.8;
}
.logbtn:hover {
  color: rgb(226, 97, 11);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  transform: scale(1.2);
}
.logbtn:active {
  opacity: 0.8;
}
.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>