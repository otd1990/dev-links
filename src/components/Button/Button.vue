<script setup lang="ts">
interface IButtonProps {
  btnText: string;
  noMargin?: boolean;
  theme: "primary" | "secondary" | "primary-clear" | "link";
  isDisabled?: boolean;
}
withDefaults(defineProps<IButtonProps>(), {
  btnText: "Click Here",
  theme: "primary",
  noMargin: false,
  isDisabled: false,
});
</script>

<template>
  <article class="button" :class="{ 'button__button--no-margin': noMargin }">
    <button
      :class="[
        `button__button button__button--${theme}`,
        { 'button__button--disabled': isDisabled },
      ]"
      @click="$emit('btnClicked')"
    >
      {{ btnText }}
    </button>
  </article>
</template>

<style lang="css" scoped>
.button {
  width: 100%;
  margin: 2rem 0;
  cursor: pointer;
}

.button__button {
  width: 100%;
  border-radius: 4px;
  text-align: center;
  border: 0;
  min-height: 2.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.button__button--no-margin {
  margin: 0;
}

.button__button--primary {
  background-color: #633cff;
  color: #fff;
}

.button__button--primary:hover {
  background-color: #beadff;
}

.button__button--primary-clear {
  color: #633cff;
  border: 1px solid #633cff;
  background-color: #fff;
}

.button__button--primary-clear:hover {
  background-color: #efebff;
}

.button__button--primary.button__button--disabled {
  background-color: #beadff;
}

.button__button--link {
  background-color: transparent;
  border: none;
  color: #737373;
  opacity: 0.7;
}
</style>
