import { createRouter, createWebHistory } from 'vue-router';

// Main site related imports
import WebsiteLayout from '../layouts/WebsiteLayout.vue';
import Home from '../components/HomePage.vue';

// Admin related imports
import AdminLayout from '../layouts/AdminLayout.vue';

import Users from '../views/admin/Users.vue';
import AdminHome from '../views/admin/AdminHome.vue';
import AdminProducts from '../views/admin/AdminProducts.vue';
import AdminProjects from '../views/admin/AdminProjects.vue';
import AdminTestimonials from '../views/admin/AdminTestimonials.vue';
import AdminLogin from '../views/admin/AdminLogin.vue';
import AdminRegister from '../views/admin/AdminRegister.vue';
import AdminEditProject from '../views/admin/AdminEditProject.vue';

// Website pages
import AboutPage from '../sections/AboutPage.vue';
import ProjectsPage from '../sections/ProjectsPage.vue';
import ProductsPage from '../sections/ProductsPage.vue';
import ServicesPage from '../sections/ServicesPage.vue';
import ContactsPage from '../sections/ContactsPage.vue';
import AdminEditProduct from '../views/admin/AdminEditProduct.vue';
import AdminEditUser from '../views/admin/AdminEditUser.vue';

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
                component: AdminHome,
            },

            // Users
            {
                path: 'register',
                name: 'admin.egister',
                component: AdminRegister,
            },
            {
                path: 'login',
                name: 'admin.login',
                component: AdminLogin,
            },
            {
                path: 'users',
                name: 'admin.users',
                component: Users,
            },
            {
                path: 'edit-user/:id/edit',
                name: 'admin.edit-user',
                component: AdminEditUser,
                props: true,
            },

            // Products
            {
                path: 'products',
                name: 'admin.products',
                component: AdminProducts,
            },
            {
                path: 'edit-product/:id/edit',
                name: 'admin.edit-product',
                component: AdminEditProduct,
                props: true,
            },

            // Projects
            {
                path: 'edit-project/:id/edit',
                name: 'admin.edit-project',
                component: AdminEditProject,
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
        ],
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

export default router;
