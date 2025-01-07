<script setup lang="ts">
import { ref } from "vue";
import getIconPath from "../../composables/getIconPath";
import DownChev from "../../assets/images/icon-chevron-down.svg";

interface Option {
  iconName: string;
  label: string;
}

interface ISelectProps {
  label: string;
  id: string;
  options: Option[]; // Adjusted to support options with icons
  modelValue: string;
}

withDefaults(defineProps<ISelectProps>(), {
  label: "Select",
  id: "select",
  options: [],
  modelValue: "",
});

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isOpen = ref<boolean>(false);

const handleClick = () => {
  console.log("CLICK");
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <article class="select">
    <label :for="id" class="form__label">{{ label }}</label>
    <section class="custom-select__wrapper">
      <div class="custom-select">
        <div class="custom-select__selected" @click="handleClick">
          <img
            v-if="modelValue"
            :src="getIconPath(modelValue.toLowerCase())"
            alt="Selected icon"
            class="custom-select__icon"
          />
          <span>
            {{
              options.find((option: Option) => option.label === modelValue)
                ?.label || "Select an option"
            }}
          </span>
        </div>
        <ul v-if="isOpen" class="custom-select__dropdown">
          <li
            v-for="option in options"
            :key="option.label"
            class="custom-select__option"
            @click="
              $emit('update:modelValue', option.label);
              isOpen = false;
            "
          >
            <img
              :src="getIconPath(option.iconName)"
              :alt="option.label"
              class="custom-select__option-icon"
            />
            {{ option.label }}
          </li>
        </ul>
        <DownChev class="custom__select-down-chev" />
      </div>
    </section>
  </article>
</template>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
}

.custom-select {
  position: relative;
  width: 100%;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.custom-select__selected {
  display: flex;
  align-items: center;
  flex: 1 0 100%;
}

.custom-select__icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.custom-select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 1000;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
  list-style: none;
  padding: 0;
}

.custom-select__option {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
}

.custom-select__option:hover {
  background-color: #f5f5f5;
}

.custom-select__option-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.custom__select-down-chev {
  position: absolute;
  right: 0.55rem;
  bottom: auto;
  top: auto;
}
</style>
