<template>
  <div>
    <TopHeader />
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";

export default {
  name: "App",
  components: {
    TopHeader,
  },
};
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
