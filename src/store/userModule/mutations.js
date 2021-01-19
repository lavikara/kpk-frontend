export const UPDATE_ALL_RIDERS = (state, payload) => {
  state.riderDetails.allRiders = payload.riders;
};
export const UPDATE_VENDOR_DETAILS = (state, payload) => {
  state.vendorDetails.vendor = payload.vendor;
};
export const UPDATE_CUSTOMER_HISTORY = (state, payload) => {
  state.customerHistory.history = payload.history;
};
export const UPDATE_VENDOR_PRODUCTS = (state, payload) => {
  state.vendorProduct.products = payload.products;
};
