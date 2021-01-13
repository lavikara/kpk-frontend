<template>
  <div>
    <h1>hello from vendor payment</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import storage from "@/utils/storage.js";

export default {
  data() {
    return {
      vendorDetails: storage.getVendorDetails(),
    };
  },
  beforeRouteEnter: (to, from, next) => {
    if (to.query.status === "successful") {
      next((vm) => {
        localStorage.removeItem("vendor_details");
        vm.showModal({
          description:
            "Payment successful, please login and select dispatch to complete the process.",
          display: true,
          type: "info",
        });
        vm.$router.push("/vendor-login");
      });
    } else {
      next((vm) => {
        vm.showModal({
          description: "Payment was not successful.",
          display: true,
          type: "info",
        });
        vm.$router.push("/vendor-dashboard");
      });
      next();
    }
  },
  mounted() {},
  methods: {
    ...mapActions("notificationModule", ["showModal"]),
  },
};
</script>
