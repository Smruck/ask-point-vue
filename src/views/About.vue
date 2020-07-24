<template>
  <div>
    <div class="navcontainer">
      <NavComponent />
    </div>

    <div class="maintext">
      <h4
        class="ha"
      >AskPoint is light and fast platform for supporting different types of events, meetings, classes etc.</h4>
      <h4 class="hb">You do not need login for most common features</h4>
      <h4 class="hc">Go to help section if you have difficulties using this site</h4>
      <h4 class="hd">Check privacy and cookie policy for details</h4>
    </div>
    <div class="scene">
      <div class="cardA" @click.prevent="toggle">
        <img class="front" @click.prevent="toggleUp" src="@/assets/help-back.png" />
        <img class="back" @click.prevent="toggleUp" src="@/assets/help-front.png" />
      </div>
      <div class="cardB" @click.prevent="toggle">
        <img class="front" @click.prevent="toggleUp" src="@/assets/privacy-back.png" />
        <img class="back" @click.prevent="toggleUp" src="@/assets/privacy-front.png" />
      </div>
    </div>
  </div>
</template>

<script>
import NavComponent from "../views/NavComponent.vue";

export default {
  name: "About",
  components: { NavComponent },
  methods: {
    toggle(event) { event.target.classList.toggle("flipped"); },
    toggleUp(event) { event.target.parentNode.click(); }
  }
};
</script>

<style scoped>
.navcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene {
  position: absolute;
  left: 9%;
  top: 42%;
  width: 80%;
  height: 40%;
  perspective: 2400px;
  opacity: 0;
  animation: fadeInAnimation ease 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay:0.7s;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.cardA {
  position: absolute;
  left: 52%;
  top: 0%;
  width: 520px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(140, 140, 140, 0.8);
  cursor: pointer;
  transition: transform 0.3s;
  transform-style: preserve-3d;
}
.cardB {
  position: absolute;
  left: 12%;
  top: 0%;
  width: 520px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(140, 140, 140, 0.8);
  cursor: pointer;
  transition: transform 0.3s;
  transform-style: preserve-3d;
}
.cardA.flipped {
  transform: rotateX(180deg);
}
.cardB.flipped {
  transform: rotateX(180deg);
}
.front,
.back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
  border-radius: 6px;
  background-color: rgb(223, 220, 201);
}
.front {
  transform: rotateX(180deg);
}
.maintext {
  position: absolute;
  text-align: center;
  left: 19%;
  top: 20%;
  color: rgb(160, 160, 155);
}
.load {
  margin-top: 5px;
}
.navcontainer {
  margin-top: 40px;
}
.ha {
  opacity: 0;
  animation: fadeInAnimation ease 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.1s;
}
.hb {
  opacity: 0;
  animation: fadeInAnimation ease 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
}
.hc {
  opacity: 0;
  animation: fadeInAnimation ease 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.3s;
}
.hd {
  opacity: 0;
  animation: fadeInAnimation ease 0.6s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay:0.4s;
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