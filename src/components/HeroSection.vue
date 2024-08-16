<template>
    <div class="relative grid lg:grid-cols-2 grid-rows-1 overflow-hidden mt-16 lg:mt-24">
        <!-- Background Overlay with Gradient -->
        <div class="absolute inset-0 bg-gradient-to-b from-green-700 via-green-600 to-green-500 opacity-80 z-10"></div>

        <!-- Left Side: Swiper with Pagination, Autoplay, and Loop -->
        <div class="relative z-20 overflow-hidden row-span-1 col-span-1 mb-10">
            <swiper :pagination="{ clickable: true }" :autoplay="{ delay: 1000, disableOnInteraction: false }"
                :loop="true" :speed="4000" :modules="modules" class="rounded-lg shadow-lg">
                <swiper-slide v-for="(image, index) in slideImages" :key="index">
                    <div class="relative">
                        <img :src="image"
                            class="object-cover w-full h-80 sm:h-96 md:h-[550px] lg:h-[500px] rounded-lg transition-opacity duration-300 ease-in-out"
                            :alt="'Slide ' + (index + 1)" />
                        <!-- Subtle Overlay -->
                        <div class="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <!-- Right Side: Content -->
        <div
            class="container mx-auto relative z-20 flex flex-col justify-center row-span-1 col-span-1 text-white p-8 lg:p-16 w-full h-full md:h-96 backdrop-blur-sm">
            <div class="lg:mx-0 flex flex-col items-center lg:items-start space-y-6 lg:space-y-8 lg:mt-32">
                <h1
                    class="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 lg:mb-6 text-center lg:text-left drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">
                    Discover the Future of Electronics
                </h1>
                <p
                    class="text-xl md:text-2xl lg:text-2xl mb-6 lg:mb-8 text-center lg:text-left text-gray-200 drop-shadow-md">
                    Explore cutting-edge technology and innovative gadgets designed to enhance your everyday life. <span
                        class="text-gray-300">From the latest in smart home devices to advanced tech solutions, find
                        everything you need right here.</span>
                </p>
                <router-link :to="{ name: 'Contact' }"
                    class="inline-block bg-white text-green-700 text-sm md:text-lg lg:text-xl px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-md hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg">
                    Contact us
                </router-link>
            </div>
        </div>
    </div>
</template>


<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

const modules = [Pagination, Autoplay];

const slideImages = [
    'https://www.ucl.ac.uk/electronic-electrical-engineering/sites/electronic_electrical_engineering/files/styles/large_image/public/img_6217-cropped_800_x_500_0.jpg?itok=bzP7Mut-',
    'https://techatronic.com/wp-content/uploads/2022/03/fre-1-1-800x531.jpg',
    'https://www.ucl.ac.uk/electronic-electrical-engineering/sites/electronic_electrical_engineering/files/styles/large_image/public/img_6217-cropped_800_x_500_0.jpg?itok=bzP7Mut-',
    'https://techatronic.com/wp-content/uploads/2022/03/fre-1-1-800x531.jpg',
];
</script>

<style scoped>
/* Ensure swiper container handles height appropriately */
.mySwiper {
    width: 100%;
    height: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
}

/* Adjust height and spacing for different screen sizes */
@media (max-width: 768px) {
    .mySwiper {
        height: 50vh;
    }
}

@media (max-width: 640px) {
    .mySwiper {
        height: 45vh;
    }
}
</style>
