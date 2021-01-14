<template>
  <div>
    <div id="vendor-signup" v-if="!loading">
      <div class="form-container">
        <form @submit.prevent="createAccount()" class="form">
          <div class="input-container">
            <div>
              <label for="country">Country</label>
              <input
                type="text"
                name="country"
                v-model="country"
                placeholder="Country *"
                class="input-field"
                disabled
              />
            </div>
            <div>
              <label for="bank name">Bank name</label>
              <select
                class="input-field select"
                v-model="details.account_bank"
                required
              >
                <option disabled value="">Bank name</option>
                <option
                  v-for="bank in bankList"
                  v-bind:value="bank.code"
                  :key="bank.code"
                >
                  {{ bank.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="input-container">
            <div>
              <label for="account number">Account number</label>
              <input
                type="tel"
                name="accountnumber"
                v-model="details.account_number"
                @focus="resetInputValidation"
                @blur="validateInput"
                @keypress="isNumber($event)"
                placeholder="Account number *"
                class="input-field"
                :class="{
                  invalid: formValidation.account_number === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.account_number"
                  >Field can't be empty</span
                >
              </transition>
            </div>
            <div>
              <label for="business number">Business tel</label>
              <input
                type="tel"
                name="businessnumber"
                v-model="details.business_mobile"
                @focus="resetInputValidation"
                @blur="validateInput"
                @keypress="isNumber($event)"
                placeholder="Business tel *"
                class="input-field"
                :class="{
                  invalid: formValidation.business_mobile === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.business_mobile"
                  >Please enter a valid phone number</span
                >
              </transition>
            </div>
          </div>
          <div class="input-container form-section">
            <div>
              <label for="account name">Account name</label>
              <input
                type="text"
                name="accountname"
                v-model="details.business_name"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="Account name *"
                class="input-field"
                :class="{
                  invalid: formValidation.business_name === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.business_name"
                  >Field can't be empty</span
                >
              </transition>
            </div>
            <div>
              <label for="business email">Business email</label>
              <input
                type="email"
                name="businessemail"
                v-model="details.business_email"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="Business email *"
                class="input-field"
                :class="{
                  invalid: formValidation.business_email === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.business_email"
                  >Please enter a valid email</span
                >
              </transition>
            </div>
          </div>
          <div class="input-container">
            <button :disabled="loading === true">
              Submit<span class="loader" v-if="loading"></span>
            </button>
          </div>
        </form>
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
import storage from "@/utils/storage.js";

export default {
  name: "RiderAccount",
  components: {
    ContentLoader,
  },
  data() {
    return {
      country: storage.getRiderDetails().country,
    };
  },
  mounted() {
    switch (this.country) {
      case "Nigeria":
        this.getBankList("NG");
        this.setCountry("NG");
        break;
      case "Ghana":
        this.getBankList("GH");
        this.setCountry("GH");
        break;
      case "Kenya":
        this.getBankList("KE");
        this.setCountry("KE");
        break;
      case "Uganda":
        this.getBankList("UG");
        this.setCountry("UG");
        break;
      case "South Africa":
        this.getBankList("ZA");
        this.setCountry("ZA");
        break;
      case "Tanzania":
        this.getBankList("TZ");
        this.setCountry("TZ");
        break;

      default:
        break;
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.paymentModule.accountDetails,
      bankList: (state) => state.paymentModule.bankList.list,
      formValidation: (state) => state.authModule.formValidation,
    }),
  },
  methods: {
    ...mapActions("authModule", ["validate"]),
    ...mapActions("notificationModule", ["showModal"]),
    ...mapActions("paymentModule", [
      "getBankList",
      "setCountry",
      "createRiderSubAccount",
    ]),

    createAccount() {
      if (Object.values(this.formValidation).includes(true)) {
        this.showModal({
          description: "invalid input detected, please fill form correctly.",
          display: true,
          type: "info",
        });
        location.reload();
      } else {
        this.createRiderSubAccount(this.details);
      }
    },

    resetInputValidation() {
      let field = event.target.attributes.placeholder.value;
      this.validate({ field: field, invalid: false });
    },

    validateInput() {
      let field = event.target.attributes.placeholder.value;
      switch (field) {
        case "Account name *":
          if (
            this.details.business_name.length === 0 ||
            !this.details.business_name.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Account number *":
          if (
            this.details.account_number.length === 0 ||
            !this.details.account_number.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Business tel *":
          if (
            this.details.business_mobile.length === 0 ||
            !this.details.business_mobile.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Business email *":
          if (
            this.details.business_email.length === 0 ||
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              this.details.business_email
            )
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;

        default:
          break;
      }
    },

    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/vendor-signup.scss";
</style>
