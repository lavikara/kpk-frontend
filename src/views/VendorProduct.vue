<template>
  <div>
    <div id="product" class="container" v-if="!loading && details">
      <div
        class="product-container"
        v-for="(product, index) in details"
        :key="index"
      >
        <div class="left-side">
          <div class="image-container">
            <img :src="product.image" alt="product image" />
          </div>
          <div class="details-container">
            <h3 class="name">{{ product.name | setUppercase }}</h3>
            <p>{{ product.description | setUppercase }}</p>
            <h4>Price: ${{ product.price.toLocaleString() }}</h4>
            <h4>Quantity available: {{ product.stock.quantity_available }}</h4>
            <button @click="add(product.id)">
              <span>
                Update product
              </span>
            </button>
          </div>
        </div>
        <div class="right-side"><h3>Sales statistics</h3></div>
      </div>
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
  name: "VendorProduct",
  components: {
    ContentLoader,
  },
  data() {
    return {
      // items: [],
    };
  },
  mounted() {
    this.getVendorProduct();
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.userModule.vendorProduct.products,
    }),
  },
  methods: {
    ...mapActions("userModule", ["getVendorProduct"]),
  },
  // watch: {
  //   details(newValue, oldValue) {
  //     if (newValue !== oldValue) {
  //       let x = [];
  //       this.details.history.order_history.map((arr) => {
  //         arr.items.map((item) => {
  //           this.items.push(item);
  //         });
  //       });
  //     }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
#product {
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

  .product-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
    border-radius: 10px;
    margin-top: 5rem;
    margin-bottom: 5rem;

    .left-side {
      display: flex;

      .image-container {
        flex: 1;
        display: flex;
        align-items: center;

        img {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }

      .details-container {
        flex: 1.5;
        text-align: left;
        background: #ffffff;
        border-radius: 10px;
        padding: 1rem 2rem;

        .name {
          margin-bottom: 1rem;
        }

        p {
          height: 9rem;
          font-size: 1rem;
          line-height: 1.5;
        }

        h3 {
          font-size: 1.2rem;
          margin-top: 1.2rem;
        }

        h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        button {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8rem;
          background: var(--cyanBlue);
          border-radius: 5px;
          padding: 0.5rem 2.4rem;
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

      h3 {
        margin-top: 1rem;
      }
    }
  }
}
</style>
