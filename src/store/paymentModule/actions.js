import api from "@/utils/api.js";
import router from "../../router";
import randomString from "@/utils/randomString.js";

export const generateVendorPaymentLink = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .generateVendorPaymentLink(payload)
      .then(({ data }) => {
        if (data.data.status === "success") {
          commit("SET_PAYMENT_URL", data.data.data.link);
        } else {
          dispatch(
            "notificationModule/showModal",
            {
              description: "Our payment platform is down, try later",
              display: true,
              type: "success",
            },
            { root: true }
          );
        }
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

export const getBankList = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .getBankList(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        commit("SET_BANK_LIST", data.data.data);
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const createRiderSubAccount = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .createRiderSubAccount(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        dispatch(
          "notificationModule/showModal",
          {
            description: "Successful, please login to complete process.",
            display: true,
            type: "success",
          },
          { root: true }
        );
        localStorage.removeItem("rider_details");
        router.push("/rider-login");
        commit("CLEAR_ACCOUNT_DETAILS", {
          accountDetails: {
            country: "",
            account_bank: "",
            account_number: "",
            business_mobile: "",
            business_name: "",
            business_email: "",
          },
        });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const createVendorSubAccount = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .createVendorSubAccount(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        dispatch(
          "notificationModule/showModal",
          {
            description:
              "Successful, please login and pay $20 for registration.",
            display: true,
            type: "success",
          },
          { root: true }
        );
        localStorage.removeItem("vendor_details");
        router.push("/vendor-login");
        commit("CLEAR_ACCOUNT_DETAILS", {
          accountDetails: {
            country: "",
            account_bank: "",
            account_number: "",
            business_mobile: "",
            business_name: "",
            business_email: "",
          },
        });
        resolve({ data });
      })
      .catch(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        alert("an error occured");
        reject({ data });
      });
  });
};

export const paymentDetails = ({ commit }, payload) => {
  commit("SET_PAYMENT_DETAILS", {
    tx_ref: randomString.getRandomString(10) + payload.id,
    redirect_url: process.env.VUE_APP_VENDOR_PAYMENT_REDIRECT,
    payment_options: "card, account, ussd, barter, banktransfer",
    meta: {
      user_id: payload.id,
      type: "vendor registration",
    },
    customer: {
      email: payload.email,
      phonenumber: payload.phone_number,
      name: payload.first_name + payload.last_name,
    },
    customizations: {
      title: "Vendor registration",
      description: "Vendor registration fee",
      logo:
        "https://res.cloudinary.com/temikara/image/upload/v1610364968/istockphoto-1206806317-612x612_sscwyi.jpg",
    },
  });
};

export const setCountry = ({ commit }, payload) => {
  commit("SET_COUNTRY", payload);
};
