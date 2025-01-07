<script setup lang="ts">
import { useRouter } from "vue-router";
import Button from "../Button/Button.vue";
import LinkIcon from "../../assets/images/icon-link.svg";

const router = useRouter();

const handlePreviewClick = () => {
  router.push({ path: "/preview" });
};
</script>

<template>
  <article class="navigation">
    <h1 class="navigation__logo">devlinks</h1>
    <nav class="navigation__nav">
      <ul class="navigation__nav-list">
        <li class="navigation__nav-list-item navigation__nav-list-item--active">
          <LinkIcon class="base-icon" :style="{ fill: '#efebff' }" />
          Links
        </li>
        <li class="navigation__nav-list-item">Profile Details</li>
      </ul>
    </nav>
    <Button
      btnText="Preview"
      theme="primary-clear"
      :noMargin="true"
      @btnClick="handlePreviewClick"
    />
  </article>
</template>

<style scope>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.5rem;
  background-color: #fff;
  border-radius: 12px;
}

.navigation__logo {
  margin-bottom: 0;
}

.navigation__nav {
  flex: 1 0 80%;
}

.navigation__nav-list {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  list-style: none;
}

.navigation__nav-list-item {
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  color: #737373;
  font-size: 0.75rem;
}

.navigation__nav-list-item--active {
  background-color: #efebff;
  color: #633cff;
}

.navigation__nav-list-item--active path {
  fill: #633cff;
}
</style>
