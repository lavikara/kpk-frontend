<template>
  <div>
    <div id="topnav">
      <div class="topnav container">
        <h1 class="logo">
          <a href="/" class="link"
            >KPK<img src="@/assets/img/trolley.svg" alt="trolley icon"
          /></a>
        </h1>
        <div class="links">
          <ul>
            <li @click="logout">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h1>hello from vendor dashboard</h1>
    <router-link to="/upload-product"
      ><button>Upload product</button></router-link
    >
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
    if (!storage.getVendorDetails()) {
      next((vm) => {
        vm.$router.push("/vendor-login");
      });
    } else {
      next();
    }
  },
  computed: {},
  methods: {
    logout() {
      localStorage.removeItem("vendor_details");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background: var(--cyanBlue);
  border-radius: 5px;
  padding: 0.5rem 2rem;
  margin-top: 1rem;
}
</style>
