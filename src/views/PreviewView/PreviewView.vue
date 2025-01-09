<script setup lang="ts">
import { onMounted, ref } from "vue";
import RightArrow from "../../assets/images/icon-arrow-right.svg";
import CopiedLink from "../../assets/images/icon-link-copied-to-clipboard.svg";
import Navigation from "../../components/Navigation/Navigation.vue";

const defaultProfileDetails = {
  pic: "",
  fName: "",
  lName: "",
  email: "",
};

const defaultSocialLinks = {
  type: "",
  url: "",
};

const storedProfileDetails = localStorage.getItem("profileDetails");
const links = localStorage.getItem("socialLinks");
const profileDetails: any = ref({});
const socialLinks: any = ref([]);

const checkItems = () => {
  if (!storedProfileDetails) return;
  if (!links) return;
  try {
    profileDetails.value =
      JSON.parse(storedProfileDetails) || defaultProfileDetails;
    socialLinks.value = JSON.parse(links) || defaultSocialLinks;
  } catch (e) {
    console.error("Error parsing profileDetails from localStorage:", e);
    profileDetails.value = defaultProfileDetails;
    socialLinks.value = defaultSocialLinks;
  }
};

onMounted(async () => {
  await checkItems();
});
</script>

<template>
  <article class="preview-view">
    <section class="preview-view__top">
      <Navigation theme="preview" />
    </section>
    <section class="preview-view__mid">
      <article class="profile__preview-container">
        <section class="profile__preview-profile-pic">
          <img
            :src="profileDetails.pic"
            alt="profile pic"
            class="profile__preview-profile-pic-img"
          />
        </section>
        <section class="profile__preview-details">
          <h3 class="profile__preview-details-name">
            {{ profileDetails.fName }} {{ profileDetails.lName }}
          </h3>
          <p class="profile__preview-details-email">
            {{ profileDetails.email }}
          </p>
        </section>
        <section class="profile__details-links">
          <article
            v-for="link in socialLinks"
            :key="link.type"
            class="profile__details-links-item"
            :style="{ background: link.colour }"
          >
            <span class="profile__details-links-item-name">
              {{ link.type }}
            </span>
            <RightArrow />
          </article>
        </section>
      </article>
    </section>
    <section class="preview-view__bottom">
      <CopiedLink />
      The link has been copied to your clipboard
    </section>
  </article>
</template>

<style>
body {
  padding: 0;
}
.preview-view__top {
  height: 30dvh;
  background-color: #633cff;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1.25rem;
}

.preview-view__mid,
.preview-view__bottom {
  padding: 1rem;
}

.profile__preview-container {
  text-align: center;
  max-width: 350px;
  background: #fff;
  padding: 2.8rem 3.6rem;
  border-radius: 1rem;
  min-height: 500px;
  margin-top: -6rem;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
}

.profile__preview-profile-pic {
  height: 10rem;
  width: 10rem;
  border: 0.2rem solid #633cff;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.profile__preview-profile-pic-img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.profile__preview-details-name {
  font-weight: bolder;
  margin-bottom: 0.75rem;
}

.profile__preview-details-email {
  color: #737373;
  font-size: 0.9rem;
  font-weight: lighter;
  opacity: 0.65;
}

.profile__details-links {
  margin-top: 3.6rem;
}

.preview-view__bottom,
.profile__details-links-item {
  min-height: 56px;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
}

.profile__details-links-item {
  min-width: 237px;
  justify-content: space-between;
}

.preview-view__bottom {
  min-width: 300px;
  width: fit-content;
  margin: 0 auto;
  gap: 0.5rem;
  background-color: #333;
  margin-top: 3.8rem;
}
</style>
