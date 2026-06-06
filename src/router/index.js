import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Invitation from "../components/Invitation.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/invitation/:code",
    name: "Invitation",
    component: Invitation,
  },
];
const router = createRouter({ history: createWebHistory(), routes });

export default router;
