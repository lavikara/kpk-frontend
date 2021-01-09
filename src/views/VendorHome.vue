<template>
  <div>
    <h1>hello from vendor home</h1>
  </div>
</template>

<script>
import storage from "@/utils/storage.js";

export default {
  name: "TopNav",
  data() {
    return {};
  },
  beforeRouteEnter: (to, from, next) => {
    if (storage.getVendorDetails()) {
      next((vm) => {
        vm.$router.push("/vendor-dashboard");
      });
    } else {
      next();
    }
  },
  computed: {},
};
</script>
