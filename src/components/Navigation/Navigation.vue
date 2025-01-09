<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Button from "../Button/Button.vue";
import LinkIcon from "../../assets/images/icon-link.svg";
import ProfileDetails from "../../assets/images/icon-profile-details-header.svg";

interface INavigationProps {
  theme?: "primary" | "preview";
}

withDefaults(defineProps<INavigationProps>(), {
  theme: "primary",
});

const router = useRouter();
const currentRouteName = ref(router.currentRoute.value.name);

const handlePreviewClick = () => {
  router.push("/preview");
};

const shareLink = () => {
  alert("link shared");
};
</script>

<template>
  <article class="navigation">
    <section
      v-if="theme === 'primary'"
      class="navigation__primary navigation__wrapper"
    >
      <h1 class="navigation__logo">devlinks</h1>
      <nav class="navigation__nav">
        <ul class="navigation__nav-list">
          <li
            class="navigation__nav-list-item"
            :class="{
              'navigation__nav-list-item--active':
                currentRouteName === 'addLinks',
            }"
          >
            <router-link to="/add-links">
              <LinkIcon class="base-icon" :style="{ fill: '#efebff' }" />
              Links
            </router-link>
          </li>
          <li
            class="navigation__nav-list-item"
            :class="{
              'navigation__nav-list-item--active':
                currentRouteName === 'profileDetails',
            }"
          >
            <router-link to="/profile-details">
              <ProfileDetails class="base-icon" :style="{ fill: '#efebff' }" />
              Profile Details
            </router-link>
          </li>
        </ul>
      </nav>
      <Button
        btnText="Preview"
        theme="primary-clear"
        :noMargin="true"
        @btnClicked="handlePreviewClick"
      />
    </section>

    <section
      v-if="theme === 'preview'"
      class="navigation__theme-preview navigation__wrapper"
    >
      <!-- <router-link to="/profile-details"> -->
      <Button
        btnText="Back to Editor"
        theme="primary-clear"
        :noMargin="true"
        @click="$router.back()"
      />
      <!-- </router-link> -->
      <Button
        btnText="Share Link"
        theme="primary"
        :noMargin="true"
        @click="shareLink"
      />
    </section>
  </article>
</template>

<style scope>
.navigation {
  padding: 0.9rem 1.5rem;
  background-color: #fff;
  border-radius: 12px;
}

.navigation__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  > a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.navigation__nav-list-item--active {
  background-color: #efebff;
  color: #633cff;
}

.navigation__nav-list-item--active path {
  fill: #633cff;
}

.navigation__theme-preview a,
.navigation__theme-preview article {
  width: auto !important;
}
</style>
