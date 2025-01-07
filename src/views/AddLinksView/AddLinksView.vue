<script setup lang="ts">
import { ref } from "vue";
import Navigation from "../../components/Navigation/Navigation.vue";
import Button from "../../components/Button/Button.vue";
import GetStartedIcon from "../../assets/images/illustration-empty.svg";
import AddLinkForm from "../../components/AddLinkForm/AddLinkForm.vue";
import IconPreview from "../../components/IconPreview/IconPreview.vue";

interface Link {
  type: string;
  url: string;
}

const links = ref<Link[]>([]);
const formsData = ref<{ type: string; url: string }[]>([]);
const btnDisabled = ref(true);

const handleAddLink = () => {
  formsData.value.push({ type: "", url: "" });
};

const saveLink = () => {
  const link = {
    type: formsData.value[formsData.value.length - 1].type,
    url: formsData.value[formsData.value.length - 1].url,
  };

  links.value.push(link);
};

const handleLinkUpdate = (index: number, link: string) => {
  formsData.value[index].url = link;
  btnDisabled.value = false;
};

const handleTypeUpdate = (index: number, type: string) => {
  formsData.value[index].type = type;
  btnDisabled.value = false;
};
</script>

<template>
  <article class="page-container">
    <Navigation />

    <section class="page-wrapper">
      <article class="grid-content__left grid-content-container">
        <section class="page__left-icon">
          <IconPreview :links="links" />
        </section>
      </article>
      <article class="grid-content__right grid-content-container">
        <section class="grid-content__right-inner">
          <h2 class="page__heading">Customise your links</h2>
          <p class="page__sub-heading">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>

          <Button
            btnText="+ Add new link"
            theme="primary-clear"
            @btnClicked="handleAddLink"
          />

          <section
            v-if="links.length === 0 && !formsData.length"
            class="page__gray-box"
          >
            <article class="page__gray-box--inner">
              <div class="links__add-link-content-icon">
                <GetStartedIcon />
              </div>
              <h3 class="page__heading">Let's get you started</h3>
              <p class="page__sub-heading">
                Use the "Add new link" button to get started. Once you have more
                than one link, you can reorder and edit them. We're here to help
                you share your profiles with everyone!
              </p>
            </article>
          </section>
          <article class="links__added-container">
            <section
              v-for="(form, index) in formsData"
              :key="index"
              class="links-form"
            >
              <AddLinkForm
                :link="form.url"
                :type="form.type"
                @linkUpdate="handleLinkUpdate(index, $event)"
                @typeUpdate="handleTypeUpdate(index, $event)"
              />
            </section>
          </article>
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

<style>
.links-form {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 1rem;
}
</style>
