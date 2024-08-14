<template>
    <section class="bg-gradient-to-b from-green-200 to-white py-16 lg:py-16">
        <div class="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-12">
            <!-- Left Side: Text Content -->
            <div class="lg:w-1/2 mb-12 lg:mb-0">
                <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Explore Our Latest Electronics</h1>
                <p class="text-lg text-gray-600 mb-8">
                    Discover a wide range of cutting-edge gadgets and tools designed to enhance your life. Browse
                    through our collection and find the perfect product for your needs.
                </p>
                <a href="#products"
                    class="inline-block bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                    Shop Now
                </a>
            </div>

            <!-- Right Side: Illustration -->
            <div class="lg:w-1/2 animate-fade-in-right">
                <img :src="productsPageIllustration" alt="Shopping Illustration" class="w-full h-auto">
            </div>
        </div>
    </section>
</template>

<script setup>

import { productsPageIllustration } from '../assets/icons';

</script>

<style scoped>
@keyframes fade-in-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-right {
    0% {
        opacity: 0;
        transform: translateX(-20px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>