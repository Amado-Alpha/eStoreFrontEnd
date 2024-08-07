<template>
  <!-- Header -->
  <nav
    class="mb-24 bg-white dark:bg-gray-900 fixed w-full z-40 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse relative">
        <img :src="logo" class="mt-4 h-8 relative z-10" alt="Logo" />
      </router-link>
      <div class="flex md:order-2">
        <button @click="toggleSidebar" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-300 ease-in-out">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div :class="{ 'hidden': !isSidebarOpen, 'block': isSidebarOpen }"
        class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-menu">
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li v-for="item in navLinks" :key="item.label" class="relative">
            <router-link @click="closeSidebar" :to="item.href"
              class="font-roboto block py-4 px-3 text-md font-semibold text-gray-700 dark:text-white hover:text-green-500 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105">
              {{ item.label }}
              <span
                class="absolute inset-x-0 bottom-0 left-0 h-1 bg-green-500 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <TopBar />
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { data } from '../constants/index.js';
import { logo } from '../assets/images';

const navLinks = ref(data.navLinks);
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

// Watch for changes in the sidebar state to update the overflow property of the body
watch(isSidebarOpen, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : 'auto';
});
</script>

<style scoped>
/* Green underline effect on hover */
.relative:hover span {
  transform: scaleX(1);
}

span {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  /* Thickness of the underline */
  background-color: #22c55e;
  /* Green color */
  transform: scaleX(0);
  transform-origin: bottom right;
}
</style>
