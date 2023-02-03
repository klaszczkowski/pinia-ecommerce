import { createRouter, createWebHistory } from "vue-router";
import ProductsDashboard from "../views/ProductsDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "products",
      component: ProductsDashboard,
    },
  ],
});

export default router;
