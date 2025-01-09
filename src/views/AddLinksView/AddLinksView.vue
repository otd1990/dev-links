<script setup lang="ts">
import { ref } from "vue";
import ChangesSaved from "../../assets/images/icon-changes-saved.svg";
import Navigation from "../../components/Navigation/Navigation.vue";
import Button from "../../components/Button/Button.vue";
import GetStartedIcon from "../../assets/images/illustration-empty.svg";
import AddLinkForm from "../../components/AddLinkForm/AddLinkForm.vue";
import IconPreview from "../../components/IconPreview/IconPreview.vue";
import Alert from "../../components/Alert/Alert.vue";

interface Link {
  type: string;
  url: string;
  icon: string;
  colour: string;
}

const storedLinks = localStorage.getItem("socialLinks");

const links = ref<Link[]>(storedLinks ? JSON.parse(storedLinks) : []);
const formsData = ref(links.value.map((link) => ({ ...link })));

const btnDisabled = ref(true);
const showAlert = ref(false);

const getColorForType = (type: string): string => {
  switch (type) {
    case "Linkedin":
      return "#2e68ff";
    case "YouTube":
      return "#ee3939";
    case "GitHub":
    case "GitLab":
      return "#1a1a1a";
    default:
      return "#AAA"; // Default color if type doesn't match
  }
};

const saveLink = () => {
  links.value = formsData.value.map((form) => ({ ...form }));

  // Save to localStorage
  localStorage.setItem("socialLinks", JSON.stringify(links.value));

  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 3000);

  btnDisabled.value = true;
};

const handleAddLink = () => {
  formsData.value.push({ type: "", url: "", icon: "", colour: "" });
  btnDisabled.value = false;
};

const handleLinkUpdate = (index: number, link: string) => {
  formsData.value[index].url = link;
  btnDisabled.value = false;
};

const handleTypeUpdate = (index: number, type: string, icon: string) => {
  formsData.value[index].type = type;
  formsData.value[index].icon = icon;
  formsData.value[index].colour = getColorForType(type);
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
                @typeUpdate="(type: string, icon: string) => handleTypeUpdate(index, type, icon)"
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
    <Alert v-if="showAlert">
      <template #icon>
        <ChangesSaved />
      </template>
      <template #content> Your changes have been successfully saved! </template>
    </Alert>
  </article>
</template>

<style scoped>
.links-form {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 1rem;
}

.page-container {
  position: relative;
}

.alert {
  position: fixed;
  bottom: 1rem;
  height: auto;
  right: 25%;
  left: 25%;
}
</style>
