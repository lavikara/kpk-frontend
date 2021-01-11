export const SET_PAYMENT_DETAILS = (state, payload) => {
  state.paymentDetails = payload;
};

export const SET_PAYMENT_URL = (state, payload) => {
  state.paymentUrl.url = payload;
};
