<template>
  <div id="vendor-dashboard">
    <h1>hello from vendor dashboard</h1>
  </div>
</template>

<script>
import storage from "@/utils/storage.js";

export default {
  name: "VendorDashboard",
  data() {
    return {};
  },
  beforeRouteEnter: (to, from, next) => {
    if (!storage.getVendorDetails()) {
      next((vm) => {
        vm.$router.push("/vendor-login");
      });
    } else {
      next();
    }
  },
  computed: {},
  methods: {
    logout() {
      localStorage.removeItem("vendor_details");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
#vendor-dashboard {
  animation-name: fadeIn;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
