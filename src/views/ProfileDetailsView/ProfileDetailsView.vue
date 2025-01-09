<script setup lang="ts">
import { reactive, ref } from "vue";
import Input from "../../components/Input/Input.vue";
import Navigation from "../../components/Navigation/Navigation.vue";
import IconPreview from "../../components/IconPreview/IconPreview.vue";
import Button from "../../components/Button/Button.vue";
import UploadImage from "../../assets/images/icon-upload-image.svg";

interface ValidationImage {
  acceptable: boolean;
  reason: string;
}

const storedProfile = localStorage.getItem("profileDetails");
const defaultDetails = {
  pic: "",
  fName: "",
  lName: "",
  email: "",
};
const profileDetails = reactive(
  storedProfile ? JSON.parse(storedProfile) : defaultDetails
);
// const btnDisabled = ref(true);
const errorMessage = ref("");

const saveLink = () => {
  localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
};

const isFileAcceptable = (image: any, file: any): ValidationImage => {
  const fileName = file.name;
  const fileExt = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
  const allowedExtensions = ["png", "jpg", "jpeg"];

  if (!allowedExtensions.includes(fileExt)) {
    return {
      acceptable: false,
      reason: `Invalid image type. Only ${allowedExtensions.toString()} are allowed.`,
    };
  }

  if (!file.type.startsWith("image/")) {
    return {
      acceptable: false,
      reason: "File is not a valid image",
    };
  }

  if (image.width > 1024 || image.height > 1024) {
    return {
      acceptable: false,
      reason: "Image is not correct dimensions. Must be below 1024 x 1024",
    };
  }

  return { acceptable: true, reason: "" };
};

const handleProfilePicture = (e: Event) => {
  errorMessage.value = "";
  const file = (e.target as HTMLInputElement)?.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const isAccepted = isFileAcceptable(img, file);
        // Check dimensions
        if (isAccepted.acceptable) {
          errorMessage.value = "";
          profileDetails.pic = reader.result as string;
        } else {
          errorMessage.value = isAccepted.reason;
        }
      };
      img.onerror = () => {
        errorMessage.value = "Error loading image. Please try again.";
      };
      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <article class="page-container">
    <Navigation />

    <section class="page-wrapper">
      <article class="grid-content__left grid-content-container">
        <section class="page__left-icon">
          <IconPreview />
        </section>
      </article>
      <article class="grid-content__right grid-content-container">
        <section class="grid-content__right-inner">
          <h2 class="page__heading">Profile Details</h2>
          <p class="page__sub-heading">
            Add your details to create a personal touch to your profile.
          </p>

          <section class="page__gray-box profile-page__upload">
            <article
              class="page__gray-box--inner profile-page__upload-container"
            >
              <p class="page__sub-heading font-sm profile-page__profile-text">
                Profile picture
              </p>
              <section
                class="profile-page__image-upload-container"
                :class="{
                  'profile-page__image-upload-container--image-uploaded':
                    profileDetails.pic !== '',
                }"
              >
                <section class="profile-page__upload-controls-container">
                  <div class="profile-page__upload-controls">
                    <input
                      type="file"
                      id="upload"
                      @change="handleProfilePicture"
                      hidden
                    />
                    <label for="upload">
                      <UploadImage />
                      <span v-if="profileDetails.pic !== ''">Change image</span>
                      <span v-else>+ Upload Image</span>
                    </label>
                    <img
                      v-if="profileDetails.pic !== ''"
                      alt="profile picture"
                      :src="profileDetails.pic"
                      style="
                        filter: brightness(0.4);
                        object-fit: contain;
                        width: 100%;
                        border-radius: 1rem;
                      "
                    />
                  </div>
                </section>
                <p class="page__sub-heading font-sm align-self-center">
                  Image must be below 1024x1024px. Use PNG or JPG format.
                </p>
              </section>
            </article>
            <p v-if="errorMessage !== ''" class="error-message">
              {{ errorMessage }}
            </p>
          </section>

          <section class="page__gray-box profile-page__details">
            <div class="form__group--inline">
              <label for="firstName" class="form__group--inline-label">
                First name
                <span class="form__mandatory">*</span>
              </label>
              <Input
                type="text"
                id="firstName"
                placeholder="e.g. John"
                class="form__group--inline-input"
                v-model="profileDetails.fName"
              />
            </div>
            <div class="form__group--inline">
              <label for="lastName" class="form__group--inline-label">
                Last name
                <span class="form__mandatory">*</span>
              </label>
              <Input
                type="text"
                id="lastName"
                placeholder="e.g. Appleseed"
                class="form__group--inline-input"
                v-model="profileDetails.lName"
              />
            </div>
            <div class="form__group--inline">
              <label for="email" class="form__group--inline-label">
                Email
                <span class="form__mandatory">*</span>
              </label>
              <Input
                type="email"
                id="email"
                placeholder="e.g. email@example.com"
                class="form__group--inline-input"
                v-model="profileDetails.email"
              />
            </div>
          </section>
        </section>
        <section class="page-footer">
          <Button btnText="Save" theme="primary" @btnClicked="saveLink" />
        </section>
      </article>
    </section>
  </article>
</template>

<style scoped>
.profile-page__upload {
  min-height: 10rem;
  padding: 1rem;
  margin: 1.5rem 0;
}

.profile-page__upload-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  max-width: 100%;
  text-align: left;
  height: 100%;
}

.profile-page__image-upload-container {
  text-align: left;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 1rem;
}

.profile-page__upload-controls-container {
  flex: 1 0 50%;
}

.profile-page__upload-controls {
  background-color: #efebff;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  position: relative;
}

.profile-page__image-upload-container--image-uploaded
  .profile-page__upload-controls {
  background-color: transparent;
  color: #fff;
}

.profile-page__image-upload-container--image-uploaded label {
  color: #fff;
}

.profile-page__image-upload-container--image-uploaded label {
  position: absolute;
  z-index: 9999999999999999999999999999999;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.profile-page__image-upload-container--image-uploaded svg > * {
  fill: #fff;
}

.profile-page__profile-text {
  flex: 0 0 15%;
  align-self: center;
}

label {
  color: #633cff;
  text-align: center;
}

label svg {
  display: block;
  margin: 0 auto;
}
</style>
