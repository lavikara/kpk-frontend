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
            <li>
              <router-link to="/vendor-login">Login</router-link>
            </li>
            <li>
              <router-link to="/vendor-signup">Signup</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
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
