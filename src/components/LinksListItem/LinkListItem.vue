<script setup lang="ts">
import { ref } from "vue";
import Select from "../Select/Select.vue";
import Input from "../Input/Input.vue";

interface Link {
  type: string;
  url: string;
}

withDefaults(
  defineProps<{
    link: Link;
  }>(),
  {
    link: () => ({ type: "", url: "" }), // Default object for `link`
  }
);

const emits = defineEmits<{
  (e: "linkUpdate", value: string): void;
  (e: "typeUpdate", value: string): void;
}>();

const link = ref<string>("");
const type = ref<string>("");

const options = [
  "code pen",
  "code wars",
  "facebook",
  "free code camp",
  "frontend mentor",
  "github",
  "gitlab",
  "linkedin",
  "StackOverflow",
  "twitch",
  "twitter",
  "youtube",
];

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;

  emits("linkUpdate", value);
};

const handleSelect = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;

  emits("typeUpdate", value);
};
</script>

<template>
  <article class="link-list-item">
    <div class="add-link-form__group">
      <Select
        label="Platform"
        id="platformSelect"
        :options="options"
        v-model="type"
        @change="handleSelect"
      />
    </div>
    <div class="add-link-form__group">
      <Input
        type="text"
        label="Link"
        placeholder="e.g https://www.github.com"
        id="linkInput"
        icon="link"
        v-model="link"
        @input="handleInput"
      />
    </div>
  </article>
</template>
