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
  console.log("Adding link");
  formsData.value.push({ type: "", url: "" });
};

const saveLink = () => {
  console.log("saving");
  const link = {
    type: formsData.value[formsData.value.length - 1].type,
    url: formsData.value[formsData.value.length - 1].url,
  };

  links.value.push(link);

  console.log("Links ", links);
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
  <article class="add-links">
    <Navigation />

    <section class="links">
      <article class="links__mobile-display grid-content-container">
        <section class="links__mobile-display-icon">
          <IconPreview :links="links" />
        </section>
      </article>
      <article class="links__add-link grid-content-container">
        <section class="links__add-link-inner">
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
            class="links__add-link-content"
          >
            <article class="links__add-link-container">
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
        <section class="links__add-link-footer">
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
.add-links,
.links {
  height: 100vh;
}

.add-links {
  display: flex;
  flex-direction: column;
}

.links {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 1rem;
  flex-grow: 1;
  margin: 2rem 0;
}

.grid-content-container {
  background-color: #fff;
  border-radius: 1rem;
  display: flex;
}

.links__mobile-display {
  grid-area: 1 / 1 / 6 / 6;
  align-items: center;
  justify-content: center;
}

.links__mobile-display-icon {
  padding: 1rem;
}

.links__add-link {
  grid-area: 1 / 6 / 6 / 13;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.page__heading {
  font-size: 1.5rem;
  margin: 1.25rem 0;
  font-weight: bolder;
}

.page__sub-heading {
  color: #737373;
}

.links__add-link-content {
  text-align: center;
  background-color: #fafafa;
  padding: 2rem;
  border-radius: 1rem;
}

.links__add-link-inner {
  padding: 2rem;
}

.links__add-link-container {
  max-width: 450px;
  margin: 0 auto;
}

.links__add-link-footer {
  margin-top: auto;
  border-top: 1px solid #d7d7d7;
  padding: 0 1rem;
}

.links__add-link-footer .button__button {
  max-width: 4.8rem;
  width: 100%;
  margin-left: auto;
  display: block;
}

.links-form {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 1rem;
}
</style>
