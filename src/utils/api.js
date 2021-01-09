import axios from "axios";
import storage from "@/utils/storage.js";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const USER_URL = `${BASE_URL}/user`;
const PRODUCT_URL = `${BASE_URL}/product`;
const CART_URL = `${BASE_URL}/cart`;

export default {
  getVendorHeader() {
    let header = {
      Authorization: "bearer " + storage.getVendorToken(),
    };
    return header;
  },
  getCustomerToken() {
    let header = {
      Authorization: "bearer " + storage.getCustomerToken(),
    };
    return header;
  },
  login: (data) => {
    return axios.post(`${USER_URL}/login`, data);
  },
  signupCustomer: (data) => {
    return axios.post(`${USER_URL}/signup-customer`, data);
  },
  signupVendor: (data) => {
    return axios.post(`${USER_URL}/signup-vendor`, data);
  },
  createProduct(data) {
    return axios.post(`${PRODUCT_URL}/create`, data, {
      headers: this.getVendorHeader(),
    });
  },
  getAllProducts: () => {
    return axios.get(`${PRODUCT_URL}/get-all-product`);
  },
  getCart() {
    return axios.get(`${CART_URL}/get-cart`, {
      headers: this.getCustomerToken(),
    });
  },
};
