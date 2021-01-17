import api from "@/utils/api.js";
import router from "../../router";
import storage from "@/utils/storage.js";
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

export const generateCustomerPaymentLink = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .generateCustomerPaymentLink(payload)
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
          "notificationModule/showToast",
          {
            description: "Successful.",
            display: true,
            type: "success",
          },
          { root: true }
        );
        storage.setRider(data.data);
        router.push("/rider-dashboard");
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
          "notificationModule/showToast",
          {
            description: "Successful.",
            display: true,
            type: "success",
          },
          { root: true }
        );
        storage.setVendor(data.data);
        router.push("/vendor-dashboard");
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

export const verifyVendorPayment = ({ commit, dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    commit("SET_LOADING", true, { root: true });
    api
      .verifyVendorPayment(payload)
      .then(({ data }) => {
        commit("SET_LOADING", false, { root: true });
        switch (data.data.data.meta.type) {
          case "vendor registration":
            if (data.data.data.tx_ref == payload.ref) {
              dispatch(
                "notificationModule/showToast",
                {
                  description: "Payment was successful",
                  display: true,
                  type: "success",
                },
                { root: true }
              );
              const id = data.data.data.tx_ref.slice(10);
              dispatch("userModule/getVendorAfterPaymentVerification", id, {
                root: true,
              });
            }
            break;
          case "customer payment":
            if (data.data.data.tx_ref == payload.ref) {
              dispatch(
                "notificationModule/showToast",
                {
                  description: "Payment was successful",
                  display: true,
                  type: "success",
                },
                { root: true }
              );
              dispatch("cartModule/cartCheckout", {}, { root: true });
              if (router.history.current.name === "Home") {
                router.push("/shop");
              } else if (router.history.current.name !== "Home") {
                router.push("/");
              }
            }
            break;

          default:
            break;
        }
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
      title: "KPK stors",
      description: "Vendor registration fee",
      logo:
        "https://res.cloudinary.com/temikara/image/upload/v1610364968/istockphoto-1206806317-612x612_sscwyi.jpg",
    },
  });
};

export const cartPaymentDetails = ({ commit }, payload) => {
  commit("SET_PAYMENT_DETAILS", {
    tx_ref: randomString.getRandomString(10) + payload.customer.id,
    redirect_url: process.env.VUE_APP_CUSTOMER_PAYMENT_REDIRECT,
    payment_options: "card, account, ussd, barter, banktransfer",
    meta: {
      user_id: payload.customer.id,
      type: "customer payment",
      amount: payload.amount,
    },
    customer: {
      email: payload.customer.email,
      phonenumber: payload.customer.phone_number,
      name: payload.customer.first_name + payload.customer.last_name,
    },
    customizations: {
      title: "KPK stors",
      description: "Cart checkout",
      logo:
        "https://res.cloudinary.com/temikara/image/upload/v1610364968/istockphoto-1206806317-612x612_sscwyi.jpg",
    },
  });
};

export const setCountry = ({ commit }, payload) => {
  commit("SET_COUNTRY", payload);
};
