import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/", alias: '/home',
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () =>
      import(/* webpackChunkName: "gallery" */ "../views/Gallery.vue")
  },
  {
    path: "/sponsor",
    name: "Sponsor",
    component: () =>
      import(/* webpackChunkName: "sponsor" */ "../views/Sponsor.vue")
  },
  {
    path: "/join",
    name: "Join",
    component: () =>
      import(/* webpackChunkName: "join" */ "../views/Join.vue")
  },
  {
    path: "/blog",
    name: "Blog",
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/Blog.vue")
  },
  {
    path: "/blog/:blogId",
    name: "Post",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/Post.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue")
  },
  {
    path: "/account", alias: '/login',
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account.vue")
  },
  { path: '/index.html', redirect: '/' },
  { path: '/blogdetail.php', redirect: '/blog' },
  { path: '/:page.html', redirect: '/:page' },
  { path: '/:page.php', redirect: '/:page' },
  {
    path: '/*',
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/404.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
