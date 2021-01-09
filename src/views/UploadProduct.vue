<template>
  <div>
    <div class="form-container">
      <form @submit.prevent="upload()" class="form">
        <div class="input-container">
          <div>
            <label for="product name">Product name</label>
            <input
              type="text"
              name="productname"
              v-model="details.name"
              placeholder="Product name *"
              class="input-field"
              required
            />
          </div>
          <div>
            <label for="category">Category</label>
            <input
              type="text"
              name="category"
              v-model="details.category"
              placeholder="Category *"
              class="input-field"
              required
            />
          </div>
        </div>
        <div class="input-container">
          <div>
            <label for="description">Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="4"
              v-model="details.description"
              placeholder="Description *"
              class="input-field"
              required
            ></textarea>
          </div>
          <div class="file-input-container">
            <label for="product image">Product image</label>
            <input
              id="file-input"
              type="file"
              accept="image/png image/jpeg image/jpg"
              @change="handleFileChange($event)"
              class="input-field file-input"
              required
            />
          </div>
        </div>
        <div class="input-container">
          <div>
            <label for="price">Price</label>
            <input
              type="text"
              name="price"
              v-model="details.price"
              placeholder="Price *"
              class="input-field"
              required
            />
          </div>
          <div>
            <label for="quantity">Quantity</label>
            <input
              type="text"
              name="quantity"
              v-model="details.stock.quantity_available"
              placeholder="Quantity *"
              class="input-field"
              required
            />
          </div>
        </div>
        <div class="input-container">
          <button>Upload<span class="loader" v-if="loading"></span></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import storage from "@/utils/storage.js";

export default {
  name: "UploadProduct",
  data() {
    return {};
  },
  beforeRouteEnter: (to, from, next) => {
    if (!storage.getVendorDetails()) {
      next((vm) => {
        vm.$router.push("/vendor-login");
      });
    } else {
      next();
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.productModule.uploadProduct,
    }),
  },
  methods: {
    ...mapActions("productModule", ["createProduct"]),
    upload() {
      this.createProduct(this.details);
    },
    handleFileChange() {
      const cloudName = process.env.VUE_APP_CLD_CLOUD_NAME;
      const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const CLOUDINARY_UPLOAD_PRESET = process.env.VUE_APP_CLD_PRESET;
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.details.image = data.secure_url;
          alert("upload complete");
        })
        .catch((err) => console.error(err));
    },
    logout() {
      localStorage.removeItem("vendor_details");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 50%;
  margin: auto;
  border-radius: 5px;
  padding: 1rem 0;

  .form {
    .input-container {
      display: flex;
      justify-content: space-evenly;
      margin: 1rem 0;

      div {
        width: 49%;

        label,
        span {
          width: 100%;
          display: flex;
          font-size: 0.8rem;
          margin-left: 1rem;
        }

        .address-label {
          margin-left: 1.4rem;
        }

        .input-field {
          width: 90%;
          color: var(--cyanBlue);
          font-size: 14px;
          border: 1px solid var(--cyanBlue);
          border-radius: 5px;
          padding: 0.5rem;
        }

        .file-input {
          width: 94%;
          padding: 0;
          cursor: pointer;
        }

        span {
          color: #dc3545;
          font-size: 0.7rem;
          transition: all 0.5s linear;
          animation: slideError 0.5s linear;
        }
        @media screen and (max-width: 600px) {
          width: 100%;
        }

        .address {
          width: 81%;
        }

        .invalid {
          border: 1px solid #dc3545;
        }
        .disabled {
          border: 1px solid rgba(0, 0, 0, 0.2);
          &::placeholder {
            color: rgba(0, 0, 0, 0.2);
          }
        }

        .fade-enter-active,
        .fade-leave-active {
          transition: all 0.3s cubic-bezier(0.45, 0.25, 0.6, 0.95);
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
          opacity: 0;
        }
      }

      .file-input-container {
        padding: 0;
      }

      .file-input::-webkit-file-upload-button {
        visibility: hidden;
      }

      .file-input::before {
        content: "Select image *";
        width: 100%;
        display: inline-block;
        padding: 5px 8px 60px 8px;
        -webkit-user-select: none;
        font-size: 14px;
        color: #757575;
        background: #ffffff;
      }

      button {
        display: flex;
        align-items: center;
        background: var(--cyanBlue);
        border-radius: 5px;
        padding: 0.5rem 2rem;
        margin-top: 1rem;

        span {
          margin-left: 0.5rem;
        }
      }
    }

    .form-section {
      margin-top: 4rem;
    }
  }
}
</style>
