<template>
    <!-- Team Members Section -->
    <div class="font-roboto bg-white mb-6">
        <div class="container mx-auto py-16 lg:px-12 px-4 rounded-lg">
            <div class="font-roboto text-center mb-12">
                <h2 class="text-3xl font-extrabold text-gray-700 dark:text-white sm:text-5xl">
                    MEET OUR TEAM
                </h2>
                <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    The dedicated professionals that work hard to deliver the best services to you.
                </p>
            </div>
            <swiper :slidesPerView="1" :spaceBetween="20" :loop="true" :pagination="{ clickable: true }"
                :navigation="false" :autoplay="{ delay: 5000, disableOnInteraction: false }" :breakpoints="breakpoints"
                :modules="modules" class="mySwiper">
                <swiper-slide v-for="(teamMember, index) in teamMembers" :key="index" class="team-slide p-8 rounded-lg">
                    <img :src="teamMember.image" alt="Team Member Image" class="w-32 h-32 rounded-full mx-auto mb-4"
                        loading="lazy" />
                    <div class="text-center">
                        <p class="font-semibold text-xl text-gray-600 ">{{ teamMember.name }}</p>
                        <p class="text-gray-400">{{ teamMember.role }}</p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';



const teamMembers = ref([
    { name: "John Doe", role: "CEO", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvk8JXZ54_NSS6v6ByvSbeA6W_tYQkRglv_w&s" },
    { name: "Jane Smith", role: "Marketing Manager", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhr_8m5RHlR4Vbh6ZF6Tawt5gQWNE2ePSjQ&s" },
    { name: "Alice Brown", role: "Developer", image: "https://via.placeholder.com/100" },
    { name: "Genana Elly", role: "Marketing Manager", image: "https://via.placeholder.com/100" },
]);

const modules = [Pagination, Navigation, Autoplay];

const breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 2, spaceBetween: 40 },
    1280: { slidesPerView: 3, spaceBetween: 50 },
};

</script>

<style scoped>
.swiper-slide {
    height: 350px;
    /* Set a fixed height for the slides */
}

.team-slide {
    height: auto;
}
</style>