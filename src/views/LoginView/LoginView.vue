<script setup lang="ts">
import { ref } from "vue";
import Input from "../../components/Input/Input.vue";
import Button from "../../components/Button/Button.vue";
import { useRouter } from "vue-router";
import isEmailValid from "../../helpers/isEmailValid";

const router = useRouter();

const inputState = ref<string>("");
const errorMessage = ref<string>("");
const emailInputValue = ref<string>("");

const passwordInputState = ref<string>("");
const passwordErrorMessage = ref<string>("");
const passwordInputValue = ref<string>("");

const handleEmailInput = () => {
  inputState.value = "";
  errorMessage.value = "";
};

const handleBtnClick = () => {
  if (!isEmailValid(emailInputValue.value)) {
    inputState.value = "error";
    errorMessage.value = "Please enter a valid email address";
    return;
  }

  if (passwordInputValue.value === "") {
    passwordInputState.value = "error";
    passwordErrorMessage.value = "Please check again";
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

    router.push({
      path: "/add-links",
    });
  }
};
</script>

<template>
  <section class="login">
    <h2>Login</h2>
    <p>Add yout details below to get back into the app</p>
    <form class="login__form" @submit.prevent="handleBtnClick">
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
      <Button btn-text="Login" theme="primary" @btnClicked="handleBtnClick" />
    </form>
    <p class="text-center">
      Don't have an account?
      <router-link to="/create-account">Create account</router-link>
    </p>
  </section>
</template>

<style scoped>
.login {
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

.login__form {
  margin-top: 3rem;
}
</style>
