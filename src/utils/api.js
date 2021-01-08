import axios from "axios";
import storage from "@/utils/storage.js";

const BASE_URL = process.env.VUE_APP_BASE_URL;
const USER_URL = `${BASE_URL}/user`;
const PRODUCT_URL = `${BASE_URL}/product`;

export default {
  getVendorHeader() {
    let header = {
      Authorization: "bearer " + storage.getVendorToken(),
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
};
