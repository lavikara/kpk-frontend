<template>
  <div>
    <ContentLoader v-if="loading">
      <h3 class="loader-text">Please hold on while we confirm payment.</h3>
      <div class="loader"></div>
    </ContentLoader>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContentLoader from "@/components/ContentLoader";
import storage from "@/utils/storage.js";

export default {
  name: "VendorPayment",
  components: {
    ContentLoader,
  },
  data() {
    return {
      vendorDetails: storage.getVendorDetails(),
    };
  },
  beforeRouteEnter: (to, from, next) => {
    if (to.query.status === "successful") {
      next((vm) => {
        vm.verifyVendorPayment({
          id: to.query.transaction_id,
          ref: to.query.tx_ref,
        });
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
  computed: {
    ...mapState({
      loading: (state) => state.loading,
    }),
  },
  methods: {
    ...mapActions("notificationModule", ["showToast"]),
    ...mapActions("paymentModule", ["verifyVendorPayment"]),
  },
};
</script>
