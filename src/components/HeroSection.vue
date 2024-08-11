<template>
    <div class="relative flex flex-col lg:flex-row items-center h-screen bg-gray-100 overflow-hidden">
        <!-- Background Overlay with Gradient -->
        <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-75 z-10"></div>

        <!-- Left Side: Swiper Cube with Auto-Play and Smooth Transition -->
        <div class="w-full lg:w-1/2 relative z-20 overflow-hidden">
            <swiper :effect="'cube'" :grabCursor="true" :cubeEffect="{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            }" :pagination="true" :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
        }" :speed="1000" :modules="modules" class="mySwiper w-full h-full">
                <swiper-slide class="flex items-center justify-center">
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg"
                        class="object-cover w-full h-full max-w-full max-h-full" />
                </swiper-slide>
                <swiper-slide class="flex items-center justify-center">
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg"
                        class="object-cover w-full h-full max-w-full max-h-full" />
                </swiper-slide>
                <swiper-slide class="flex items-center justify-center">
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg"
                        class="object-cover w-full h-full max-w-full max-h-full" />
                </swiper-slide>
                <swiper-slide class="flex items-center justify-center">
                    <img src="https://swiperjs.com/demos/images/nature-4.jpg"
                        class="object-cover w-full h-full max-w-full max-h-full" />
                </swiper-slide>
            </swiper>
        </div>

        <!-- Right Side: Content -->
        <div class="w-full lg:w-1/2 p-8 lg:p-16 text-center lg:text-left relative z-20 text-white">
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
                Your Bold Headline
            </h1>
            <p class="text-base md:text-lg lg:text-2xl mb-8 drop-shadow-md">
                Your brief description that highlights your product or service.
            </p>
            <a href="#your-link"
                class="inline-block bg-white text-green-600 text-sm md:text-lg lg:text-xl px-6 md:px-8 py-3 md:py-4 rounded-md hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg">
                Get Started
            </a>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { EffectCube, Pagination, Autoplay } from 'swiper/modules';

const modules = [EffectCube, Pagination, Autoplay];
</script>

<style scoped>
/* Ensure swiper container doesn't exceed viewport width */
.mySwiper {
    width: 100%;
    height: 100%;
}

@media (max-width: 768px) {

    /* Adjust for smaller screens */
    .mySwiper {
        height: 50vh;
        /* Example height for mobile */
    }
}
</style>