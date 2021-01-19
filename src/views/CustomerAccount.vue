<template>
  <div id="customer-account" class="container">
    <div class="account-container" v-if="!loading && details">
      <ul class="product-item" v-for="(item, index) in items" :key="index">
        <li><img :src="item.image" alt="product image" /></li>
        <li>Purchased</li>
      </ul>
    </div>
    <ContentLoader v-if="loading">
      <div class="loader"></div>
    </ContentLoader>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContentLoader from "@/components/ContentLoader";

export default {
  name: "CustomerAccount",
  components: {
    ContentLoader,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.getCustomerHistory();
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.userModule.customerHistory.history,
    }),
  },
  methods: {
    ...mapActions("userModule", ["getCustomerHistory"]),
  },
  watch: {
    details(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.details.history.order_history.map((arr) => {
          arr.items.map((item) => {
            this.items.push(item);
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#customer-account {
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

  .account-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 10rem;

    .product-item {
      background: #ffffff;
      margin: 2rem 0.5rem;
      margin-bottom: 0;
      border-radius: 10px;
      padding: 2rem;
      transition: all 0.3s;

      li {
        margin-top: 1rem;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
