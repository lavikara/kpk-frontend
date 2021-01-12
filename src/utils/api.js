import axios from "axios";
import storage from "@/utils/storage.js";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const USER_URL = `${BASE_URL}/user`;
const PRODUCT_URL = `${BASE_URL}/product`;
const CART_URL = `${BASE_URL}/cart`;
const PAYMENT_URL = `${BASE_URL}/payment`;

export default {
  getVendorHeader() {
    let header = {
      Authorization: "bearer " + storage.getVendorToken(),
    };
    return header;
  },
  getCustomerHeader() {
    let header = {
      Authorization: "bearer " + storage.getCustomerToken(),
    };
    return header;
  },
  getRiderHeader() {
    let header = {
      Authorization: "bearer " + storage.getRiderToken(),
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
  signupRider: (data) => {
    return axios.post(`${USER_URL}/signup-rider`, data);
  },
  createProduct(data) {
    return axios.post(`${PRODUCT_URL}/create`, data, {
      headers: this.getVendorHeader(),
    });
  },
  selectDispatch(data) {
    return axios.post(`${USER_URL}/assign-rider`, data, {
      headers: this.getVendorHeader(),
    });
  },
  removeDispatch(data) {
    return axios.post(`${USER_URL}/unassign-rider`, data, {
      headers: this.getVendorHeader(),
    });
  },
  getAllProducts: () => {
    return axios.get(`${PRODUCT_URL}/get-all-product`);
  },
  getAllriders: () => {
    return axios.get(`${USER_URL}/get-all-riders`);
  },
  getProductById: (id) => {
    return axios.get(`${PRODUCT_URL}`, { params: { id } });
  },
  getCart() {
    return axios.get(`${CART_URL}/get-cart`, {
      headers: this.getCustomerHeader(),
    });
  },
  addToCart(data) {
    return axios.post(`${CART_URL}/add-to-cart`, data, {
      headers: this.getCustomerHeader(),
    });
  },
  removeFromCart(data) {
    return axios.post(`${CART_URL}/remove-from-cart`, data, {
      headers: this.getCustomerHeader(),
    });
  },
  deleteFromCart(data) {
    return axios.post(`${CART_URL}/delete-from-cart`, data, {
      headers: this.getCustomerHeader(),
    });
  },
  generateVendorPaymentLink(data) {
    return axios.post(`${PAYMENT_URL}/generate`, data, {
      headers: this.getVendorHeader(),
    });
  },
  getVendorById(id) {
    return axios.get(`${USER_URL}/get-single-vendor/?id=${id}`, {
      headers: this.getVendorHeader(),
    });
  },
};
