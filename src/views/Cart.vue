<template>
  <div>
    <div id="cart" class="container" v-if="cart && cart.total_quantity != 0">
      <div class="items-container">
        <ul v-for="(item, index) in cart.items" :key="index" class="items">
          <li>
            <img :src="item.image" alt="product image" />
          </li>
          <li class="item left-align">
            <h3>{{ item.name | setUppercase }}</h3>
            <p>{{ item.description | setUppercase }}</p>
          </li>
          <li class="item quantity">
            <label for="price">Quantity</label>
            <div>
              <span>
                <img
                  src="@/assets/img/chevron-down.svg"
                  alt="chevron icon"
                  @click="remove(item.id)"
                />
              </span>
              <h4>{{ item.quantity }}</h4>
              <span>
                <img
                  src="@/assets/img/chevron-up.svg"
                  alt="chevron icon"
                  @click="add(item.id)"
                />
              </span>
            </div>
          </li>
          <li class="item">
            <label for="price">Unit price</label>
            <h4>${{ item.price.toLocaleString() }}</h4>
          </li>
          <li class="item">
            <label for="price">Sub total</label>
            <h4>${{ item.sub_total.toLocaleString() }}</h4>
          </li>
          <li class="item">
            <span
              ><img
                src="@/assets/img/trash.svg"
                alt="trash icon"
                @click="deleteItem(item.id)"
            /></span>
          </li>
        </ul>
        <ul class="total-fig">
          <li>
            Total quantity: <span>{{ cart.total_quantity }}</span>
          </li>
          <li>
            Total amount: <span>${{ cart.total_price.toLocaleString() }}</span>
          </li>
        </ul>
        <ul class="total-fig delivery">
          <li>
            Delivery: <span>${{ cart.dispatch.toLocaleString() }}</span>
          </li>
        </ul>
      </div>
      <div class="buttons">
        <button @click="navigateTo('/shop')">Continue shopping</button>
        <button class="checkout" @click="checkout">Checkout</button>
      </div>
    </div>
    <ContentLoader v-else>
      <div class="loader" v-if="loading"></div>
      <h3 v-if="!loading" class="loader-text">
        Your cart is empty
        <img src="@/assets/img/empty-cart.svg" alt="cart icon" />
      </h3>
    </ContentLoader>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContentLoader from "@/components/ContentLoader";
import storage from "@/utils/storage.js";

export default {
  name: "Cart",
  components: {
    ContentLoader,
  },
  data() {
    return {
      customerDetails: "",
    };
  },
  beforeRouteEnter: (to, from, next) => {
    if (!storage.getCustomerDetails()) {
      next((vm) => {
        vm.$router.push("/login");
        vm.showModal({
          description: "You have to login or signup to access your cart",
          display: true,
          type: "info",
        });
      });
      return;
    } else {
      next((vm) => {
        vm.getCart();
      });
      next();
    }
  },
  mounted() {
    this.customerDetails = storage.getCustomerDetails();
    this.cartPaymentDetails({
      customer: this.customerDetails,
      amount: this.cart.total_price + this.cart.dispatch,
    });
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      cart: (state) => state.cartModule.cart.items,
      details: (state) => state.paymentModule.paymentDetails,
      paymentUrl: (state) => state.paymentModule.paymentUrl.url,
    }),
  },
  methods: {
    ...mapActions("cartModule", [
      "getCart",
      "addToCart",
      "removeFromCart",
      "deleteFromCart",
    ]),
    ...mapActions("notificationModule", ["showToast", "showModal"]),
    ...mapActions("paymentModule", [
      "cartPaymentDetails",
      "generateVendorPaymentLink",
    ]),
    checkout() {
      this.showModal({
        description: "You will be redirected to our payment platform.",
        display: true,
        type: "info",
      });
      this.generateVendorPaymentLink(this.details);
    },
    add(id) {
      this.addToCart({ product_id: id });
    },
    remove(id) {
      this.removeFromCart({ product_id: id });
    },
    deleteItem(id) {
      this.deleteFromCart({ product_id: id });
    },
    navigateTo(page) {
      if (page.split("/")[2] === "undefined") {
        return;
      }
      this.$router.push(page);
    },
  },
  watch: {
    paymentUrl(newValue, oldValue) {
      if (newValue !== oldValue) {
        window.location = newValue;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#cart {
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

  .items-container {
    margin: 3rem 0 5rem 0;

    ul {
      display: flex;
    }

    .items {
      background: #ffffff;
      border-radius: 10px;
      padding: 1rem;
      margin: 1rem 0;

      li {
        flex: 1;

        img {
          height: 6rem;
          border-radius: 10px;
        }

        span {
          img {
            height: 1.2rem;
            cursor: pointer;
          }
        }
      }

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;

        label {
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }

      .left-align {
        flex: 2;
        text-align: left;
      }

      .quantity {
        div {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        h4 {
          margin: 0 0.5rem;
        }
      }
    }

    .total-fig {
      justify-content: flex-end;
      margin-top: 5rem;

      li {
        font-size: 1.1rem;

        margin: 0 3rem;

        &:last-child {
          margin: 0;
        }

        span {
          font-weight: 700;
        }
      }
    }

    .delivery {
      margin-top: 1rem;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8rem;

    button {
      color: var(--cyanBlue);
      font-size: 1.1rem;
      background: #99b8e9;
      border-radius: 10px;
      margin: 0 1.5rem;
      padding: 1rem 4rem;
    }

    .checkout {
      color: #ffffff;
      background: var(--cyanBlue);
      margin-right: 0;
    }
  }
}
</style>
