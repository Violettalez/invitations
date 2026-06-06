import { createRouter, createWebHashHistory } from "vue-router";
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
const router = createRouter({ history: createWebHashHistory(), routes });

export default router;
