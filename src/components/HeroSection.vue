<template>
    <div class="font-roboto relative flex flex-col lg:flex-row items-center h-screen bg-gray-100 overflow-hidden mt-16">
        <!-- Background Overlay with Gradient -->
        <!-- <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-400 opacity-75 z-10"></div> -->
        <div class="absolute inset-0 bg-gradient-to-b from-green-400 via-green-500 to-green-100 opacity-75 z-10"></div>

        <!-- Left Side: Swiper Cube with Auto-Play, Smooth Transition, and Loop -->
        <div class="w-full lg:w-1/2 relative z-20 overflow-hidden p-8 lg:p-16">

            <swiper :effect="'cube'" :grabCursor="true" :cubeEffect="{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            }" :pagination="true" :autoplay="{
                delay: 10,
                disableOnInteraction: false,
            }" :speed="8000" :loop="true" :modules="modules" class="mySwiper w-full h-80 md:h-96 lg:h-96">
                <swiper-slide v-for="(image, index) in slideImages" :key="index">
                    <div class="absolute inset-0 bg-green-900 bg-opacity-30"></div>

                    <img :src="image" class="object-cover w-full h-full rounded-lg" :alt="'Slide ' + (index + 1)" />
                </swiper-slide>
            </swiper>
        </div>

        <!-- Right Side: Content -->
        <div class="w-full lg:w-1/2 flex flex-col justify-center relative z-20 text-white p-8 lg:p-16">
            <div
                class="w-full max-w-3xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start space-y-6 lg:space-y-8">
                <h1
                    class="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 lg:mb-6 text-center lg:text-left drop-shadow-lg">
                    Discover the Future of Electronics
                </h1>
                <p class="text-base md:text-lg lg:text-xl mb-6 lg:mb-8 text-center lg:text-left drop-shadow-md">
                    Explore cutting-edge technology and innovative gadgets designed to enhance your everyday life. From
                    the latest in smart home devices to advanced tech solutions, find everything you need right here.
                </p>
                <router-link :to="{ name: 'Contact' }"
                    class="inline-block bg-white text-green-600 text-sm md:text-lg lg:text-xl px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-md hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg">
                    Contact Us
                </router-link>
            </div>
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


const slideImages = [
    'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/engineers-working-in-a-factory-workshop-gorodenkoff-productionsscience-photo-library.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOFYZNzb3V1Il4ZWGcMnoDf8hH9zb0moh7Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0DmBvbN-mDBWnlbhLnmvqd-WnsET60pJmCA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd25Sp6tV4jpAOtqFN7ZPYHP5OtDZvXSig0g&s'
];
</script>

<style scoped>
/* Adjust container height for better fit on various devices */

@media (max-width: 768px) {
    .mySwiper {
        height: 60vh;
        /* Adjust height for tablets */
    }
}

@media (max-width: 640px) {
    .mySwiper {
        height: 50vh;
        /* Adjust height for smaller devices */
    }
}
</style>