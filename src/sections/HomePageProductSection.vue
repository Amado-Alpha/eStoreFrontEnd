<template>
    <div class="products-section container mx-auto py-16 lg:px-12 px-4 bg-white rounded-lg shadow-lg">
        <div class="font-roboto text-center mb-12">
            <h2 class="text-3xl font-semibold text-gray-700 dark:text-white sm:text-5xl">
                PRODUCTS
            </h2>
            <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our range of top-quality products available at an affordable price.
            </p>
        </div>
        <swiper :slidesPerView="1" :spaceBetween="20" :loop="true" :navigation="false"
            :autoplay="{ delay: 3000, disableOnInteraction: false }" :breakpoints="breakpoints" :modules="modules"
            class="mySwiper">
            <swiper-slide v-for="(product, index) in products" :key="index" class="product-slide p-8 rounded-lg">
                <img :src="product?.imageUrl" alt="Product Image" class="w-full h-64 object-fill mb-4 rounded-lg"
                    loading="lazy" />
                <div class="product-text-container h-24 overflow-hidden text-ellipsis whitespace-normal">
                    <p class="text-xl font-bold">{{ product?.name }}</p>
                    <p class="text-sm text-gray-600">{{ product?.description }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold text-gray-900">{{ formatPrice(product?.price) }}</span>
                    <div>
                        <a :href="'https://wa.me/' + product?.whatsapp" target="_blank" class="whatsapp-icon">
                            <i
                                class="fab fa-whatsapp text-3xl text-green-500 hover:text-green-800 transition-colors duration-300"></i>
                        </a>
                        <a :href="'tel:' + product?.phone" class="phone-icon">
                            <i
                                class="fas fa-phone text-3xl text-blue-500 hover:text-blue-800 transition-colors duration-300"></i>
                        </a>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { data } from '../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from 'vuex';

gsap.registerPlugin(ScrollTrigger);

const productStaticData = ref(data.products);

const modules = [Pagination, Navigation, Autoplay];

const store = useStore();
const fetchProducts = () => store.dispatch('products/fetchProducts');

const productsFromServer = computed(() => store.state.products.products);

// Logic to check which data to use (From server or static)

const products = computed(() => {
    return productsFromServer.value.length > 3 ? productsFromServer.value : productStaticData.value;
})

// Formatting price
const formatPrice = function (value) {
    // Convert the value to a number to ensure correct formatting
    let numericValue = parseFloat(value);

    // Format the numeric value as Tanzanian Shillings
    let formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'TZS',
    }).format(numericValue);

    return formattedValue;
}


const breakpoints = {
    640: {
        slidesPerView: 2,
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
    gsap.from(".products-section", {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".products-section",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
            once: true,
        },
    });

    fetchProducts();
});

</script>

<style scoped>
.swiper-slide {
    height: 450px;
    /* Set a fixed height for the slides */
}

.product-text-container {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* Adjust based on the desired number of lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>