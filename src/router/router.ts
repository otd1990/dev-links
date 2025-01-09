import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CreateAccountView from "../views/CreateAccountView/CreateAccountView.vue";
import AddLinksView from "../views/AddLinksView/AddLinksView.vue";
import ProfileDetailsView from "../views/ProfileDetailsView/ProfileDetailsView.vue";
import PreviewView from "../views/PreviewView/PreviewView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/create-account",
    name: "createAccount",
    component: CreateAccountView,
  },
  {
    path: "/add-links",
    name: "addLinks",
    component: AddLinksView,
  },
  {
    path: "/profile-details",
    name: "profileDetails",
    component: ProfileDetailsView,
  },
  {
    path: "/preview",
    name: "preview",
    component: PreviewView,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
