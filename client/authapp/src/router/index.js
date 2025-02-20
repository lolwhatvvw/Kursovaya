import Vue from "vue";
import VueRouter from "vue-router";
import Favorite from "../views/Favorite.vue";
import Main from "../views/MainPage.vue";
import BookPage from "../views/BookPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/favorite",
    name: "favorite",
    component: Favorite,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/home",
    name: "main",
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
      path: '/book',
      name: 'book',
      props: true,
      component: BookPage
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
