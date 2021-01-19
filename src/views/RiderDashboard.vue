<template>
  <div id="rider-dashboard" class="container">
    <div v-if="!loading && riderDetails.rider_status === true">
      <div class="rider-details">
        <div class="profile">
          <h3 class="shop-name">
            {{ riderDetails.company_name | setUppercase }}
          </h3>
          <p class="address">
            {{ riderDetails.address.street | setUppercase }},
            {{ riderDetails.address.lga | setUppercase }},
            {{ riderDetails.address.state | setUppercase }},
            {{ riderDetails.country | setUppercase }}.
          </p>
          <h4 class="contact-person">
            <img src="@/assets/img/profile.svg" alt="profile icon" />{{
              riderDetails.first_name | setUppercase
            }}
            {{ riderDetails.last_name | setUppercase }}
          </h4>
          <h4 class="phone">
            <img src="@/assets/img/phone.svg" alt="phone icon" />{{
              riderDetails.phone_number
            }}
          </h4>
          <h4 class="email">
            <img src="@/assets/img/mail.svg" alt="mail icon" />{{
              riderDetails.email
            }}
          </h4>
        </div>
      </div>
      <div class="dispatch-statistics">Dispatch statistics</div>
    </div>
    <div
      class="approve-div container"
      v-if="riderDetails.rider_status === false"
    >
      <h1>
        Your account has not been approved, please input your account details.
      </h1>
      <router-link to="/rider-account" class="button">
        Input details<span class="loader" v-if="loading"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import storage from "@/utils/storage.js";

export default {
  name: "RiderDashboard",
  data() {
    return {
      riderDetails: "",
    };
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
  mounted() {
    this.riderDetails = storage.getRiderDetails();
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
    }),
  },
  methods: {
    setAccount() {},
  },
};
</script>

<style lang="scss" scoped>
#rider-dashboard {
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

  .rider-details {
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

  .dispatch-statistics {
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
