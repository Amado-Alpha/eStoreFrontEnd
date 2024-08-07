/**
 * I'm importing axios two times because, there's an axios configuration with base url already
 * , and another import doesn't have any predefined configs from my app, that i will use to up
 * load an image to cloudinary.
 */

// The one with configs
import axiosClient from '../../axios';

// Without configs
import axios from 'axios';

// Mutation types
export const SET_FEATURES = 'SET_FEATURES';
export const NEW_FEATURE = 'NEW_FEATURE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

const state = {
  features: [],
  loading: false,
  error: null,
};

const getters = {
  allFeatures: (state) => state.features,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

const actions = {
  async fetchFeatures({ commit }) {
    commit(SET_LOADING, true);
    try {
      const response = await axiosClient.get('/features');

      // console.log(response.data.data);
      //Destructuring
      const {
        data: { data },
      } = response;

      // console.log(data);

      commit(SET_FEATURES, data);
    } catch (error) {
      commit(SET_ERROR, error);
    } finally {
      commit(SET_LOADING, false);
    }
  },
};

const mutations = {
  [SET_FEATURES]: (state, features) => (state.features = features),
  [NEW_FEATURE]: (state, feature) => state.features.push(feature),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
