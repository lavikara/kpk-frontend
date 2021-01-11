import api from "@/utils/api.js";
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

export const paymentDetails = ({ commit }, payload) => {
  commit("SET_PAYMENT_DETAILS", {
    tx_ref: randomString.getRandomString(10) + payload.id,
    amount: "20",
    currency: "USD",
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
