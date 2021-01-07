import api from "@/utils/api.js";
import router from "../../router";

export const createProduct = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .createProduct(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });

        if (data.status == "success") {
          alert("product created");
          router.push("/vendor-dashboard");
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
