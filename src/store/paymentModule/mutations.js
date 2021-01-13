export const SET_PAYMENT_DETAILS = (state, payload) => {
  state.paymentDetails = payload;
};

export const SET_PAYMENT_URL = (state, payload) => {
  state.paymentUrl.url = payload;
};

export const SET_BANK_LIST = (state, payload) => {
  state.bankList.list = payload;
};

export const CLEAR_ACCOUNT_DETAILS = (state, payload) => {
  state.accountDetails = payload.accountDetails;
};

export const SET_COUNTRY = (state, payload) => {
  state.accountDetails.country = payload;
};
