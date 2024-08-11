<template>
    <div class="font-roboto mb-6">
        <div class="container mx-auto py-16 lg:px-12 px-4 rounded-lg">
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

<script>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const testimonials = ref([
            {
                quote: "This service is amazing. Highly recommend!",
                name: "John Doe",
                position: "CEO, Company Inc.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvk8JXZ54_NSS6v6ByvSbeA6W_tYQkRglv_w&s"
            },
            {
                quote: "Fantastic experience. Will use again.",
                name: "Jane Smith",
                position: "Marketing Manager, Business Co.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhr_8m5RHlR4Vbh6ZF6Tawt5gQWNE2ePSjQ&s"
            },
            {
                quote: "This is a longer testimonial to test the height of the slides. The content should not make the slides uneven.",
                name: "Alice Brown",
                position: "Developer, Tech Solutions",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUGStslkW8XpFkAVnQD0QcSz4MEZXZmjEwg&s"
            },
            {
                quote: "Fantastic experience. Will use again.",
                name: "Jane Smith",
                position: "Marketing Manager, Business Co.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhr_8m5RHlR4Vbh6ZF6Tawt5gQWNE2ePSjQ&s"
            },
            {
                quote: "This is a longer testimonial to test the height of the slides. The content should not make the slides uneven.",
                name: "Alice Brown",
                position: "Developer, Tech Solutions",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUGStslkW8XpFkAVnQD0QcSz4MEZXZmjEwg&s"
            },
            {
                quote: "Fantastic experience. Will use again.",
                name: "Genana Elly",
                position: "Marketing Manager, Business Co.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUGStslkW8XpFkAVnQD0QcSz4MEZXZmjEwg&s"
            },
            {
                quote: "This is a longer testimonial to test the height of the slides. The content should not make the slides uneven.",
                name: "Mireya Elly",
                position: "Developer, Tech Solutions",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhr_8m5RHlR4Vbh6ZF6Tawt5gQWNE2ePSjQ&s"
            },
            // Add more testimonials as needed
        ]);

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

        return {
            testimonials,
            modules,
            breakpoints,
        };
    },
};
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