<template>
  <div id="home">
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
        <div class="centered-content">
          <div class="image-container">
            <img :src="product.image" />
          </div>
          <div class="product-name">{{ product.name | setUppercase }}</div>
          <div class="product-description">
            <p>
              {{ product.description | shortenString | setUppercase }}
            </p>
          </div>

          <div class="price">₦ {{ product.price.toLocaleString() }}</div>
          <button>
            Add to cart<span class="loader" v-if="loading"></span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ShopBody",
  data() {
    return {};
  },
  mounted() {
    this.getAllProducts();
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      products: (state) => state.productModule.product.allProduct,
    }),
  },
  methods: {
    ...mapActions("productModule", ["getAllProducts"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/home.scss";
</style>
