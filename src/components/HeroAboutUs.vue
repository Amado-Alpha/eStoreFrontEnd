<template>
    <section
        class="hero-section bg-gradient-to-b from-green-100 to-white flex flex-col lg:flex-row items-center justify-center lg:justify-between mt-16 px-10 overflow-hidden">
        <!-- Left Side: Illustration -->
        <div class="illustration w-full lg:w-1/2 mb-8 lg:mb-0">
            <img :src="about" alt="Customer Service Illustration" class="w-full h-auto">
        </div>

        <!-- Right Side: Text and Buttons -->
        <div class="text-center lg:text-right lg:w-1/2">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
            <p class="text-lg text-gray-600 mb-8">Learn more about our mission, vision, and the dedicated team behind
                our success.</p>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { about } from '../assets/icons';

onMounted(() => {
    gsap.from('.hero-section h1', { y: 50, opacity: 0, duration: 1, ease: 'power2.out' });
    gsap.from('.hero-section p', { y: 50, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });
    gsap.from('.illustration img', { x: -50, opacity: 0, duration: 1, delay: 0.4, ease: 'power2.out' });
});
</script>

<style scoped>
/* .hero-section {
    min-height: 60vh;
} */
</style>
