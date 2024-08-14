<template>
    <section
        class="hero-section bg-gradient-to-r from-green-100 to-white flex flex-col lg:flex-row items-center justify-center lg:justify-between  px-10 overflow-hidden">
        <!-- Left Side: Illustration -->
        <div class="illustration w-full lg:w-1/2 mb-8 lg:mb-0">
            <img :src="contact" alt="Customer Service Illustration" class="w-full h-auto">
        </div>

        <!-- Right Side: Text and Buttons -->
        <div class="text-center lg:text-right lg:w-1/2">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">We're Here to Help!</h1>
            <p class="text-lg text-gray-600 mb-8">Reach out to us with any questions or concerns. Our team is ready to
                assist you.</p>
            <div class="flex flex-col lg:flex-row justify-center lg:justify-end space-y-4 lg:space-y-0 lg:space-x-4">
                <button
                    class="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out">Call
                    Us</button>
                <button
                    class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">Email
                    Us</button>
                <button
                    class="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out">Chat
                    Now</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { contact } from '../assets/icons';

onMounted(() => {
    gsap.from('.hero-section h1', { y: 50, opacity: 0, duration: 1, ease: 'power2.out' });
    gsap.from('.hero-section p', { y: 50, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });
    gsap.from('.hero-section button', {
        x: 50, opacity: 0, duration: 1, delay: 0.4, ease: 'power2.out', stagger: 0.1
    });
    gsap.from('.illustration img', { x: -50, opacity: 0, duration: 1, delay: 0.6, ease: 'power2.out' });
});
</script>

<style scoped>
/* .hero-section {
    min-height: 60vh;
} */
</style>
