<template>
  <div class="home">
    <div class="change">
      <div id="btn1" class="route-btn" @click="routeTo('label')">数据</div>
      <div id="btn2" class="route-btn" @click="routeTo('review')">回查</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

const router = useRouter()

const routeTo = (name: string) => {
  router.push({
    name
  })
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: url('@/assets/bg.jpeg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.change {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50px;
}

#btn1 {
  translate: -50%;
}

#btn2 {
  translate: 50%;
}

.route-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  width: 100px;
  height: 45px;
  border: 1px solid aliceblue;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  color: aliceblue;
}

.route-btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
  border-color: lightskyblue;
}

.route-btn:active {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: deepskyblue;
  scale: 0.95;
}
</style>