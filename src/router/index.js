import { useIsLoggedIn } from "@/hooks";
import { createRouter, createWebHistory } from "vue-router";

/** @type {import("vue-router").RouteRecordRaw[]} */
const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "login" },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn.value && to.meta.requiresAuth) {
    return { name: "login" };
  } else if (isLoggedIn.value && !to.meta.requiresAuth) {
    return { name: "dashboard" };
  }
});

export default router;
