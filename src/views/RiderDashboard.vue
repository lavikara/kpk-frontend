<template>
  <div>
    <h1>hello from rider dashboard</h1>
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
    if (!storage.getRiderDetails()) {
      next((vm) => {
        vm.$router.push("/rider-login");
      });
    } else {
      next();
    }
  },
};
</script>
