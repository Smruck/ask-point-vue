<template>
  <div>
    <div class="container">
      <div class="logo">
        <img class="img" src="../assets/feather1.png" />
        <span>
          <h4 class="welcome">
            <font face="times-new-roman" class="text1">Welcome @</font>
          </h4>
        </span>
        <span>
          <font face="verdana" class="text2">
            Ask
            <small class="bullet">&#8226;</small>point
          </font>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  mounted() { setTimeout(() => { this.$router.push('/select' ); }, 2200); }
};
</script>

<style scoped>
.welcome {
  cursor:default;
  position: relative;
  letter-spacing: 3px;
  color: grey;

  text-align: center;
  font-size: 33px;
}

.container {
  cursor:default;
  text-align: center;
  position: absolute;
  top: 34%;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 100%;
  animation: fadein 2.4s;
  -moz-animation: fadein 2.4s;
  -webkit-animation: fadein 2.4s;
  -o-animation: fadein 2.4s;
}
@keyframes fadein {
  0% {
    opacity: 1;
  }
  82% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.navcontainer {
  z-index: 9;
    position: absolute;
    margin-left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 52px;

  animation: tex 2s, 1.8;
  -moz-animation: tex 1.8s;
  -webkit-animation: tex 1.8s;
  -o-animation: tex 1.8s;
}
@keyframes tex {
  0% {
    position: absolute;
   margin-top: -40px;

  }
  100% {
    position: absolute;
   margin-top: 52px;

  }
}
.container span {
  text-transform: uppercase;
  display: block;
}
.logo {
  position: relative;
  left: 2%;
}
.text1 {
  font-size: 60px;
  font-weight: 700;
  letter-spacing: 10px;
  margin-bottom: 20px;
  background: white;
  position: relative;
  animation: text1 2s, 1;
}
.text2 {
  color: sienna;
  opacity: 0.7;
  font-size: 40px;
  font-style: italic;
  letter-spacing: 10px;
  margin-top: 40px;
  animation: text2 1.8s, 1;
}
@keyframes text1 {
  0% {
    color: white;
    opacity: 0;
    font-size: 20px;
    margin-bottom: -40px;
  }
  50% {
    letter-spacing: 30px;
    opacity: 0.2;
    margin-bottom: -40px;
  }
  100% {
    letter-spacing: 10px;
    margin-bottom: -40px;
  }
}
@keyframes text2 {
  0% {
    color: white;
    opacity: 0;
    font-size: 140px;
  }
  50% {
    opacity: 0.2;
    font-size: 70px;
  }
  100% {
    opacity: 0.8;
    font-size: 40px;
  }
}
.bullet {
  color: rgb(155, 154, 153);
  font-size: 20px;
  margin-right: 24px;
}
.r {
  color: rgb(88, 87, 85);
  vertical-align: top;
}
.img {
  position: relative;
  width: 140;
  height: 340px;
  align-items: center;
  z-index: -9;
  opacity: 0.3;
  right: -52px;
  top: 100px;
  animation: img 2.2s, 1;
}
@keyframes img {
  0% {
    color: white;
    width: 180;
    height: 540px;
    opacity: 0;
  }
  50% {
    opacity: 0.02;
  }
  100% {
    opacity: 0.3;
  }
}
btn:focus {
  outline: 0;
  outline: none !important;
  box-shadow: none;
}
.p {
  height: 13px;
}
</style>
