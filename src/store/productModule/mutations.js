export const CLEAR_UPLOAD_PRODUCT = (state, payload) => {
  state.uploadProduct = payload.uploadProduct;
};
export const UPDATE_ALL_PRODUCTS = (state, payload) => {
  state.product.allProduct = payload.products;
};
