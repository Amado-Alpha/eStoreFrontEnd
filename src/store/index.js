import { createStore } from 'vuex';
import categories from './modules/categories';
import products from './modules/products';
import projects from './modules/projects';
import features from './modules/features';
import users from './modules/users';
import testimonials from './modules/testimonials';

//prettier-ignore
const store = createStore({
  modules: {
    categories,
    products,
    projects,
    features,
    testimonials,
    users
  }
})
export default store;
