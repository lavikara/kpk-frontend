export const UPDATE_ALL_RIDERS = (state, payload) => {
  state.riderDetails.allRiders = payload.riders;
};
export const UPDATE_VENDOR_DETAILS = (state, payload) => {
  state.vendorDetails.vendor = payload.vendor;
};
