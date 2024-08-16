/**
 * I'm importing axios two times because, there's an axios configuration with base url already
 * , and another import doesn't have any predefined configs from my app, that i will use to up
 * load an image to cloudinary.
 */
//prettier-ignore
// The one with configs
import axiosClient from '../../axios';

// Without configs
import axios from 'axios';

// Mutation types
export const SET_NEW_PROJECT = 'SET_NEW_PROJECT';
export const SET_UPLOAD_SUCCESS = 'SET_UPLOAD_SUCCESS';
export const SET_UPLOADING = 'SET_UPLOADING';
export const SET_UPLOAD_ERROR = 'SET_UPLOAD_ERROR';
export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_LOADING = 'SET_LOADING';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const SET_SERVER_ERROR = 'SET_SERVER_ERROR';
export const DELETE_PROJECT = 'DELETE_PROJECT';

const state = {
  projects: [],
  uploadSuccess: false,
  uploadError: null,
  serverError: null,
  uploading: false,
  loading: false,
};

const getters = {
  projects: (state) => state.projects,
  error: (state) => state.error,
};

const mutations = {
  [SET_NEW_PROJECT]: (state, project) => state.projects.push(project),
  [SET_PROJECTS]: (state, projects) => (state.projects = projects),
  [SET_UPLOADING]: (state, uploading) => (state.uploading = uploading),
  [SET_UPLOAD_ERROR]: (state, error) => (state.uploadError = error),
  [SET_SERVER_ERROR]: (state, error) => (state.serverError = error),
  [SET_UPLOAD_SUCCESS]: (state, success) => (state.uploadSuccess = success),
  [SET_LOADING]: (state, loading) => (state.loading = loading),
  [UPDATE_PROJECT]: (state, updatedProject) => {
    const index = state.projects.findIndex(
      (project) => project.id === updatedProject.id
    );
    if (index !== -1) {
      state.projects.splice(index, 1, updatedProject);
    }
  },
  [DELETE_PROJECT]: (state, projectId) => {
    state.projects = state.projects.filter(
      (project) => project.id !== projectId
    );
  },
};

const actions = {
  async uploadImage({ commit }, image) {
    commit('SET_UPLOADING', true);
    commit('SET_UPLOAD_ERROR', null);
    commit('SET_UPLOAD_SUCCESS', false);

    const formData = new FormData();
    // Cloudinary upload preset
    const uploadPreset = 'anfzira7';
    // Cloudinary upload URL
    //prettier-ignore
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dria4xmog/image/upload';

    formData.append('file', image);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await axios.post(cloudinaryUrl, formData);
      if (res.data && res.data.secure_url) {
        commit('SET_UPLOAD_SUCCESS', true);
        return res.data.secure_url;
      } else {
        commit(
          'SET_UPLOAD_ERROR',
          'No response from Cloudinary! Failed to upload image to Cloudinary'
        );
        return null;
      }
    } catch (error) {
      commit('SET_UPLOAD_ERROR', 'Failed to upload image to Cloudinary');
      console.error(error);
      return null;
    } finally {
      commit('SET_UPLOADING', false);
    }
  },

  // Adding new project to server and commiting it to state
  async addProject({ commit }, project) {
    try {
      const res = await axiosClient.post('/projects', project);
      commit('SET_NEW_PROJECT', project);
      const {
        data: { data },
        status,
      } = res;
      return { data, status };
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to add project details to server.');
      console.error(error);
      throw error;
    }
  },

  // Retrieving a project
  async getProject({ commit }, projectId) {
    try {
      const response = await axiosClient.get(`/projects/${projectId}`);

      const {
        data: { data },
      } = response;
      // console.log('Project to update:', data);
      return data;
    } catch (error) {
      commit('SET_SERVER_ERROR', 'Failed to retrieve project from server.');
      console.log(error);
      throw error;
    }
  },

  // Updating a project to server and commiting it to state
  async updateProject({ commit }, { id, project }) {
    try {
      const res = await axiosClient.put(`/projects/${id}`, project);
      commit('UPDATE_PROJECT', project);
      const {
        data: { data },
        status,
      } = res;

      return { data, status };
    } catch (error) {
      commit('SET_UPLOAD_ERROR', 'Failed to add project details to server.');
      console.error(error);
      throw error;
    }
  },

  // Fetching projects from server and commiting them to state
  async fetchProjects({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await axiosClient.get('/projects');

      // console.log(response.data.data);
      //Destructuring
      const {
        data: { data },
      } = response;
      commit('SET_PROJECTS', data);
      return data;
    } catch (error) {
      commit('SET_SERVER_ERROR', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async deleteProject({ commit }, id) {
    try {
      const res = await axiosClient.delete(`/projects/${id}`);
      commit('DELETE_PROJECT', id);
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
