<template>
    <section id="home" class="mt-16">
        <div class="carousel-container relative w-full overflow-hidden font-roboto">
            <div class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div v-for="(slide, index) in slides" :key="index"
                    class="carousel-container flex-shrink-0 w-full relative">
                    <picture>
                        <source media="(min-width: 1024px)" :srcset="slide.imageLargeScreen">
                        <source media="(min-width: 768px)" :srcset="slide.imageMediumScreen">
                        <source media="(min-width: 640px)" :srcset="slide.image">
                        <img :src="slide.image" :alt="slide.alt" class="w-full h-full object-cover" loading="lazy">
                    </picture>

                    <div class="absolute inset-0 bg-green-900 bg-opacity-50"></div>

                </div>
            </div>
            <button @click="prevSlide"
                class="carousel-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none">
                &#10094;
            </button>
            <button @click="nextSlide"
                class="carousel-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none">
                &#10095;
            </button>
            <div class="carousel-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <span v-for="(slide, index) in slides" :key="index" @click="gotoSlide(index)"
                    :class="{ 'bg-white': currentSlide === index, 'bg-gray-400': currentSlide !== index }"
                    class="block w-3 h-3 rounded-full cursor-pointer"></span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { banner } from "../assets/images";

import { ref, onMounted, onUnmounted } from 'vue';

// Recommended image size for bigger screens (1200x600)
const slides = [
    {
        image: banner,
        imageMediumScreen: banner,
        imageLargeScreen: banner,
        alt: 'Slide 1',
        title: 'Dedicated to serve you',
        description: 'Let us have your business infrastructure connected like never before!'
    },
    {
        image: banner,
        imageMediumScreen: banner,
        imageLargeScreen: banner,
        alt: 'Slide 2',
        title: 'Serving you faithfully',
        description: 'Let us have your business infrastructure connected like never before!'
    },
    {
        image: banner,
        imageMediumScreen: banner,
        imageLargeScreen: banner,
        alt: 'Slide 3',
        title: 'Microwave link installation',
        description: 'We install both single purpose and hybrid wireless links at an affordable price to enhance your business productivity'
    },
];

const currentSlide = ref(0);
const totalSlides = slides.length;
let slideInterval;


function nextSlide() {
    currentSlide.value = (currentSlide.value + 1) % totalSlides;
}

function prevSlide() {
    currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
}

function gotoSlide(index) {
    currentSlide.value = index;
}

onMounted(() => {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
});

onUnmounted(() => {
    clearInterval(slideInterval);
});

</script>

<style scoped>
.carousel-container {
    height: 600px;
    /* Adjust height as needed */
}

.carousel-item img {
    height: 600px;
    /* Ensure all images are the same height */
}

.carousel-inner {
    display: flex;
}



.carousel-prev,
.carousel-next {
    top: 50%;
    transform: translateY(-50%);
}

.carousel-indicators span {
    transition: background-color 0.3s ease;
}

/* Gradient overlay */
.gradient-overlay {
    background: linear-gradient(to top, rgba(3, 62, 24, 0.8), rgba(27, 230, 30, 0.1));
    position: absolute;
    inset: 0;
    pointer-events: none;
    /* Ensures the overlay doesn't interfere with interactions */
}
</style>