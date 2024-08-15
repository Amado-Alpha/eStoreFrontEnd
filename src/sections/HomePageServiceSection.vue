<template>
    <div class="bg-green-100">
        <section class="container mx-auto lg:px-12 px-4 bg-gray dark:bg-gray-900 py-12  bg-green-100">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="font-roboto text-center mb-12">
                    <h2 class="text-3xl font-extrabold text-gray-700 dark:text-white sm:text-5xl">
                        SERVICES
                    </h2>
                    <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover the range of services we offer to help you achieve the results you're after.
                    </p>
                </div>
                <div class="services-container grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-10">
                    <div v-for="service in services" :key="service.id"
                        class="service-item font-roboto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 p-6 text-center">
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
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { data } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const services = ref(data.services);

onMounted(() => {

    const items = document.querySelectorAll('.service-item');

    items.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 70,
            scale: 0.95,
            duration: 0.2,
            delay: index * 0.2, // Delay each item based on its index
            ease: "power2.out",
            filter: "blur(10px)", // Start with blur
            clearProps: "filter" // Clear blur after animations
        });
    });
});
</script>

<style scoped>
/* Import Font Awesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>