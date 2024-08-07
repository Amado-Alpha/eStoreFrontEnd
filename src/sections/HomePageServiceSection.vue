<template>
    <section class="container mx-auto lg:px-12 px-4 bg-gray dark:bg-gray-900 py-12 mt-12">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="font-roboto text-center mb-12">
                <h2 class="text-3xl font-extrabold text-gray-700 dark:text-white sm:text-5xl">
                    SERVICES
                </h2>
                <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover the range of services we offer to help you achieve the results you're after.
                </p>
            </div>
            <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="service in services" :key="service.id"
                    class="font-roboto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 p-6 text-center">
                    <div class="flex items-center justify-center h-16 w-16 mx-auto mb-4">
                        <i :class="service.icon" class="text-green-500 text-4xl"></i>
                    </div>
                    <h3 class="text-2xl font-semibold text-gray-700 dark:text-white">
                        {{ service.title }}
                    </h3>
                    <p class="mt-4 text-base text-gray-600 dark:text-gray-400">
                        {{ service.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
    {
        id: 1,
        title: "3D Printing",
        icon: "fas fa-print",
        description: "High-quality 3D printing services for prototypes, parts, and products with precision and efficiency."
    },
    {
        id: 2,
        title: "Software Development",
        icon: "fas fa-laptop",
        description: "Custom software solutions tailored to meet your business needs and drive innovation."
    },
    {
        id: 3,
        title: "Circuit Design and Development",
        icon: "fas fa-microchip",
        description: "Innovative circuit design and development services to bring your electronic projects to life."
    },
    {
        id: 4,
        title: "Computer Maintenance and Repair",
        icon: "fas fa-tools",
        description: "Comprehensive maintenance and repair services to keep your computers running smoothly."
    },
    {
        id: 5,
        title: "Tech Consultancy",
        icon: "fas fa-user-tie",
        description: "Expert tech consultancy services to help you make informed decisions and stay ahead of the curve."
    },
    {
        id: 6,
        title: "Selling of Electronic Devices",
        icon: "fas fa-laptop",
        description: "Wide range of electronic devices for sale, from the latest gadgets to essential tech tools."
    }
]);
</script>

<style scoped>
/* Import Font Awesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>