<script setup lang="ts">
import LoginView from "./LoginView/LoginView.vue";
import LogoLg from "../assets/images/logo-devlinks-large.svg";
import LogoSm from "../assets/images/logo-devlinks-small.svg";
</script>

<template>
  <article class="container-md">
    <h1 aria-label="Devlinks logo">
      <LogoLg class="desktop-show" />
      <LogoSm class="mobile-show" />
    </h1>
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
  padding: 0 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 3.2rem;
}
</style>
