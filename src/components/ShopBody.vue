<template>
  <div id="home">
    <div v-if="!loading">
      <section class="top-section container">
        <div class="left">
          <img
            class="img-side"
            src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1609798621/contentservice/babyJara.png_SkNyNG-CP.png"
            alt="advert"
          />
          <img
            class="img-side"
            src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1609798623/contentservice/drinksJara.png_S17kEGWCP.png"
            alt="advert"
          />
        </div>
        <div class="center">
          <img
            src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1608712743/contentservice/ASUS.png_HkyEGKx6D.png"
            alt="advert"
          />
          <img
            src="https://ng.jumia.is/cms/Homepage/2020/W49/CB-dod.jpg"
            alt="advert"
          />
        </div>
        <div class="right">
          <img
            class="img-side"
            src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1609798617/contentservice/agricJara.png_Hkl1NMbAw.png"
            alt="advert"
          />
          <img
            class="img-side"
            src="https://www-konga-com-res.cloudinary.com/image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/v1609845484/contentservice/5k.png_S1mej6bAw.png"
            alt="advert"
          />
        </div>
      </section>
      <section class="body container">
        <div
          class="product-item"
          v-for="(product, index) in products"
          :key="index"
        >
          <div
            @click="navigateTo(`/product/${product.name}/id/${product.id}`)"
            class="centered-content"
          >
            <div class="image-container">
              <img :src="product.image" />
            </div>
            <div class="product-name">
              <h4>
                {{ product.name | nameShortenString | setUppercase }}
              </h4>
            </div>
            <div class="product-description">
              <p>
                {{ product.description | shortenString | setUppercase }}
              </p>
            </div>

            <div class="price">
              <h4>${{ product.price.toLocaleString() }}</h4>
            </div>
          </div>
          <button @click="add(product.id)">
            Add to cart<span class="loader" v-if="show"></span>
          </button>
        </div>
      </section>
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
  name: "ShopBody",
  components: {
    ContentLoader,
  },
  data() {
    return {};
  },
  mounted() {
    this.getAllProducts();
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      show: (state) => state.show,
      products: (state) => state.productModule.product.allProduct,
    }),
  },
  methods: {
    ...mapActions("productModule", ["getAllProducts"]),
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
    navigateTo(page) {
      if (page.split("/")[2] === "undefined") {
        return;
      }
      this.$router.push(page);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/home.scss";
</style>
