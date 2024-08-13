<template>
    <div class="font-roboto mb-6">
        <div class="testimonials-section container mx-auto py-16 lg:px-12 px-4 rounded-lg">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-semibold text-gray-700 dark:text-white sm:text-5xl">
                    TESTIMONIALS
                </h2>
                <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Hear from our satisfied customers and discover why they trust us for their needs.
                </p>
            </div>

            <swiper :slidesPerView="1" :spaceBetween="20" :loop="true" :pagination="{ clickable: true }"
                :navigation="false" :autoplay="{ delay: 5000, disableOnInteraction: false }" :breakpoints="breakpoints"
                :modules="modules" class="mySwiper">
                <swiper-slide v-for="(testimonial, index) in testimonials" :key="index"
                    class="testimonial-slide p-8 rounded-lg">
                    <div class="testimonial-text-container h-32 mb-4 overflow-hidden text-ellipsis whitespace-normal">
                        <p class="text italic text-gray-600">"{{ testimonial.quote }}"</p>
                    </div>
                    <img :src="testimonial.image" alt="User Image" class="w-20 h-20 rounded-full mx-auto mb-4"
                        loading="lazy" />
                    <div class="text-center">
                        <p class="font-bold text-lg">{{ testimonial.name }}</p>
                        <p class="text-sm text-gray-600">{{ testimonial.position }}</p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { data } from '../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const testimonials = ref(data.testimonials);

const modules = [Pagination, Navigation, Autoplay];

const breakpoints = {
    640: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 2,
        spaceBetween: 30,
    },
    1024: {
        slidesPerView: 2,
        spaceBetween: 40,
    },
    1280: {
        slidesPerView: 3,
        spaceBetween: 50,
    },
};

onMounted(() => {
    gsap.from(".testimonials-section", {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
            once: true,
        },
    });
});

</script>

<style scoped>
.swiper-slide {
    height: 350px;
    /* Set a fixed height for the slides */
}

.testimonial-text-container {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>