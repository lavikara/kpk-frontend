<template>
  <div id="rider-dashboard">
    <h1 v-if="!loading && riderDetails.rider_status === true">
      hello from rider dashboard
    </h1>
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
