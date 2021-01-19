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
          dispatch(
            "notificationModule/showToast",
            {
              description: "Your registretion was successful",
              display: true,
              type: "success",
            },
            { root: true }
          );
          storage.setVendor(data.data.user);
          storage.setVendorToken(data.data.token);
          router.push("/vendor-dashboard");
          commit("CLEAR_SIGNUP_DETAILS", {
            signupVendor: {
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              phone_number: "",
              address: {
                street: "",
                lga: "",
                state: "",
              },
              business_name: "",
              country: "",
            },
          });
          commit("CLEAR_CONFIRM_PASSWORD", {
            confirmPassword: {
              confirm: "",
            },
          });
          commit("SET_LOADING", false, { root: true });
          resolve({ data });
        }
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        dispatch(
          "notificationModule/showToast",
          {
            description: "Try a different email or phone number",
            display: true,
            type: "error",
          },
          { root: true }
        );
        // router.push("/vendor-home");
        reject({ data });
      });
  });
};

export const signupRider = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .signupRider(payload)
      .then(({ data }) => {
        if (data.status == "success") {
          dispatch(
            "notificationModule/showToast",
            {
              description: "Your registretion was successful",
              display: true,
              type: "success",
            },
            { root: true }
          );
          storage.setRider(data.data.user);
          storage.setRiderToken(data.data.token);
          router.push("/rider-dashboard");
          commit("CLEAR_RIDER_DETAILS", {
            signupRider: {
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              phone_number: "",
              address: {
                street: "",
                lga: "",
                state: "",
              },
              company_name: "",
              country: "",
            },
          });
          commit("CLEAR_CONFIRM_PASSWORD", {
            confirmPassword: {
              confirm: "",
            },
          });
          commit("SET_LOADING", false, { root: true });
          resolve({ data });
        }
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        dispatch(
          "notificationModule/showToast",
          {
            description: "Try a different email or phone number",
            display: true,
            type: "error",
          },
          { root: true }
        );
        // router.push("/rider-home");
        reject({ data });
      });
  });
};

export const signupCustomer = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .signupCustomer(payload)
      .then(({ data }) => {
        if (data.status == "success") {
          dispatch(
            "notificationModule/showToast",
            {
              description: "Your registretion was successful",
              display: true,
              type: "success",
            },
            { root: true }
          );
          storage.setCustomer(data.data.user);
          storage.setCustomerToken(data.data.token);
          router.push("/");
          commit("CLEAR_CUSTOMER_DETAILS", {
            signupCustomer: {
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
            },
          });
          commit("SET_LOADING", false, { root: true });
          resolve({ data });
        }
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        dispatch(
          "notificationModule/showToast",
          {
            description: "An error occured",
            display: true,
            type: "error",
          },
          { root: true }
        );
        // router.push("/");
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
          storage.setVendor(data.data.user);
          storage.setVendorToken(data.data.token);
          router.push("/vendor-dashboard");
          commit("CLEAR_LOGIN_DETAILS", {
            loginDetails: {
              email: "",
              password: "",
            },
          });
        } else {
          alert("This is not a vendor account");
          router.push("/");
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

export const loginCustomer = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .login(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });

        if (data.status == "success" && data.data.user.role === "customer") {
          storage.setCustomer(data.data.user);
          storage.setCustomerToken(data.data.token);
          dispatch("cartModule/updateCartCounter", {}, { root: true });
          router.push("/");
          commit("CLEAR_LOGIN_DETAILS", {
            loginDetails: {
              email: "",
              password: "",
            },
          });
        } else {
          alert("This is not a customer account");
          router.push("/");
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

export const loginRider = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .login(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });

        if (data.status == "success" && data.data.user.role === "rider") {
          storage.setRider(data.data.user);
          storage.setRiderToken(data.data.token);
          router.push("/rider-dashboard");
          commit("CLEAR_LOGIN_DETAILS", {
            loginDetails: {
              email: "",
              password: "",
            },
          });
        } else {
          alert("This is not a rider account");
          router.push("/");
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
