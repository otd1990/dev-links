<template>
  <article class="alert">
    <slot name="icon"></slot>
    <slot name="content"></slot>
  </article>
</template>

<style>
.alert {
  min-height: 56px;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  min-width: 300px;
  width: fit-content;
  margin: 0 auto;
  gap: 0.5rem;
  background-color: #333;
  margin-top: 3.8rem;
}
</style>
