export default {
  setVendor(data) {
    return localStorage.setItem("vendor_details", JSON.stringify(data));
  },
  setCustomer(data) {
    return localStorage.setItem("customer_details", JSON.stringify(data));
  },
  getVendorDetails() {
    return JSON.parse(localStorage.getItem("vendor_details"));
  },
  getCustomerDetails(data) {
    return JSON.parse(localStorage.getItem("customer_details"));
  },
  getVendorToken() {
    return JSON.parse(localStorage.getItem("vendor_details")).token;
  },
  getCustomerToken() {
    return JSON.parse(localStorage.getItem("customer_details")).token;
  },
};
