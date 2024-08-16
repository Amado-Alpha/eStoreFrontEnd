// The one with configs
import apiClient from '../../services/authService';

// Mutation types
export const SET_USERS = 'SET_USERS';
export const SET_NEW_USER = 'SET_NEW_USER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SERVER_ERROR = 'SET_SERVER_ERROR';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_AUTH_USER = 'SET_AUTH_USER';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

const state = {
  users: [],
  authUser: null,
  authToken: localStorage.getItem('auth_token') || '',
  loading: false,
  error: null,
  serverError: null,
};

const mutations = {
  [SET_USERS]: (state, users) => (state.users = users),
  [SET_NEW_USER]: (state, user) => state.users.push(user),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_SERVER_ERROR]: (state, error) => (state.serverError = error),
  [UPDATE_USER]: (state, updatedUser) => {
    const index = state.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  [DELETE_USER]: (state, userId) =>
    state.users.filter((user) => user.id !== userId),
  [SET_AUTH_USER]: (state, user) => (state.authUser = user),
  [SET_AUTH_TOKEN]: (state, token) => (state.authToken = token),
};

const getters = {
  allUsers: (state) => state.users,
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

const actions = {
  // Adding new user to server and commiting it to state
  async addUser({ commit }, user) {
    try {
      const res = await apiClient.post('/users', user);
      commit('SET_USER', user);
      const {
        data: { data },
      } = res;
      return data;
    } catch (error) {
      commit('SET_UPLOAD_ERROR', 'Failed to add user details to server.');
      console.error(error);
      throw error;
    }
  },

  // Retrieving a user
  async getUser({ commit }, userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      const {
        data: { data },
      } = response;
      return data;
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to retrieve user from server.');
      console.error(error);
      throw error;
    }
  },

  // Updating a user to server and commiting it to state
  async updateUser({ commit }, { id, user }) {
    try {
      const res = await apiClient.put(`/users/${id}`, user);
      commit('UPDATE_USER', user);
      const {
        data: { data },
        status,
      } = res;
      return { data, status };
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to add user details to server.');
      console.error(error);
      throw error;
    }
  },

  async fetchUsers({ commit }) {
    commit(SET_LOADING, true);
    try {
      const response = await apiClient.get('/users');

      const { data } = response;

      // console.log(data);

      commit(SET_USERS, data);
    } catch (error) {
      commit(SET_ERROR, error);
      console.log(error);
    } finally {
      commit(SET_LOADING, false);
    }
  },

  // Authentication actions
  async login({ commit }, credentials) {
    try {
      const res = await apiClient.post('/login', credentials);
      const { token, user } = res.data;
      localStorage.setItem('auth_token', token);
      commit('SET_AUTH_TOKEN', token);
      commit('SET_AUTH_USER', user);
      return user;
    } catch (error) {
      commit('SET_ERROR', 'Failed to login.');
      console.error(error);
      throw error;
    }
  },

  async register({ commit }, user) {
    try {
      const res = await apiClient.post('/register', user);
      // const { token, user: registeredUser, status } = res.data;

      const { status } = res;

      console.log('Registered user:', status);
      return status;
    } catch (error) {
      commit('SET_ERROR', 'Failed to register.');
      console.error(error);
      throw error;
    }
  },

  async logout({ commit }) {
    try {
      localStorage.removeItem('auth_token');
      commit('SET_AUTH_TOKEN', '');
      commit('SET_AUTH_USER', null);
    } catch (error) {
      commit('SET_ERROR', 'Failed to logout.');
      console.error(error);
      throw error;
    }
  },

  async deleteUser({ commit }, id) {
    try {
      const res = await apiClient.delete(`/users/${id}`);
      return res;
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to delete user from server.');
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
