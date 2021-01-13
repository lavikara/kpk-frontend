export const CLEAR_SIGNUP_DETAILS = (state, payload) => {
  state.signupVendor = payload.signupVendor;
};

export const CLEAR_CUSTOMER_DETAILS = (state, payload) => {
  state.signupCustomer = payload.signupCustomer;
};

export const CLEAR_RIDER_DETAILS = (state, payload) => {
  state.signupRider = payload.signupRider;
};

export const CLEAR_LOGIN_DETAILS = (state, payload) => {
  state.loginDetails = payload.loginDetails;
};

export const VALIDATE_INPUT = (state, payload) => {
  switch (payload.field) {
    case "First name *":
      state.formValidation.first_name = payload.invalid;
      break;
    case "Last name *":
      state.formValidation.last_name = payload.invalid;
      break;
    case "Email *":
      state.formValidation.email = payload.invalid;
      break;
    case "Phone number *":
      state.formValidation.phone_number = payload.invalid;
      break;
    case "Password *":
      state.formValidation.password = payload.invalid;
      break;
    case "Confirm password *":
      state.formValidation.confirmPassword = payload.invalid;
      break;
    case "Street *":
      state.formValidation.address.street = payload.invalid;
      break;
    case "LGA *":
      state.formValidation.address.lga = payload.invalid;
      break;
    case "State *":
      state.formValidation.address.state = payload.invalid;
      break;
    case "Business name *":
      state.formValidation.business_name = payload.invalid;
      break;
    case "Company name *":
      state.formValidation.company_name = payload.invalid;
      break;
    case "Account number *":
      state.formValidation.account_number = payload.invalid;
      break;
    case "Business tel *":
      state.formValidation.business_mobile = payload.invalid;
      break;
    case "Account name *":
      state.formValidation.business_name = payload.invalid;
      break;
    case "Business email *":
      state.formValidation.business_email = payload.invalid;
      break;

    default:
      break;
  }
};
