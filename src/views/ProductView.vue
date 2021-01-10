<template>
  <div id="product-view" class="container">
    <div class="left-side">
      <div class="image-container">
        <img :src="product.image" alt="product image" />
      </div>
      <div class="details-container">
        <h2 class="name">{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <h4>₦ {{ product.price }}</h4>
        <button @click="add(product.id)">
          Add to cart<img src="@/assets/img/cart.svg" alt="cart icon" />
        </button>
      </div>
    </div>
    <div class="right-side"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProductView",
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
      product: (state) => state.productModule.product.singleProduct,
    }),
  },
  methods: {
    ...mapActions("productModule", ["getProductById"]),
    ...mapActions("cartModule", ["addToCart"]),
    add(id) {
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

        img {
          position: absolute;
          right: 8.5rem;
          visibility: hidden;
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
