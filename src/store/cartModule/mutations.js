export const SET_CART_COUNTER = (state, payload) => {
  state.cart.cartCounter = payload.cartCounter;
};
export const SET_CART = (state, payload) => {
  state.cart.items = payload.cart;
};
