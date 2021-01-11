<template>
  <div>
    <ShopNav />
    <router-view></router-view>
  </div>
</template>

<script>
import ShopNav from "@/components/ShopNav.vue";

export default {
  name: "CustomerOnboardingLayout",
  components: {
    ShopNav,
  },
  data() {
    return {};
  },

  computed: {},
  methods: {},
};
</script>
