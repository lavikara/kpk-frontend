<template>
  <div>
    <VendorNav />
    <router-view></router-view>
  </div>
</template>

<script>
import VendorNav from "@/components/VendorNav.vue";

export default {
  name: "vendorOnboardingLayout",
  components: {
    VendorNav,
  },
  data() {
    return {};
  },

  computed: {},
  methods: {},
};
</script>
