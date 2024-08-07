<template>
    <HeroAboutUs header="Our Products" />
    <section ref="productsTopPosition" class="featured-products py-8 bg-gray-100 mt-20">
        <div class="max-w-screen-xl mx-auto lg:px-12 px-4">
            <h2 class="text-4xl font-semibold text-center text-gray-800 mb-8">SHOP WITH US</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(product, index) in paginatedProducts" :key="index"
                    class="product-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img :src="product.image" :alt="product.name"
                        class="w-[400px] h-[300px] object-fill rounded-t-lg mb-4">
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
                    <p class="text-gray-600 mb-4">{{ product.description }}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-bold text-gray-900">{{ product.price }}</span>
                        <div>
                            <a :href="'https://wa.me/' + product.whatsapp" target="_blank" class="whatsapp-icon">
                                <i
                                    class="fab fa-whatsapp text-3xl text-green-500 hover:text-green-800 transition-colors duration-300"></i>
                            </a>
                            <a :href="'tel:' + product.phone" class="phone-icon">
                                <i
                                    class="fas fa-phone text-3xl text-blue-500 hover:text-blue-800 transition-colors duration-300"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-4">
                <button v-if="currentPage > 1" @click="prevPage" class="pagination-btn">
                    Previous
                </button>
                <button v-for="page in totalPages" :key="page" @click="gotoPage(page)"
                    :class="{ 'font-semibold': currentPage === page }" class="pagination-btn">
                    {{ page }}
                </button>
                <button v-if="currentPage < totalPages" @click="nextPage" class="pagination-btn">
                    Next
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import HeroAboutUs from '../components/HeroAboutUs.vue';


const productsPerPage = 9;
const currentPage = ref(1);
const productsTopPosition = ref(null);

const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * productsPerPage;
    const endIndex = currentPage.value * productsPerPage;
    return products.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(products.value.length / productsPerPage));

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        scrollToPosition();
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
        scrollToPosition();
    }
}

function gotoPage(page) {
    currentPage.value = page;
    scrollToPosition();
}

function scrollToPosition() {
    if (productsTopPosition.value) {
        const position = productsTopPosition.value.offsetTop;
        window.scrollTo({ top: position, behavior: 'smooth' });
    }
}

// Recommended size (400x300)
const products = ref([
    {
        id: 1,
        name: 'Arduino UNO',
        description: 'Microcontroller device.',
        price: 'Tsh. 35,000/=',
        image: 'https://store.arduino.cc/cdn/shop/products/A000066_01.iso_934x700.jpg?v=1629815860',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 2,
        name: 'HP pavilion',
        description: 'Durable PC',
        price: 'Tsh. 620,000/=',
        image: 'data:image/jpeg;base64,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',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 2,
        name: 'HP Envy',
        description: 'Ultra-fast processing',
        price: 'Tsh. 980,000/=',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ng6bnj1iCcJ2RdS9lmiT2tq6YLJFId7NNg&s',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 3,
        name: 'Ultrasonic sensor',
        description: 'Distance sensor.',
        price: 'Tsh. 10,000/=',
        image: 'https://m.media-amazon.com/images/I/612VzpvhpjL._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 4,
        name: 'Macbook Pro ',
        description: 'Amazing graphics capability',
        price: 'Tsh. 912,000/=',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxbnnYI5gEzdNPzoD_GBR2L5JBPzBTCiTjhg&s',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 5,
        name: 'Dell inspiron',
        description: 'Robust design',
        price: 'Tsh. 820,000/=',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TdVxy7gAD_rzuI6NjlCY9voPOdQu_r0PBw&s',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 6,
        name: 'Coin acceptor',
        description: 'Programmable acceptor.',
        price: 'Tsh. 90,000/=',
        image: 'https://cdn.sparkfun.com/assets/parts/7/6/9/6/11636-01.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 7,
        name: 'pH sensor',
        description: 'pH measuring calibrated sensor.',
        price: 'Tsh. 85,000/=',
        image: 'https://m.media-amazon.com/images/I/413J1PM5ueL._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 8,
        name: 'Crimping tool',
        description: 'UTP termination tool.',
        price: 'Tsh. 45,000/=',
        image: 'https://intellinetsolutions.com/cdn/shop/products/universal-modular-plug-crimping-tool-211048-1_aefec92a-7edb-49b1-92bb-fa06e1389ed7.jpg?v=1678692447',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 9,
        name: 'Node MCU',
        description: 'Wireless card.',
        price: 'Tsh. 20,000/=',
        image: 'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 1,
        name: 'Arduino UNO',
        description: 'Microcontroller device.',
        price: 'Tsh. 35,000/=',
        image: 'https://store.arduino.cc/cdn/shop/products/A000066_01.iso_934x700.jpg?v=1629815860',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 2,
        name: 'Node MCU',
        description: 'Wireless card.',
        price: 'Tsh. 20,000/=',
        image: 'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 3,
        name: 'Ultrasonic sensor',
        description: 'Distance sensor.',
        price: 'Tsh. 10,000/=',
        image: 'https://m.media-amazon.com/images/I/612VzpvhpjL._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 4,
        name: 'Servo Motor',
        description: 'converts electrical power into mechanical power.',
        price: 'Tsh. 12,000/=',
        image: 'https://circuitdigest.com/sites/default/files/field/image/Servo-Motor.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 5,
        name: 'Node MCU',
        description: 'Wireless card.',
        price: 'Tsh. 20,000/=',
        image: 'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 6,
        name: 'Coin acceptor',
        description: 'Programmable acceptor.',
        price: 'Tsh. 90,000/=',
        image: 'https://cdn.sparkfun.com/assets/parts/7/6/9/6/11636-01.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 7,
        name: 'pH sensor',
        description: 'pH measuring calibrated sensor.',
        price: 'Tsh. 85,000/=',
        image: 'https://m.media-amazon.com/images/I/413J1PM5ueL._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 8,
        name: 'Crimping tool',
        description: 'UTP termination tool.',
        price: 'Tsh. 45,000/=',
        image: 'https://intellinetsolutions.com/cdn/shop/products/universal-modular-plug-crimping-tool-211048-1_aefec92a-7edb-49b1-92bb-fa06e1389ed7.jpg?v=1678692447',
        whatsapp: '1234567890',
        phone: '1234567890'
    },
    {
        id: 9,
        name: 'Node MCU',
        description: 'Wireless card.',
        price: 'Tsh. 20,000/=',
        image: 'https://m.media-amazon.com/images/I/61UOyRccN0L._AC_UF1000,1000_QL80_.jpg',
        whatsapp: '1234567890',
        phone: '1234567890'
    },

]);
</script>

<style scoped>
.featured-products {
    background-color: #f9fafb;
}

.product-card img {
    height: 300px;
}

.product-card h3 {
    color: #1a202c;
}

.product-card p {
    color: #4a5568;
}

.product-card span {
    color: #1a202c;
}


.truncate {
    max-height: 3.6rem;
    /* Adjust as needed */
    overflow: hidden;
    text-overflow: ellipsis;
}

.line-clamp-3 {
    /* TailwindCSS utility class for limiting lines */
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.pagination-btn {
    padding: 8px 16px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.pagination-btn:hover {
    background-color: #16a34a;
    color: #ffffff;
}
</style>
