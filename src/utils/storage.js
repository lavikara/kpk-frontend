export default {
  setCustomer(data) {
    return localStorage.setItem("customer_details", JSON.stringify(data));
  },
  setCustomerToken(data) {
    return localStorage.setItem("customer_token", JSON.stringify(data));
  },
  getCustomerToken() {
    return JSON.parse(localStorage.getItem("customer_token"));
  },
  getCustomerDetails() {
    return JSON.parse(localStorage.getItem("customer_details"));
  },

  setVendor(data) {
    return localStorage.setItem("vendor_details", JSON.stringify(data));
  },
  setVendorToken(data) {
    return localStorage.setItem("vendor_token", JSON.stringify(data));
  },
  getVendorToken() {
    return JSON.parse(localStorage.getItem("vendor_token"));
  },
  getVendorDetails() {
    return JSON.parse(localStorage.getItem("vendor_details"));
  },

  setRider(data) {
    return localStorage.setItem("rider_details", JSON.stringify(data));
  },
  setRiderToken(data) {
    return localStorage.setItem("rider_token", JSON.stringify(data));
  },
  getRiderDetails() {
    return JSON.parse(localStorage.getItem("rider_details"));
  },
  getRiderToken() {
    return JSON.parse(localStorage.getItem("rider_token"));
  },
};
