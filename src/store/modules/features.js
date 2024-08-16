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
export const SET_NEW_FEATURE = 'SET_NEW_FEATURE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const DELETE_FEATURE = 'DELETE_FEATURE';
export const UPDATE_FEATURE = 'UPDATE_FEATURE';

const state = {
  features: [],
  loading: false,
  error: null,
};

const mutations = {
  [SET_FEATURES]: (state, features) => (state.features = features),
  [SET_NEW_FEATURE]: (state, feature) => state.features.push(feature),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [UPDATE_FEATURE]: (state, updatedFeature) => {
    const index = state.features.findIndex(
      (feature) => feature.id === updatedFeature.id
    );
    if (index !== -1) {
      state.features.splice(index, 1, updatedFeature);
    }
  },
  [DELETE_FEATURE]: (state, featureId) => {
    state.features = state.features.filter(
      (feature) => feature.id !== featureId
    );
  },
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

      commit('SET_FEATURES', data);
    } catch (error) {
      commit('SET_ERROR', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Checking feature description uniqueness
  async checkUniqueness({ commit }, featureDescription) {
    try {
      const response = await axiosClient.get(
        `/features/check-unique/${encodeURIComponent(featureDescription)}`
      );
      return !response.data.exists;
    } catch (error) {
      console.error('Error checking uniqueness:', error);
    }
  },

  // Adding new feature to server and commiting it to state
  async addFeature({ commit }, feature) {
    try {
      const res = await axiosClient.post('/features', feature);
      console.log('WHOLE BLOCK', res);
      commit('SET_NEW_FEATURE', feature);
      const {
        data: { data },
        status,
      } = res;
      return { data, status };
    } catch (error) {
      commit('SET_ERROR', 'Failed to add feature details to server.');
      console.error(error);
      throw error;
    }
  },

  // Retrieving a feature
  async getFeature({ commit }, featureId) {
    try {
      const response = await axiosClient.get(`/features/${featureId}`);

      const {
        data: { data },
      } = response;

      return data;
    } catch (error) {
      commit('SET_ERROR', 'Failed to retrieve this feature from server.');
      console.log(error);
      throw error;
    }
  },

  // Updating a feature to server and commiting it to state
  async updateFeature({ commit }, { id, feature }) {
    try {
      const res = await axiosClient.put(`/features/${id}`, feature);
      commit('UPDATE_FEATURE', feature);
      const {
        data: { data },
        status,
      } = res;
      return { data, status };
    } catch (error) {
      commit('SET_ERROR', 'Failed to add feature details to server.');
      console.error(error);
      throw error;
    }
  },

  async deleteFeature({ commit }, id) {
    try {
      const response = await axiosClient.delete(`/features/${id}`);
      commit('DELETE_FEATURE', id);
      return response;
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete feature from server.');
      console.log(error);
      throw error;
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
