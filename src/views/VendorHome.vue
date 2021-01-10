<template>
  <div id="vendor-home">
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

<style lang="scss" scoped>
#vendor-home {
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
