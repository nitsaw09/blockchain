import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import NFT from "../views/NFT.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/nft",
    name: "NFT",
    component: NFT
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
