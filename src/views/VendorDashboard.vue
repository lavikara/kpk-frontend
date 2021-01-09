<template>
  <div>
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

<style lang="scss" scoped></style>
