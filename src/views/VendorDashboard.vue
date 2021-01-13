<template>
  <div id="vendor-dashboard">
    <h1 v-if="!loading && vendorDetails.vendor_status === true">
      hello from vendor dashboard
    </h1>
    <div
      class="approve-div container"
      v-if="!loading && vendorDetails.vendor_status === false"
    >
      <h1 v-if="!loading && vendorDetails.account_details.country === ''">
        Please input your account details.
      </h1>
      <h1 v-if="!loading && vendorDetails.account_details.country !== ''">
        Your shop has not been approved, please pay $20 for registration.
      </h1>
      <button
        @click="pay"
        v-if="!loading && vendorDetails.account_details.country !== ''"
      >
        Pay<span class="loader" v-if="loading"></span>
      </button>
      <router-link
        to="/vendor-account"
        class="button"
        v-if="!loading && vendorDetails.account_details.country === ''"
      >
        Input details<span class="loader" v-if="loading"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import storage from "@/utils/storage.js";

export default {
  name: "VendorDashboard",
  data() {
    return {
      vendorDetails: "",
    };
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
  mounted() {
    this.vendorDetails = storage.getVendorDetails().user;
    if (this.vendorDetails.vendor_status === false) {
      this.paymentDetails(this.vendorDetails);
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.paymentModule.paymentDetails,
      paymentUrl: (state) => state.paymentModule.paymentUrl.url,
    }),
  },
  methods: {
    ...mapActions("paymentModule", [
      "generateVendorPaymentLink",
      "paymentDetails",
    ]),
    ...mapActions("notificationModule", ["showModal"]),
    pay() {
      this.showModal({
        description: "You will be redirected to our payment platform.",
        display: true,
        type: "info",
      });
      this.generateVendorPaymentLink(this.details);
    },
  },
  watch: {
    paymentUrl(newValue, oldValue) {
      if (newValue !== oldValue) {
        window.location = newValue;
      }
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

  .approve-div {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-size: 20px;
      margin-bottom: 1.2rem;
      line-height: 1.5;
    }
  }
  button {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 auto;
    background: var(--cyanBlue);
    border-radius: 5px;
    padding: 0.5rem 2rem;
    margin-bottom: 1rem;
    transition: all 0.3s;

    span {
      position: absolute;
      right: 0.7rem;
    }
  }

  .button {
    position: relative;
    display: flex;
    color: #ffffff;
    align-items: center;
    margin: 0 auto;
    background: var(--cyanBlue);
    border-radius: 5px;
    padding: 0.5rem 2rem;
    margin-bottom: 1rem;
    transition: all 0.3s;

    span {
      position: absolute;
      right: 0.7rem;
    }
  }
}
</style>
