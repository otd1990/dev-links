<script setup lang="ts">
import { ref } from "vue";
import Navigation from "../../components/Navigation/Navigation.vue";
import IconPreview from "../../components/IconPreview/IconPreview.vue";
import Button from "../../components/Button/Button.vue";

const btnDisabled = ref(true);

const saveLink = () => {
  console.log("saving");
};
</script>

<template>
  <article class="page-container">
    <Navigation />

    <section class="page-wrapper">
      <article class="grid-content__left grid-content-container">
        <section class="page__left-icon">
          <IconPreview />
        </section>
      </article>
      <article class="grid-content__right grid-content-container">
        <section class="grid-content__right-inner">
          <h2 class="page__heading">Profile Details</h2>
          <p class="page__sub-heading">
            Add your details to create a personal touch to your profile.
          </p>

          <section class="page__gray-box">
            <article class="page__gray-box--inner">
              <h3 class="page__heading">Let's get you started</h3>
              <p class="page__sub-heading">
                Use the "Add new link" button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!
              </p>
            </article>
          </section>
        </section>
        <section class="page-footer">
          <Button
            btnText="Save"
            theme="primary"
            :isDisabled="btnDisabled"
            @btnClicked="saveLink"
          />
        </section>
      </article>
    </section>
  </article>
</template>

<style></style>
