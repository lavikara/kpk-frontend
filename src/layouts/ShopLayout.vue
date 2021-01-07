<template>
  <div>
    <ShopNav />
    <router-view></router-view>
  </div>
</template>
<script>
import ShopNav from "@/components/ShopNav.vue";

export default {
  components: {
    ShopNav,
  },
};
</script>
