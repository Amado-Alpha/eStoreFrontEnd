//prettier-ignore

import axiosClient from '../../axios';
import uploadImageToCloudinary from '../../services/cloudinaryClient';

// Mutation types
export const SET_TESTIMONIAL = 'SET_TESTIMONIAL';
export const SET_UPLOAD_SUCCESS = 'SET_UPLOAD_SUCCESS';
export const SET_UPLOADING = 'SET_UPLOADING';
export const SET_UPLOAD_ERROR = 'SET_UPLOAD_ERROR';
export const SET_TESTIMONIALS = 'SET_TESTIMONIALS';
export const SET_LOADING = 'SET_LOADING';
export const SET_SERVER_ERROR = 'SET_SERVER_ERROR';
export const DELETE_TESTIMONIAL = 'DELETE_TESTIMONIAL';
export const UPDATE_TESTIMONIAL = 'UPDATE_TESTIMONIAL';

const state = {
  testimonials: [],
  uploadSuccess: false,
  uploadError: null,
  uploading: false,
  loading: false,
  serverError: null,
};

const getters = {
  testimonials: (state) => state.testimonials,
  error: (state) => state.error,
};

const mutations = {
  [SET_TESTIMONIAL]: (state, testimonial) =>
    state.testimonials.push(testimonial),
  [SET_TESTIMONIALS]: (state, testimonials) =>
    (state.testimonials = testimonials),
  [SET_UPLOADING]: (state, uploading) => (state.uploading = uploading),
  [SET_UPLOAD_ERROR]: (state, error) => (state.uploadError = error),
  [SET_SERVER_ERROR]: (state, error) => (state.serverError = error),
  [SET_UPLOAD_SUCCESS]: (state, success) => (state.uploadSuccess = success),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [UPDATE_TESTIMONIAL]: (state, updatedTestimonial) => {
    const index = state.testimonials.findIndex(
      (testimonial) => testimonial.id === updatedTestimonial.id
    );
    if (index !== -1) {
      state.testimonials.splice(index, 1, updatedTestimonial);
    }
  },
  [DELETE_TESTIMONIAL]: (state, testimonialId) =>
    state.testimonials.filter(
      (testimonial) => testimonial.id !== testimonialId
    ),
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

  // Adding new testimonial to server and commiting it to state
  async addTestimonial({ commit }, testimonial) {
    try {
      const res = await axiosClient.post('/testimonials', testimonial);
      commit('SET_TESTIMONIAL', testimonial);
      const {
        data: { data },
      } = res;
      return data;
    } catch (error) {
      commit(
        'SET_SERVER_ERROR',
        'Failed to add testimonial details to server.'
      );
      console.error(error);
      throw error;
    }
  },

  // Retrieving a testimonial
  async getTestimonial({ commit }, testimonialId) {
    try {
      const response = await axiosClient.get(`/testimonials/${testimonialId}`);

      const {
        data: { data },
      } = response;

      return data;
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to retrieve testimonial from server.');
      console.log(error);
      throw error;
    }
  },

  // Updating a testimonial to server and commiting it to state
  async updateTestimonial({ commit }, { id, testimonial }) {
    try {
      const res = await axiosClient.put(`/testimonials/${id}`, testimonial);
      console.log('RESPONSE:', res);
      commit('SET_TESTIMONIAL', testimonial);
      const {
        data: { data },
      } = res;
      return data;
    } catch (error) {
      commit(
        'SET_UPLOAD_ERROR',
        'Failed to add testimonial details to server.'
      );
      console.error(error);
      throw error;
    }
  },

  // Fetching testimonials from server and commiting them to state
  async fetchTestimonials({ commit }) {
    commit(SET_LOADING, true);
    try {
      const response = await axiosClient.get('/testimonials');

      //Destructuring
      const {
        data: { data },
      } = response;
      commit(SET_TESTIMONIALS, data);
    } catch (error) {
      commit(SET_ERROR, error);
    } finally {
      commit(SET_LOADING, false);
    }
  },

  async deleteTestimonial({ commit }, id) {
    try {
      const res = await axiosClient.delete(`/testimonials/${id}`);
      commit('DELETE_TESTIMONIAL', id);
      return res;
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to delete project from server.');
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
