<template>
  <div id="vendor-dashboard" class="container">
    <div v-if="!loading">
      <div
        class="vendor-details"
        v-if="!loading && vendorDetails.is_registered === true"
      >
        <div class="profile">
          <h3 class="shop-name">
            {{ vendorDetails.business_name | setUppercase }}
          </h3>
          <p class="address">
            {{ vendorDetails.address.street | setUppercase }},
            {{ vendorDetails.address.lga | setUppercase }},
            {{ vendorDetails.address.state | setUppercase }},
            {{ vendorDetails.country | setUppercase }}.
          </p>
          <h4 class="contact-person">
            <img src="@/assets/img/profile.svg" alt="profile icon" />{{
              vendorDetails.first_name | setUppercase
            }}
            {{ vendorDetails.last_name | setUppercase }}
          </h4>
          <h4 class="phone">
            <img src="@/assets/img/phone.svg" alt="phone icon" />0{{
              vendorDetails.phone_number
            }}
          </h4>
          <h4 class="email">
            <img src="@/assets/img/mail.svg" alt="mail icon" />{{
              vendorDetails.email
            }}
          </h4>
        </div>
      </div>
      <div
        class="shop-statistics"
        v-if="!loading && vendorDetails.is_registered === true"
      >
        Shop statistics
      </div>
      <div
        class="approve-div container"
        v-if="!loading && vendorDetails.is_registered === false"
      >
        <h1 v-if="!loading && vendorDetails.account_details.country === ''">
          Please input your account details.
        </h1>
        <h1 v-if="!loading && vendorDetails.account_details.country !== ''">
          Your shop has not been approved, please pay $20 registration fee.<br />
          (If you've paied and still get this notification, just logout and
          login again)
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
    <div class="approve-div container" v-if="!vendorDetails.account_details">
      <h1 v-if="!loading">
        Invalid account details provided,<br />
        please enter valid account details.
      </h1>
      <router-link to="/vendor-account" class="button" v-if="!loading">
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
    this.vendorDetails = storage.getVendorDetails();
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

  .vendor-details {
    display: flex;
    margin-top: 3rem;

    .profile {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: #ffffff;
      padding: 1rem 2rem;
      border-radius: 10px;

      .shop-name {
        margin-bottom: 0.5rem;
      }

      .address {
        font-size: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }

      .contact-person,
      .phone,
      .email {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        margin: 0.3rem 0.5rem 0.3rem 0;

        img {
          margin-right: 0.5rem;
        }
      }
    }
  }

  .shop-statistics {
    background: #ffffff;
    border-radius: 10px;
    padding: 10rem;
    margin: 4rem 0;
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
