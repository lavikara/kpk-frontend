import api from "@/utils/api.js";
import router from "../../router";
import storage from "@/utils/storage.js";

export const getAllRiders = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getAllriders()
      .then(({ data }) => {
        commit("UPDATE_ALL_RIDERS", {
          riders: data.data,
        });
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const selectRider = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .selectDispatch(payload)
      .then(({ data }) => {
        commit("UPDATE_VENDOR_DETAILS", {
          vendor: data.data,
        });
        storage.setVendor(data.data);
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const removeRider = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .removeDispatch(payload)
      .then(({ data }) => {
        commit("UPDATE_VENDOR_DETAILS", {
          vendor: data.data,
        });
        storage.setVendor(data.data);
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const getVendorAfterPaymentVerification = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getVendorById(payload)
      .then(({ data }) => {
        commit("UPDATE_VENDOR_DETAILS", {
          vendor: data.data,
        });
        storage.setVendor(data.data);
        router.push("/vendor-dashboard");
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const getVendorById = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getVendorById(payload)
      .then(({ data }) => {
        commit("UPDATE_VENDOR_DETAILS", {
          vendor: data.data,
        });
        storage.setVendor(data.data);
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const getCustomerHistory = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getCustomerHistory(payload)
      .then(({ data }) => {
        commit("UPDATE_CUSTOMER_HISTORY", {
          history: data.data,
        });
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const getVendorProduct = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getVendorProduct()
      .then(({ data }) => {
        commit("UPDATE_VENDOR_PRODUCTS", {
          products: data.data,
        });
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const getAssignedStore = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getAssignedStore()
      .then(({ data }) => {
        commit("UPDATE_ASSIGNED_STORE", {
          store: data.data,
        });
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};
