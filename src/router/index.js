import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ShopLayout from "../layouts/ShopLayout.vue";
import VendorLayout from "../layouts/VendorLayout.vue";
import OnboardingLayout from "../layouts/OnboardingLayout.vue";
import CustomerAuthLayout from "../layouts/CustomerAuthLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: ShopLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        hidden: true,
      },
    ],
  },
  {
    path: "/",
    component: CustomerAuthLayout,
    children: [
      {
        path: "/customer-account",
        name: "CustomerAccount",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/CustomerAccount.vue"
          ),
      },
      {
        path: "/shop",
        name: "Shop",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Shop.vue"),
      },
    ],
  },
  {
    path: "/",
    component: VendorLayout,
    children: [
      {
        path: "/vendor-home",
        name: "VendorHome",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/VendorHome.vue"),
      },
      {
        path: "/vendor-dashboard",
        name: "VendorDashboard",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/VendorDashboard.vue"
          ),
      },
      {
        path: "/upload-product",
        name: "UploadProduct",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/UploadProduct.vue"),
      },
    ],
  },
  {
    path: "/",
    component: OnboardingLayout,
    children: [
      {
        path: "/signup",
        name: "CustomerSignup",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/CustomerSignup.vue"),
      },
      {
        path: "/login",
        name: "CustomerLogin",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/CustomerLogin.vue"),
      },
      {
        path: "/vendor-signup",
        name: "VendorSignup",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/VendorSignup.vue"),
      },
      {
        path: "/vendor-login",
        name: "VendorLogin",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/VendorLogin.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
