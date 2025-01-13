<script setup lang="ts">
import { ref } from "vue";
import LogoLg from "../../assets/images/logo-devlinks-large.svg";
import LogoSm from "../../assets/images/logo-devlinks-small.svg";
import Input from "../../components/Input/Input.vue";
import Button from "../../components/Button/Button.vue";
import isEmailValid from "../../helpers/isEmailValid";

const inputState = ref<string>("");
const errorMessage = ref<string>("");
const emailInputValue = ref<string>("");

const passwordInputState = ref<string>("");
const passwordErrorMessage = ref<string>("");
const passwordInputValue = ref<string>("");

const passwordConfirmInputState = ref<string>("");
const passwordConfirmErrorMessage = ref<string>("");
const passwordConfirmInputValue = ref<string>("");

const handleEmailInput = () => {
  inputState.value = "";
  errorMessage.value = "";
};

const handleBtnClick = () => {
  if (!isEmailValid(emailInputValue.value)) {
    console.log("Here");
    inputState.value = "error";
    errorMessage.value = "Please enter a valid email address";
    return;
  }

  if (passwordInputValue.value === "") {
    passwordInputState.value = "error";
    passwordErrorMessage.value = "Please check again";
  }

  if (passwordConfirmInputValue.value === "") {
    passwordConfirmInputState.value = "error";
    passwordConfirmErrorMessage.value = "Please check again";
  }

  if (passwordConfirmInputValue.value !== passwordInputValue.value) {
    passwordConfirmInputState.value = "error";
    passwordConfirmErrorMessage.value = "passwords don't match";
    passwordInputState.value = "error";
    passwordErrorMessage.value = "passwords don't match";
  }

  if (emailInputValue.value === "") {
    inputState.value = "error";
    errorMessage.value = "Email cannot be blank";
  }

  if (emailInputValue.value === "" || passwordInputValue.value === "") {
    return;
  } else {
    passwordInputState.value = "";
    passwordErrorMessage.value = "";
    inputState.value = "";
    errorMessage.value = "";
    passwordConfirmInputState.value = "";
    passwordConfirmErrorMessage.value = "";
  }
};
</script>

<template>
  <article class="container-md">
    <h1 aria-label="Devlinks logo">
      <LogoLg class="desktop-show" />
      <LogoSm class="mobile-show" />
    </h1>
    <section class="create-account">
      <h2>Create Account</h2>
      <p>Let's get you started sharing your links!</p>
      <form class="create-account__form" @submit.prevent="handleBtnClick">
        <Input
          type="email"
          label="Email Address"
          :state="inputState"
          :error-message="errorMessage"
          placeholder="e.g. alex@email.com"
          id="emailInput"
          icon="email"
          v-model="emailInputValue"
          @input="handleEmailInput"
        />
        <Input
          type="password"
          label="Password"
          :state="passwordInputState"
          :error-message="passwordErrorMessage"
          placeholder="Enter your password"
          id="passwordInput"
          icon="password"
          v-model="passwordInputValue"
        />
        <Input
          type="passwordConfirm"
          label="Confirm password"
          :state="passwordConfirmInputState"
          :error-message="passwordConfirmErrorMessage"
          placeholder="At least 8 Characters"
          id="passwordConfirmInput"
          icon="password"
          v-model="passwordConfirmInputValue"
        />
        <Button
          btn-text="Create new Account"
          theme="primary"
          @btnClicked="handleBtnClick"
        />
      </form>
      <p class="text-center">
        Already have an account? <router-link to="/">Login</router-link>
      </p>
    </section>
  </article>
</template>

<style scoped>
.create-account {
  background-color: #fff;
  min-height: 9rem;
  padding: 2.75rem 1.8rem;
  border-radius: 1rem;
  max-width: 30rem;
  width: 100%;

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 0.75rem;
    color: #a7a7a7;
    font-weight: 300;
    margin-top: 1rem;
  }
}

.create-account__form {
  margin-top: 3rem;
}
</style>
