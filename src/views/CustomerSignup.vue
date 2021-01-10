<template>
  <div>
    <div id="vendor-signup">
      <div class="form-container">
        <form @submit.prevent="signup()" class="form">
          <div class="input-container">
            <div>
              <label for="first name">First name</label>
              <input
                type="text"
                name="firstname"
                v-model="details.first_name"
                @input="validateInput"
                @blur="validateInput"
                placeholder="First name *"
                class="input-field"
                :class="{
                  invalid: formValidation.first_name === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.first_name"
                  >Field can't be empty or have space</span
                >
              </transition>
            </div>
            <div>
              <label for="last name">Last name</label>
              <input
                type="text"
                name="lastname"
                v-model="details.last_name"
                @input="validateInput"
                @blur="validateInput"
                placeholder="Last name *"
                class="input-field"
                :class="{
                  invalid: formValidation.last_name === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.last_name"
                  >Field can't be empty or have space</span
                >
              </transition>
            </div>
          </div>
          <div class="input-container">
            <div>
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                v-model="details.email"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="Email *"
                class="input-field"
                :class="{
                  invalid: formValidation.email === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.email"
                  >Please enter a valid email</span
                >
              </transition>
            </div>
            <div>
              <label for="phone number">Phone number</label>
              <input
                type="tel"
                name="telephone"
                v-model="details.phone_number"
                @focus="resetInputValidation"
                @blur="validateInput"
                @keypress="isNumber($event)"
                placeholder="Phone number *"
                class="input-field"
                :class="{
                  invalid: formValidation.phone_number === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.phone_number"
                  >Please enter a valid phone number</span
                >
              </transition>
            </div>
          </div>
          <div class="input-container form-section">
            <div>
              <label for="street" class="address-label">Street</label>
              <input
                type="text"
                name="street"
                v-model="details.address.street"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="Street *"
                class="input-field address"
                :class="{
                  invalid: formValidation.address.street === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.address.street"
                  >Field cant be empty</span
                >
              </transition>
            </div>
            <div>
              <label for="lga" class="address-label">LGA</label>
              <input
                type="text"
                name="lga"
                v-model="details.address.lga"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="LGA *"
                class="input-field address"
                :class="{
                  invalid: formValidation.address.lga === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.address.lga"
                  >Field cant be empty</span
                >
              </transition>
            </div>
            <div>
              <label for="state" class="address-label">State</label>
              <input
                type="text"
                name="state"
                v-model="details.address.state"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="State *"
                class="input-field address"
                :class="{
                  invalid: formValidation.address.state === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.address.state"
                  >Field cant be empty</span
                >
              </transition>
            </div>
          </div>

          <div class="input-container">
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                v-model="details.password"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="Password *"
                class="input-field"
                :class="{
                  invalid: formValidation.password === true,
                }"
                required
              />
              <transition name="fade">
                <span v-if="formValidation.password"
                  >Password must be at least 6 characters</span
                >
              </transition>
            </div>
            <div>
              <label for="confirm password">Confirm password</label>
              <input
                type="password"
                name="confirmpassword"
                v-model="details.confirmPassword"
                @focus="resetInputValidation"
                @blur="validateInput"
                placeholder="Confirm password *"
                class="input-field"
                :class="{
                  invalid: formValidation.confirmPassword === true,
                  disabled: details.password.length < 6,
                }"
                required
                :disabled="details.password.length < 6"
              />
              <transition name="fade">
                <span v-if="formValidation.confirmPassword"
                  >Password doesn't match</span
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CustomerSignup",
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.accountModule.signupCustomer,
      formValidation: (state) => state.accountModule.formValidation,
    }),
  },
  methods: {
    ...mapActions("accountModule", ["signupCustomer", "validate"]),
    ...mapActions("notificationModule", ["showModal"]),

    signup() {
      if (Object.values(this.formValidation).includes(true)) {
        this.showModal({
          description: "invalid input detected, please fill form correctly.",
          display: true,
          type: "info",
        });
      } else {
        delete this.details.confirmPassword;
        this.signupCustomer(this.details);
      }
    },

    resetInputValidation() {
      let field = event.target.attributes.placeholder.value;
      this.validate({ field: field, invalid: false });
    },

    validateInput() {
      let field = event.target.attributes.placeholder.value;
      switch (field) {
        case "First name *":
          if (
            this.details.first_name.length === 0 ||
            this.details.first_name.indexOf(" ") >= 0
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Last name *":
          if (
            this.details.last_name.length === 0 ||
            this.details.last_name.indexOf(" ") >= 0
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Email *":
          if (
            this.details.email.length === 0 ||
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              this.details.email
            )
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Phone number *":
          if (
            this.details.phone_number.length === 0 ||
            !this.details.phone_number.match(/0[7-9][0-1]\d{8}(?!.)/)
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Password *":
          if (this.details.password.length < 6) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Confirm password *":
          if (
            this.details.confirmPassword.length < 6 ||
            this.details.confirmPassword !== this.details.password
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "Street *":
          if (
            this.details.address.street.length === 0 ||
            !this.details.address.street.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "LGA *":
          if (
            this.details.address.lga.length === 0 ||
            !this.details.address.lga.trim()
          ) {
            this.validate({ field: field, invalid: true });
          } else {
            this.validate({ field: field, invalid: false });
          }
          break;
        case "State *":
          if (
            this.details.address.state.length === 0 ||
            !this.details.address.state.trim()
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
