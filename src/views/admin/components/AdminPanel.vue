<template>
    <!-- Navbar -->
    <nav class="fixed top-0 z-50 w-full bg-green-200 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 md:px-5 md:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start rtl:justify-end">
                    <!-- Sidebar Toggle Button -->
                    <button @click="toggleSidebar" aria-controls="sidebar-small" type="button"
                        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        v-if="isSmallScreen">
                        <span class="sr-only">Open sidebar</span>
                        <i
                            :class="isSidebarOpen ? 'fa-solid fas fa-window-close bg-red-600 text-white' : 'fa-solid fas fa-bars'"></i>
                    </button>
                    <a href="https://flowbite.com" class="flex ms-2 md:me-24">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
                        <span
                            class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Mtonix</span>
                    </a>
                </div>

                <!-- User profile -->
                <div class="flex items-center">
                    <div class="flex items-center ms-3">
                        <div class="relative">
                            <button @click="toggleProfileMenu" class="focus:outline-none flex items-center">
                                <img class="h-8 w-8 rounded-full object-cover" src="https://via.placeholder.com/150"
                                    alt="User avatar">
                                <span class="ml-2 text-gray-700 font-semibold">Admin</span>
                                <svg class="h-5 w-5 text-gray-700 ml-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div v-if="isProfileMenuOpen"
                                class="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-20">
                                <a @click="logout"
                                    class="block px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 hover:font-bold cursor-pointer">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Sidebar for larger screens -->
    <aside id="sidebar-large"
        class="hidden md:block fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform bg-green-600 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-green-600 dark:bg-gray-800">
            <ul class="space-y-2 font-medium" v-for="menuItem in menuItems" :key="menuItem.id">
                <li>
                    <router-link :to="{ name: menuItem.link }"
                        class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <div
                            class="w-5 h-5 text-gold transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                            <i :class="menuItem.icon"></i>
                        </div>
                        <span
                            class="ms-3  text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white hover:text-white">{{
                                menuItem.name }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>

    <!-- Sidebar for small screens -->
    <aside id="sidebar-small" :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-green-600 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-green-600 dark:bg-gray-800">
            <ul class="space-y-2 font-medium" v-for="menuItem in menuItems" :key="menuItem.id">
                <li>
                    <router-link :to="{ name: menuItem.link }" @click="toggleSidebar"
                        class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <div
                            class="w-5 h-5 text-gold transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                            <i :class="menuItem.icon"></i>
                        </div>
                        <span
                            class="ms-3  text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white hover:text-white">{{
                                menuItem.name }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>

    <!-- Main Content -->
    <div class=" md:ml-64 bg-gray-100">
        <div class=" border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

const store = useStore();
const toast = useToast();
const router = useRouter();

const logout = async () => {
    try {
        await store.dispatch('users/logout');
        router.push({ name: 'admin.login' })
        toast.success('Logout successful')
    } catch (error) {
        toast.error('Logout failed!');
        console.error('Error during logout', error);
    }
};

// Sidebar state
const isSidebarOpen = ref(false);
const isSmallScreen = ref(window.innerWidth < 768); // md breakpoint (768px)
const isProfileMenuOpen = ref(false);


// Toggle sidebar function
function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}

// Handle window resize
function handleResize() {
    const currentWidth = window.innerWidth;
    isSmallScreen.value = currentWidth < 768; // md breakpoint (768px)
    if (!isSmallScreen.value) {
        isSidebarOpen.value = false; // Close the small screen sidebar when transitioning to larger screens
    }
}

const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Ensure the correct state on initial mount
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});


const menuItems = [
    { name: 'Dashboard', link: 'admin.home', icon: 'fa-solid fas fa-home' },
    { name: 'Products', link: 'admin.products', icon: 'fa-solid fas fa-box-open' },
    { name: 'Categories', link: 'admin.categories', icon: 'fa-solid fas fa-tv' },
    { name: 'Projects', link: 'admin.projects', icon: 'fa-solid fas fa-project-diagram' },
    { name: 'Features', link: 'admin.features', icon: 'fa-solid fas fa-plug' },
    { name: 'Users', link: 'admin.users', icon: 'fa-solid fas fa-users' },
    { name: 'Testimonials', link: 'admin.testimonials', icon: 'fa-solid fas fa-comments' },
];

</script>
