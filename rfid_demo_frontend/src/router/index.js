import { createRouter, createWebHistory } from "vue-router";
import DCTags from "../views/DCTags.vue";
import TransferToShop from "../views/TransferToShop.vue";
import Shop from "../views/Shop.vue";
import Shop1 from "../views/Shop1.vue";
import DCStyles from "../views/DCStyles.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/dcTags",
    name: "DCTags",
    component: DCTags,
  },
  {
    path: "/transferToShop",
    name: "TransferToShop",
    component: TransferToShop,
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/shop1",
    name: "Shop1",
    component: Shop1,
  },
  {
    path: "/",
    name: "DCStyles",
    component: DCStyles,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
