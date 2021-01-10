<template>
  <div>
    <div id="product-view" class="container" v-if="!loading">
      <div class="left-side">
        <div class="image-container">
          <img :src="product.image" alt="product image" />
        </div>
        <div class="details-container">
          <h2 class="name">{{ product.name | setUppercase }}</h2>
          <p>{{ product.description | setUppercase }}</p>
          <h4>₦ {{ product.price.toLocaleString() }}</h4>
          <button @click="add(product.id)">
            <span>
              Add to cart<img
                src="@/assets/img/cart.svg"
                alt="cart icon"
                v-if="!show"
              />
              <span class="loader" v-if="show"></span>
            </span>
          </button>
        </div>
      </div>
      <div class="right-side"></div>
    </div>
    <ContentLoader v-if="loading">
      <div class="loader"></div>
    </ContentLoader>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContentLoader from "@/components/ContentLoader";
import storage from "@/utils/storage.js";

export default {
  name: "ProductView",
  components: {
    ContentLoader,
  },
  data() {
    return {};
  },
  created() {
    const id = this.$route.params.id;
    this.getProductById(id);
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      show: (state) => state.show,
      product: (state) => state.productModule.product.singleProduct,
    }),
  },
  methods: {
    ...mapActions("productModule", ["getProductById"]),
    ...mapActions("cartModule", ["addToCart"]),
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    add(id) {
      if (!storage.getCustomerDetails()) {
        this.showModal({
          description: "You have to login or signup before adding to cart",
          display: true,
          type: "info",
        });
        this.$router.push("/login");
        return;
      }
      this.addToCart({ product_id: id });
    },
  },
};
</script>

<style lang="scss" scoped>
#product-view {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 1rem;
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 5rem;

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

  .left-side {
    display: flex;
    background: #ffffff;
    border-radius: 10px;

    .image-container {
      flex: 1;
      display: flex;
      align-items: center;
      height: 25rem;
      padding: 1rem;

      img {
        height: 20rem;
        border-radius: 10px;
      }
    }

    .details-container {
      flex: 1.5;
      text-align: left;
      margin-top: 4rem;
      padding: 0 1rem 0 0.5rem;

      .name {
        margin-bottom: 1rem;
      }

      p {
        height: 6rem;
        font-size: 1.2rem;
        line-height: 1.5;
      }

      h4 {
        font-size: 1.6rem;
        margin-top: 3rem;
        margin-bottom: 2rem;
      }

      button {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        font-size: 1.4rem;
        background: var(--cyanBlue);
        border-radius: 5px;
        padding: 1rem 2rem;
        margin-bottom: 1rem;
        transition: all 0.3s;

        span {
          display: flex;
          align-items: center;

          img {
            position: absolute;
            right: 8.5rem;
            visibility: hidden;
          }

          .loader {
            position: absolute;
            right: 8.5rem;
          }
        }

        &:hover {
          filter: brightness(1.2);
        }

        &:hover img {
          visibility: visible;
        }
      }
    }
  }

  .right-side {
    background: #ffffff;
    border-radius: 10px;
  }
}
</style>
