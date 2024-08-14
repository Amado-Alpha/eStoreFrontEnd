<template>
    <HeroSectionProductsPage />
    <section ref="productsTopPosition" class="featured-products bg-gray-100 mb-8">
        <div class="max-w-screen-xl mx-auto lg:px-12 px-4">
            <!-- Search and Filter -->
            <div class="flex flex-col lg:flex-row justify-between items-center mb-8">
                <!-- Search Input -->
                <input v-model="searchQuery" type="text" placeholder="Search products..."
                    class="search-input mb-4 lg:mb-0 lg:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out shadow-sm" />

                <!-- Category Filter -->
                <select v-model="selectedCategory"
                    class="category-select p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out shadow-sm lg:ml-4">
                    <option value="">All Categories</option>
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>

            <div v-if="filteredProducts.length === 0 && isSearchActive"
                class="flex flex-col items-center justify-center h-64 text-center">
                <img :src="oversight" alt="No products found" class="w-32 h-32 mb-4">
                <p class="text-lg font-semibold text-gray-700 mb-2">Oops! No products found.</p>
                <p class="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
            <!-- Product Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- <div v-for="(product, index) in paginatedProducts" :key="index" -->
                <div v-for="(product, index) in (filteredProducts.length > 0 ? filteredPaginatedProducts : paginatedProducts)"
                    :key="index"
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

            <!-- Pagination -->
            <div class="flex justify-center mt-4">
                <button v-if="currentPage > 1" @click="prevPage" class="pagination-btn">Previous</button>
                <button v-for="page in totalPages" :key="page" @click="gotoPage(page)"
                    :class="{ 'font-semibold': currentPage === page }" class="pagination-btn">
                    {{ page }}
                </button>
                <button v-if="currentPage < totalPages" @click="nextPage" class="pagination-btn">Next</button>
            </div>
        </div>
    </section>
</template>


<script setup>

import { ref, computed, watch } from 'vue';
import HeroAboutUs from '../components/HeroAboutUs.vue';
import { data } from '../constants';
import { oversight } from '../assets/icons';
import HeroSectionProductsPage from '../components/HeroSectionProductsPage.vue';

const searchQuery = ref('');
const selectedCategory = ref('');
const categories = ref(['Electronics', 'Computers', 'Tools']);
const products = ref(data.products);

/* 
    SEARCH LOGIC 
*/
const productsPerPage = 6;
const currentPage = ref(1);
const isSearchActive = ref(false);

/*

WATCHERS ARE THE BEST TOOLS TO TRACK THE STATE OF COMPUTED PROPERTIES
THIS IS VERY USEFULL IN DEBUGING AS THE CONSOLE IS BEING UPDATED IN REAL TIME

watch([searchQuery, selectedCategory], () => {
    console.log('Search Query:', searchQuery.value);
    console.log('Selected Category:', selectedCategory.value);
});



// Watchers to reset currentPage when search or filter changes
watch([currentPage], () => {
    console.log('CURRENT PAGE', currentPage.value);
});

*/


/*
    RETURNING THE USER TO THE PAGE HE WAS ON BEFORE PERFORMING A SEARCH
*/

const lastPageBeforeSearch = ref(1);

// Watch for changes in searchQuery
watch(searchQuery, (newQuery) => {
    if (newQuery) {
        if (!isSearchActive.value) {
            // Only set lastPageBeforeSearch if search is just starting
            lastPageBeforeSearch.value = currentPage.value;
            isSearchActive.value = true;
        }
        currentPage.value = 1;
    } else {
        if (isSearchActive.value) {
            currentPage.value = lastPageBeforeSearch.value;
            isSearchActive.value = false;
        }
    }
});

// Watch for changes in selectedCategory
watch(selectedCategory, (newCategory) => {
    if (newCategory) {
        if (!isSearchActive.value) {
            // Only set lastPageBeforeSearch if filter is just starting
            lastPageBeforeSearch.value = currentPage.value;
            isSearchActive.value = true;
        }
        currentPage.value = 1;
    } else {
        if (isSearchActive.value) {
            currentPage.value = lastPageBeforeSearch.value;
            isSearchActive.value = false;
        }
    }
});

// Filtered products
const filteredProducts = computed(() => {
    if (!searchQuery.value && !selectedCategory.value) {
        return [];
    }
    return products.value.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value;
        return matchesSearch && matchesCategory;
    });
});


const filteredPaginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * productsPerPage;
    const endIndex = currentPage.value * productsPerPage;
    return filteredProducts.value.slice(startIndex, endIndex);
});

const paginatedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * productsPerPage;
    const endIndex = currentPage.value * productsPerPage;
    return products.value.slice(startIndex, endIndex);
})

// Total pages for unfiltered products
const totalPagesUnfiltered = computed(() => Math.ceil(products.value.length / productsPerPage));

// Total pages for filtered products
const totalPagesFiltered = computed(() => Math.ceil(filteredProducts.value.length / productsPerPage));

watch(totalPagesFiltered, () => {
    console.log('Number of pages during search:', totalPagesFiltered.value);
})

// Total pages to use
const totalPages = computed(() => {
    return (searchQuery.value || selectedCategory.value) ? totalPagesFiltered.value : totalPagesUnfiltered.value;
});


const productsTopPosition = ref(null);

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

</script>

<style scoped>
.search-input,
.category-select {
    background-color: #f8f9fa;
}

.search-input::placeholder {
    color: #6b7280;
    /* Tailwind's gray-500 */
}

.search-input:focus,
.category-select:focus {
    border-color: #16a34a;
    /* Tailwind's green-600 */
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.3);
}


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
