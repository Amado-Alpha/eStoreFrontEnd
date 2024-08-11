import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

// Main site related imports
import WebsiteLayout from '../layouts/WebsiteLayout.vue';
import Home from '../components/HomePage.vue';
import AboutPage from '../sections/AboutPage.vue';
import ProjectsPage from '../sections/ProjectsPage.vue';
import ProductsPage from '../sections/ProductsPage.vue';
import ServicesPage from '../sections/ServicesPage.vue';
import ContactsPage from '../sections/ContactsPage.vue';

// Admin related imports
import AdminLayout from '../layouts/AdminLayout.vue';

import AdminTestimonialEdit from '../views/admin/Testimonials/AdminTestimonialEdit.vue';
import AdminProjectEdit from '../views/admin/Projects/AdminProjectEdit.vue';
import AdminProductEdit from '../views/admin/Products/AdminProductEdit.vue';
import AdminUserEdit from '../views/admin/Users/AdminUserEdit.vue';
import AdminUsers from '../views/admin/Users/AdminUsers.vue';
import AdminDashboard from '../views/admin/components/AdminDashboard.vue';
import AdminProducts from '../views/admin/Products/AdminProducts.vue';
import AdminProjects from '../views/admin/Projects/AdminProjects.vue';
import AdminTestimonials from '../views/admin/Testimonials/AdminTestimonials.vue';
import AdminRegister from '../views/admin/Users/AdminRegister.vue';
import AdminLogin from '../views/admin/Users/AdminLogin.vue';
import HeroSection from '../components/HeroSection.vue';

const routes = [
  {
    path: '/',
    component: WebsiteLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'hero',
        name: 'hero',
        component: HeroSection,
      },
      {
        path: 'about',
        name: 'About',
        component: AboutPage,
      },
      {
        path: 'projects',
        name: 'Projects',
        component: ProjectsPage,
      },
      {
        path: 'products',
        name: 'Products',
        component: ProductsPage,
      },
      {
        path: 'services',
        name: 'Services',
        component: ServicesPage,
      },
      {
        path: 'contacts',
        name: 'Contact',
        component: ContactsPage,
      },
    ],
  },

  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: 'home',
        name: 'admin.home',
        component: AdminDashboard,
      },

      // Users
      {
        path: 'register',
        name: 'admin.register',
        component: AdminRegister,
      },
      {
        path: 'users',
        name: 'admin.users',
        component: AdminUsers,
      },
      {
        path: 'edit-user/:id?/edit',
        name: 'admin.edit-user',
        component: AdminUserEdit,
        props: true,
      },

      // Products
      {
        path: 'products',
        name: 'admin.products',
        component: AdminProducts,
      },
      {
        path: 'edit-product/:id?/edit',
        name: 'admin.edit-product',
        component: AdminProductEdit,
        props: true,
      },

      // Projects
      {
        path: 'edit-project/:id?/edit',
        name: 'admin.edit-project',
        component: AdminProjectEdit,
        props: true, // Pass route params as props to the component
      },
      {
        path: 'projects',
        name: 'admin.projects',
        component: AdminProjects,
      },

      // Testimonials
      {
        path: 'testimonials',
        name: 'admin.testimonials',
        component: AdminTestimonials,
      },
      {
        path: 'edit-testimonial/:id?/edit',
        name: 'admin.edit-testimonial',
        component: AdminTestimonialEdit,
        props: true,
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: AdminLogin,
  },
];

const router = createRouter({
  mode: 'hash',
  history: createWebHistory(),
  routes,

  // This is to enable scrolling to a specific section of another page
  /*
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  */
  scrollBehavior() {
    return { top: 0 };
  },
});

// Navigation guard to protect admin routes
router.beforeEach((to, from, next) => {
  const isAdminRoute =
    to.path.startsWith('/admin') && to.name !== 'admin.login';

  // Check if the user is authenticated using !!
  const isAuthenticated = !!store.state.users.authToken;

  if (isAuthenticated && to.name === 'admin.login') {
    next({ name: 'admin.home' });
  } else if (isAdminRoute && !isAuthenticated && to.name != 'admin.login') {
    next({ name: 'admin.login' });
  } else {
    next();
  }

  // if (isAdminRoute && !isAuthenticated) {
  //   next({ name: 'admin.login' }); // Redirect to login if not authenticated
  // } else {
  //   next(); // Allow navigation if authenticated or not an admin route
  // }
});

export default router;
