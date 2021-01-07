import api from "@/utils/api.js";
import router from "../../router";
import storage from "@/utils/storage.js";

export const signupVendor = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .signupVendor(payload)
      .then(({ data }) => {
        if (data.status == "success") {
          alert("Your registretion was successful");
          storage.setVendor(data.data);
          router.push("/vendor-dashboard");
          commit("CLEAR_SIGNUP_DETAILS", {
            signupVendor: {
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone_number: "",
              address: {
                street: "",
                lga: "",
                state: "",
              },
              business_name: "",
              cac_number: "",
            },
          });
          commit("SET_LOADING", false, { root: true });
          resolve({ data });
        }
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("Email or Phone number already exist");
        router.push("/vendor-home");
        reject({ data });
      });
  });
};

export const loginVendor = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .login(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });

        if (data.status == "success" && data.data.user.role === "vendor") {
          storage.setVendor(data.data);
          router.push("/vendor-dashboard");
          commit("CLEAR_LOGIN_DETAILS", {
            loginDetails: {
              email: "",
              password: "",
            },
          });
        } else {
          alert("You're not a vendor");
        }
        commit("SET_LOADING", false, { root: true });
        resolve({ data });
      })
      .catch((error) => {
        commit("SET_LOADING", false, { root: true });
        alert("invalid account");
        reject(error);
      });
  });
};

export const validate = ({ commit }, payload) => {
  commit("VALIDATE_INPUT", payload);
};