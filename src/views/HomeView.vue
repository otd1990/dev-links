<script setup lang="ts">
import LoginView from "./LoginView/LoginView.vue";
</script>

<template>
  <article class="container-md">
    <h1>devlinks</h1>
    <LoginView />
  </article>
</template>

<style>
.container-md {
  max-width: 900px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin-bottom: 3.2rem;
}
</style>
