<script setup lang="ts">
import { ref, watch } from "vue";
import Input from "../Input/Input.vue";
import Select from "../Select/Select.vue";

const emits = defineEmits<{
  (e: "linkUpdate", value: string): void;
  (e: "typeUpdate", value: string): void;
}>();

const link = ref<string>("");
const type = ref<string>("");

const options = [
  { label: "CodePen", iconName: "codepen" },
  { label: "CodeWars", iconName: "codewars" },
  { label: "Facebook", iconName: "facebook" },
  { label: "Free Code Camp", iconName: "freecodecamp" },
  { label: "Frontend Mentor", iconName: "frontend-mentor" },
  { label: "GitHub", iconName: "github" },
  { label: "GitLab", iconName: "gitlab" },
  { label: "Linkedin", iconName: "linkedin" },
  { label: "StackOverflow", iconName: "stack-overflow" },
  { label: "Twitch", iconName: "twitch" },
  { label: "Twitter", iconName: "twitter" },
  { label: "YouTube", iconName: "youtube" },
];

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;

  emits("linkUpdate", value);
};

watch(type, (newType: string, _) => {
  emits("typeUpdate", newType);
});
</script>

<template>
  <article class="add-link-form">
    <div class="add-link-form__group">
      <Select
        label="Platform"
        id="platformSelect"
        :options="options"
        v-model="type"
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

<style>
.add-link-form__group + .add-link-form__group {
  margin-top: 1.25rem;
}
</style>
