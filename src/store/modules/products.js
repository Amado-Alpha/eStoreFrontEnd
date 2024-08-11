//prettier-ignore

import axiosClient from '../../axios';
import uploadImageToCloudinary from '../../services/cloudinaryClient';

// Mutation types
export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_UPLOAD_SUCCESS = 'SET_UPLOAD_SUCCESS';
export const SET_UPLOADING = 'SET_UPLOADING';
export const SET_UPLOAD_ERROR = 'SET_UPLOAD_ERROR';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_SERVER_ERROR = 'SET_SERVER_ERROR';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const state = {
  products: [],
  uploadSuccess: false,
  uploadError: null,
  uploading: false,
  loading: false,
  serverError: null,
};

const getters = {
  products: (state) => state.products,
  error: (state) => state.error,
};

const mutations = {
  [SET_PRODUCT]: (state, product) => state.products.push(product),
  [SET_PRODUCTS]: (state, products) => (state.products = products),
  [SET_UPLOADING]: (state, uploading) => (state.uploading = uploading),
  [SET_UPLOAD_ERROR]: (state, error) => (state.uploadError = error),
  [SET_SERVER_ERROR]: (state, error) => (state.serverError = error),
  [SET_UPLOAD_SUCCESS]: (state, success) => (state.uploadSuccess = success),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [UPDATE_PRODUCT]: (state, updatedProduct) => {
    const index = state.products.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  [DELETE_PROJECT]: (state, productId) =>
    state.products.filter((product) => product.id !== productId),
};

const actions = {
  // Uploading image to cloudinary
  async uploadImage({ commit }, image) {
    commit('SET_UPLOADING', true);
    commit('SET_UPLOAD_ERROR', null);
    commit('SET_UPLOAD_SUCCESS', false);

    try {
      const response = await uploadImageToCloudinary(image);
      if (response.success) {
        commit('SET_UPLOAD_SUCCESS', true);
        return response.url;
      } else {
        commit('SET_UPLOAD_ERROR', response.error);
        return null;
      }
    } catch (error) {
      commit('SET_UPLOAD_ERROR', 'Failed to add image to cloudinary!');
      console.error(error);
      return null;
    } finally {
      commit('SET_UPLOADING', false);
    }
  },

  // Adding new product to server and commiting it to state
  async addProduct({ commit }, product) {
    try {
      const res = await axiosClient.post('/products', product);
      commit('SET_PRODUCT', product);
      const {
        data: { data },
      } = res;
      return data;
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to add product details to server.');
      console.error(error);
      throw error;
    }
  },

  // Retrieving a product
  async getProduct({ commit }, productId) {
    try {
      const response = await axiosClient.get(`/products/${productId}`);

      const {
        data: { data },
      } = response;

      return data;
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to retrieve product from server.');
      console.log(error);
      throw error;
    }
  },

  // Updating a product to server and commiting it to state
  async updateProduct({ commit }, { id, product }) {
    try {
      const res = await axiosClient.put(`/products/${id}`, product);
      commit('SET_PRODUCT', product);
      const {
        data: { data },
      } = res;
      return data;
    } catch (error) {
      commit('SET_UPLOAD_ERROR', 'Failed to add product details to server.');
      console.error(error);
      throw error;
    }
  },

  // Fetching products from server and commiting them to state
  async fetchProducts({ commit }) {
    commit(SET_LOADING, true);
    try {
      const response = await axiosClient.get('/products');

      // console.log(response.data.data);
      //Destructuring
      const {
        data: { data },
      } = response;

      // console.log('PRODUCTS:', data);

      commit('SET_PRODUCTS', data);
    } catch (error) {
      commit('SET_ERROR', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
