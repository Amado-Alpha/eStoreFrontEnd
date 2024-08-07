import { createStore } from 'vuex';
import categories from './modules/categories';
import products from './modules/products';
import projects from './modules/projects';
import features from './modules/features';
import users from './modules/users';

//prettier-ignore
const store = createStore({
  modules: {
    categories,
    products,
    projects,
    features,
    users
  }
})
export default store;
