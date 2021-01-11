<template>
  <div>
    <RiderNav />
    <router-view></router-view>
  </div>
</template>

<script>
import RiderNav from "@/components/RiderNav.vue";

export default {
  name: "RiderOnboardingLayout",
  components: {
    RiderNav,
  },
  data() {
    return {};
  },

  computed: {},
  methods: {},
};
</script>
