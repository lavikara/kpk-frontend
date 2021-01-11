import api from "@/utils/api.js";

export const createProduct = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .createProduct(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });

        if (data.status == "success") {
          dispatch(
            "notificationModule/showToast",
            {
              description: "Product created",
              display: true,
              type: "success",
            },
            { root: true }
          );
          commit("CLEAR_UPLOAD_PRODUCT", {
            uploadProduct: {
              name: "",
              description: "",
              category: "",
              image: "",
              price: "",
              stock: {
                quantity_available: "",
              },
            },
          });
        }
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch((error) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject(error);
      });
  });
};

export const getAllProducts = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getAllProducts()
      .then(({ data }) => {
        commit("UPDATE_ALL_PRODUCTS", {
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

export const getProductById = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getProductById(payload)
      .then(({ data }) => {
        commit("UPDATE_SINGLE_PRODUCT", {
          product: data.data,
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
