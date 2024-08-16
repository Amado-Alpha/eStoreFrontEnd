// The one with configs
import axiosClient from '../../axios';

// Mutation types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_NEW_CATEGORY = 'SET_NEW_CATEGORY';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

const state = {
  categories: [],
  loading: false,
  error: null,
};

const mutations = {
  [SET_CATEGORIES]: (state, categories) => (state.categories = categories),
  [SET_NEW_CATEGORY]: (state, category) => state.categories.push(category),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [UPDATE_CATEGORY]: (state, updatedCategory) => {
    const index = state.categories.findIndex(
      (category) => category.id === updatedCategory.id
    );
    if (index !== -1) {
      state.categories.splice(index, 1, updatedCategory);
    }
  },
  [DELETE_CATEGORY]: (state, categoryId) => {
    state.categories = state.categories.filter(
      (category) => category.id !== categoryId
    );
  },
};

const getters = {
  allCategories: (state) => state.categories,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

const actions = {
  async fetchCategories({ commit }) {
    commit(SET_LOADING, true);
    try {
      const response = await axiosClient.get('/categories');
      // console.log(response.data.data);
      const {
        data: { data },
      } = response;
      commit('SET_CATEGORIES', data);
    } catch (error) {
      commit('SET_ERROR', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Checking feature description uniqueness
  async checkUniqueness({ commit }, categoryName) {
    try {
      const response = await axiosClient.get(
        `/categories/check-unique/${encodeURIComponent(categoryName)}`
      );
      return !response.data.exists;
    } catch (error) {
      console.error('Error checking uniqueness:', error);
    }
  },

  // Adding new category to server and commiting it to state
  async addCategory({ commit }, category) {
    try {
      const res = await axiosClient.post('/categories', category);
      commit('SET_NEW_CATEGORY', category);
      const {
        data: { data },
        status,
      } = res;
      return { data, status };
    } catch (error) {
      commit('SET_ERROR', 'Failed to add category details to server.');
      console.error(error);
      throw error;
    }
  },

  // Retrieving a category
  async getCategory({ commit }, categoryId) {
    try {
      const response = await axiosClient.get(`/categories/${categoryId}`);

      const {
        data: { data },
      } = response;

      return data;
    } catch (error) {
      commit('SET_ERROR', 'Failed to retrieve this category from server.');
      console.log(error);
      throw error;
    }
  },

  // Updating a category to server and commiting it to state
  async updateCategory({ commit }, { id, category }) {
    try {
      const res = await axiosClient.put(`/categories/${id}`, category);
      commit('UPDATE_CATEGORY', category);
      const {
        data: { data },
        status,
      } = res;
      return { data, status };
    } catch (error) {
      commit('SET_ERROR', 'Failed to add category details to server.');
      console.error(error);
      throw error;
    }
  },

  async deleteCategory({ commit }, id) {
    try {
      // console.log('Project to delete:', id);
      const res = await axiosClient.delete(`/categories/${id}`);
      commit('DELETE_CATEGORY', id);
      return res;
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete category from server.');
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
