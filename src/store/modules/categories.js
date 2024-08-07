// The one with configs
import axiosClient from '../../axios';

// Mutation types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const NEW_CATEGORY = 'NEW_CATEGORY';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

const state = {
  categories: [],
  loading: false,
  error: null,
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
      commit(SET_CATEGORIES, data);
    } catch (error) {
      commit(SET_ERROR, error);
    } finally {
      commit(SET_LOADING, false);
    }
  },
};

const mutations = {
  [SET_CATEGORIES]: (state, categories) => (state.categories = categories),
  [NEW_CATEGORY]: (state, category) => state.categories.push(category),
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
