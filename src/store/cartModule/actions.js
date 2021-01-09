import api from "@/utils/api.js";
import router from "../../router";

export const updateCartCounter = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    api
      .getCart()
      .then(({ data }) => {
        commit("SET_CART_COUNTER", {
          cartCounter: data.data.cart.total_quantity,
        });
        resolve({ data });
      })
      .catch((error) => {
        alert("Customer has no cart");
        localStorage.removeItem("customer_details");
        if (router.history.current.name === "Home") {
          router.push("/shop");
        } else if (
          router.history.current.name === "Shop" ||
          router.history.current.name === "CustomerAccount"
        ) {
          router.push("/");
        }
        reject(error);
      });
  });
};

export const resetCartCounter = ({ commit }, payload) => {
  commit("SET_CART_COUNTER", {
    cartCounter: payload,
  });
};
