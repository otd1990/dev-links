<script setup lang="ts">
import { ref, watch } from "vue";
import Input from "../Input/Input.vue";
import Select from "../Select/Select.vue";

const emits = defineEmits<{
  (e: "linkUpdate", value: string, isURLValid: boolean): void;
  (e: "typeUpdate", value: string, iconName: string): void;
}>();

interface IProps {
  link: string;
  type: string;
}

const props = withDefaults(defineProps<IProps>(), {
  link: "",
  type: "",
});

const link = ref<string>(props.link);
const type = ref<string>(props.type);

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

const isValidURL = (link: string) => {
  const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

  return regex.test(link);
};

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  const validURL = isValidURL(value);

  console.log("VALUE ", value, " validURL ", validURL);

  emits("linkUpdate", value, validURL);
};

watch(type, (newType: string, _) => {
  const selected = options.find(
    (option) => option.label.toLowerCase() === newType.toLowerCase()
  );

  const iconName = selected?.iconName ? selected.iconName : "";

  emits("typeUpdate", newType, iconName);
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
