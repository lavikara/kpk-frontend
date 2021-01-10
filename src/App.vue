<template>
  <div>
    <Toast />
    <Modal />
    <TopHeader />
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import Toast from "@/components/notification/Toast.vue";
import Modal from "@/components/notification/Modal.vue";

export default {
  name: "App",
  components: {
    TopHeader,
    Toast,
    Modal,
  },
};
</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
