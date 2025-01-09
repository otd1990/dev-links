<script setup lang="ts">
import PhoneIcon from "../PhoneIcon/PhoneIcon.vue";

interface IProps {
  links?: any;
}

withDefaults(defineProps<IProps>(), {
  links: [],
});
</script>

<template>
  <article class="icon-preview">
    <PhoneIcon :links="links" />
  </article>
</template>
