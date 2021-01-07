export default {
  loginDetails: {
    email: "",
    password: "",
  },
  signupVendor: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    address: {
      street: "",
      lga: "",
      state: "",
    },
    business_name: "",
    cac_number: "",
  },
  signupCustomer: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    address: {
      street: "",
      lga: "",
      state: "",
    },
  },
  formValidation: {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    phone_number: false,
    address: {
      street: false,
      lga: false,
      state: false,
    },
    business_name: false,
    cac_number: false,
    confirmPassword: false,
  },
};
