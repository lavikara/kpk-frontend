import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ShopLayout from "../layouts/ShopLayout.vue";
import VendorLayout from "../layouts/VendorLayout.vue";
import CustomerOnboardingLayout from "../layouts/CustomerOnboardingLayout.vue";
import VendorOnboardingLayout from "../layouts/VendorOnboardingLayout.vue";
import CustomerLayout from "../layouts/CustomerLayout.vue";
import RiderLayout from "../layouts/RiderLayout.vue";
import RiderOnboardingLayout from "../layouts/RiderOnboardingLayout.vue";

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
    component: CustomerLayout,
    children: [
      {
        path: "/customer-account",
        name: "CustomerAccount",
        component: () =>
          import(
            /* webpackChunkName: "customer" */ "../views/CustomerAccount.vue"
          ),
      },
      {
        path: "/shop",
        name: "Shop",
        component: () =>
          import(/* webpackChunkName: "customer" */ "../views/Shop.vue"),
      },
      {
        path: "/product/:slug/id/:id",
        name: "ProductView",
        component: () =>
          import(/* webpackChunkName: "customer" */ "../views/ProductView.vue"),
      },
      {
        path: "/cart",
        name: "Cart",
        component: () =>
          import(/* webpackChunkName: "customer" */ "../views/Cart.vue"),
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
          import(/* webpackChunkName: "vendor" */ "../views/VendorHome.vue"),
      },
      {
        path: "/vendor-dashboard",
        name: "VendorDashboard",
        component: () =>
          import(
            /* webpackChunkName: "vendor" */ "../views/VendorDashboard.vue"
          ),
      },
      {
        path: "/upload-product",
        name: "UploadProduct",
        component: () =>
          import(/* webpackChunkName: "vendor" */ "../views/UploadProduct.vue"),
      },
      {
        path: "/edit-product",
        name: "EditProduct",
        component: () =>
          import(/* webpackChunkName: "vendor" */ "../views/EditProduct.vue"),
      },
      {
        path: "/confirm-payment",
        name: "VendorPayment",
        component: () =>
          import(/* webpackChunkName: "vendor" */ "../views/VendorPayment.vue"),
      },
      {
        path: "/dispatch",
        name: "Dispatch",
        component: () =>
          import(/* webpackChunkName: "vendor" */ "../views/Dispatch.vue"),
      },
    ],
  },
  {
    path: "/",
    component: RiderLayout,
    children: [
      {
        path: "/rider-home",
        name: "RiderHome",
        component: () =>
          import(/* webpackChunkName: "rider" */ "../views/RiderHome.vue"),
      },
      {
        path: "/rider-dashboard",
        name: "RiderDashboard",
        component: () =>
          import(/* webpackChunkName: "rider" */ "../views/RiderDashboard.vue"),
      },
      {
        path: "/asigned-shops",
        name: "AsignedShops",
        component: () =>
          import(/* webpackChunkName: "rider" */ "../views/AsignedShops.vue"),
      },
    ],
  },
  {
    path: "/",
    component: CustomerOnboardingLayout,
    children: [
      {
        path: "/signup",
        name: "CustomerSignup",
        component: () =>
          import(
            /* webpackChunkName: "onboard" */ "../views/CustomerSignup.vue"
          ),
      },
      {
        path: "/login",
        name: "CustomerLogin",
        component: () =>
          import(
            /* webpackChunkName: "onboard" */ "../views/CustomerLogin.vue"
          ),
      },
    ],
  },
  {
    path: "/",
    component: VendorOnboardingLayout,
    children: [
      {
        path: "/vendor-signup",
        name: "VendorSignup",
        component: () =>
          import(/* webpackChunkName: "onboard" */ "../views/VendorSignup.vue"),
      },
      {
        path: "/vendor-login",
        name: "VendorLogin",
        component: () =>
          import(/* webpackChunkName: "onboard" */ "../views/VendorLogin.vue"),
      },
    ],
  },
  {
    path: "/",
    component: RiderOnboardingLayout,
    children: [
      {
        path: "/rider-signup",
        name: "RiderSignup",
        component: () =>
          import(/* webpackChunkName: "onboard" */ "../views/RiderSignup.vue"),
      },
      {
        path: "/rider-login",
        name: "RiderLogin",
        component: () =>
          import(/* webpackChunkName: "onboard" */ "../views/RiderLogin.vue"),
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
