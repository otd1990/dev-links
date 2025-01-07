<script setup lang="ts">
import { ref } from "vue";
import getIconPath from "../../composables/getIconPath";

interface IInputProps {
  type: string;
  label: string;
  state?: string;
  errorMessage?: string;
  placeholder?: string;
  id: string;
  modelValue: string;
  icon: string;
}

const props = withDefaults(defineProps<IInputProps>(), {
  type: "text",
  label: "input label",
  state: "",
  placeholder: "",
  errorMessage: "",
  id: "",
  modelValue: "",
  icon: "email",
});

const emits = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const inputValue = ref(props.modelValue);

const updateValue = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value;
  emits("update:modelValue", inputValue.value);
};
</script>

<template>
  <article class="input" :class="{ 'input--error': state === 'error' }">
    <label :for="id" class="form__label">{{ label }}</label>
    <section :class="`form__input input__input--${state}`">
      <img :src="getIconPath(icon)" :alt="icon" class="input__icon" />
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="inputValue"
        @input="updateValue"
      />
      <aside v-if="state === 'error'" class="input__error">
        {{ errorMessage }}
      </aside>
    </section>
  </article>
</template>

<style scoped>
.input__label {
  display: block;
  color: #333;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  border: none;
}

input::placeholder {
  opacity: 0.5;
}

.input + .input {
  margin-top: 2rem;
}

.input__input--error {
  border-color: #ff3939;
}

.input--error label,
.input__error {
  color: #ff3939;
}

.input__error {
  background-color: #fff;
  font-size: 0.75rem;
  flex: 1 0 50%;
  text-align: right;
}

.input__input:has(input:focus-visible) {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-color: #beadff;
}

input:focus-visible {
  outline: none;
}
</style>
