<template>
    <!-- <div class="flex">
        <Sidebar :isOpen="isSidebarOpen" />
        <div :class="{ 'ml-0': !isSidebarOpen, 'ml-64': isSidebarOpen }"
            class="flex-1 mt-16 transition-all duration-300">
            <Header @toggle-sidebar="toggleSidebar" />
            <div class="p-4">
                <router-view />
            </div>
        </div>
    </div> -->

    <Sidebar />
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../views/admin/AdminPanel.vue';
// import Header from '../views/admin/Home.vue';


</script>

<style scoped></style>