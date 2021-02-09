import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Intro",
    component: () => import("@/views/IntroPage.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue")
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isLogin) next('/main');
    //   else next();
    // },
  },
  {
    path: "/join",
    name: "Join",
    component: () => import("@/views/JoinPage.vue")
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isLogin) next('/main');
    //   else next();
    // },
  },
  {
    path: "/Admin",
    name: "Admin",
    component: () => import("@/views/AdminPage.vue")
  },
  {
    path: "/Medical",
    name: "Medical",
    component: () => import("@/views/MedicalPage.vue")
  },
  {
    path: "/Test",
    name: "Test",
    component: () => import("@/views/Test.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;