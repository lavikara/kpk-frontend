import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import authModule from "./authModule/index";
import productModule from "./productModule/index";
import cartModule from "./cartModule/index";
import notificationModule from "./notificationModule/index";
import paymentModule from "./paymentModule/index";
import userModule from "./userModule/index";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    authModule,
    productModule,
    cartModule,
    notificationModule,
    paymentModule,
    userModule,
  },
});
