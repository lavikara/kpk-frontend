import api from "@/utils/api.js";
import router from "../../router";

export const getCart = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getCart()
      .then(({ data }) => {
        commit("SET_CART", {
          cart: data.data.cart,
        });
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch((error) => {
        commit("SET_LOADING", false, { root: true });
        alert("Customer has no cart");
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_details");
        if (router.history.current.name === "Home") {
          router.push("/shop");
        } else if (router.history.current.name !== "Home") {
          router.push("/");
        }
        reject(error);
      });
  });
};

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
        localStorage.removeItem("customer_token");
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

export const addToCart = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_SHOW", true, { root: true });
    api
      .addToCart(payload)
      .then(({ data }) => {
        commit("SET_CART_COUNTER", {
          cartCounter: data.data.cart.total_quantity,
        });
        commit("SET_CART", {
          cart: data.data.cart,
        });
        dispatch(
          "notificationModule/showToast",
          {
            description: "Added to cart",
            display: true,
            type: "success",
          },
          { root: true }
        );
        commit("SET_SHOW", false, { root: true });
        resolve({ data });
      })
      .catch((error) => {
        console.log(error);
        commit("SET_SHOW", false, { root: true });
        alert("Customer has no cart");
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_details");
        if (router.history.current.name === "Home") {
          router.push("/shop");
        } else if (router.history.current.name !== "Home") {
          router.push("/");
        }
        reject(error);
      });
  });
};

export const removeFromCart = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .removeFromCart(payload)
      .then(({ data }) => {
        commit("SET_CART_COUNTER", {
          cartCounter: data.data.cart.total_quantity,
        });
        commit("SET_CART", {
          cart: data.data.cart,
        });
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch((error) => {
        console.log(error);
        commit("SET_LOADING", false, { root: true });
        alert("Customer has no cart");
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_details");
        if (router.history.current.name === "Home") {
          router.push("/shop");
        } else if (router.history.current.name !== "Home") {
          router.push("/");
        }
        reject(error);
      });
  });
};

export const deleteFromCart = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .deleteFromCart(payload)
      .then(({ data }) => {
        commit("SET_CART_COUNTER", {
          cartCounter: data.data.cart.total_quantity,
        });
        commit("SET_CART", {
          cart: data.data.cart,
        });
        dispatch(
          "notificationModule/showToast",
          {
            description: "Deleted from cart",
            display: true,
            type: "success",
          },
          { root: true }
        );
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch((error) => {
        console.log(error);
        commit("SET_LOADING", false, { root: true });
        alert("Customer has no cart");
        localStorage.removeItem("customer_token");
        localStorage.removeItem("customer_details");
        if (router.history.current.name === "Home") {
          router.push("/shop");
        } else if (router.history.current.name !== "Home") {
          router.push("/");
        }
        reject(error);
      });
  });
};
