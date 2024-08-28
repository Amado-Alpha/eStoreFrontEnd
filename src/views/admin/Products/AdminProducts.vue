<template>
    <div class="px-8">
        <!-- Products table -->
        <div class="container mx-auto p-4 font-roboto">
            <h2 ref="tableTopPosition" class="text-2xl font-bold mb-8 text-center text-gray-700">PRODUCTS</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-left rtl:text-right">
                    <thead class="bg-green-600 text-gray-200 uppercase">
                        <tr>
                            <th class="py-3 px-4 border-b">Name</th>
                            <th class="py-3 px-4 border-b">Category</th>
                            <th class="py-3 px-4 border-b">Description</th>
                            <th class="py-3 px-4 border-b">Image</th>
                            <th class="py-3 px-4 border-b">Price</th>
                            <th class="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="paginatedProducts.length === 0">
                            <td colspan="5" class="py-3 px-4 border-b text-center text-gray-500">
                                No data yet
                            </td>
                        </tr>
                        <tr v-for="product in paginatedProducts" :key="product.id"
                            class="hover:bg-gray-100 odd:bg-gray-100 even:bg-green-100">
                            <td class="py-3 px-4 border-b">{{ product?.name }}</td>
                            <td class="py-3 px-4 border-b">{{ product?.category?.name }}</td>
                            <td class="py-3 px-4 border-b">
                                <div class="relative group">
                                    <span class="truncate max-w-xs block">
                                        {{ product?.description?.length > 30
                                            ? product?.description?.slice(0, 30) + '...'
                                            : product?.description
                                        }}
                                    </span>
                                    <div
                                        class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg w-64 max-h-32 overflow-y-auto">
                                        {{ product.description }}
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-4 border-b relative group">
                                <img :src="product.imageUrl" alt="product image" class="h-16 w-16 object-cover" />
                                <div
                                    class="absolute top-0 left-0 hidden group-hover:block bg-white border border-gray-300 p-1 z-10">
                                    <img :src="product.imageUrl" alt="product image"
                                        class="h-auto w-auto object-cover" />
                                </div>
                            </td>
                            <td class="py-3 px-4 border-b">{{ product.price }}</td>
                            <td class="py-3 px-4 border-b">
                                <router-link :to="{ name: 'admin.edit-product', params: { id: product.id } }"
                                    class="bg-blue-600 text-white py-1 px-2 rounded-md mr-2 shadow-md hover:bg-blue-700">
                                    <i class="fa-solid fas fa-edit"></i>
                                </router-link>
                                <button @click="openDeleteModal(product.id)"
                                    class="bg-red-600 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-700">
                                    <i class="fa-solid fas fa-trash"></i>
                                </button>
                                <DeleteConfirmationModal :isOpen="showDeleteModal" :warningMessage="warningMessage"
                                    @close="showDeleteModal = false" @confirm="confirmDelete" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center my-4">
                    <nav aria-label="Page navigation example">
                        <ul class="inline-flex -space-x-px text-sm">
                            <li>
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Previous
                                </button>
                            </li>
                            <li v-for="page in totalPages" :key="page">
                                <button @click="goToPage(page)"
                                    :class="{ 'text-white border-white bg-green-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': currentPage === page, 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': currentPage !== page }"
                                    class="flex items-center justify-center px-3 h-8 leading-tight border">
                                    {{ page }}
                                </button>
                            </li>
                            <li>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Product form -->
        <div class="container mx-auto font-roboto">
            <div class="md:w-1/2 mx-auto">
                <form @submit.prevent="saveProduct" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl font-bold text-gray-700 mb-6 text-center"> Add new product
                    </h2>
                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                        <input v-model="productName" type="text" placeholder="Enter product name" required id="name"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Product
                            Description</label>
                        <textarea v-model="productDescription" placeholder="Enter product description" required
                            id="description"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Product Price</label>
                        <input v-model="productPrice" type="number" placeholder="Enter product price" required
                            id="price"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Product
                            Category</label>
                        <select v-model="productCategory" required id="category"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option v-for="category in categories" :key="category.id" :value="category.id">{{
                                category.name }}</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label for="uploadInput" class="block text-gray-700 text-sm font-bold mb-2">Upload your image
                            here</label>
                        <input @change="onFileChange" type="file" placeholder="Choose an image" required
                            ref="imageUploadInput" name="file" id="uploadInput"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-6 text-center">
                        <button type="submit"
                            class="bg-green-600 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            {{ uploading ? 'Uploading...' : 'Submit' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <AdminFooter />
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue';
import AdminFooter from '../components/AdminFooter.vue';

// Third party variables 
const store = useStore();
const toast = useToast();

// Form variables
const image = ref(null);
const productName = ref('');
const productDescription = ref('');
const productPrice = ref('');
const productCategory = ref('');
const imageUploadInput = ref(null);


// Computed properties
const products = computed(() => store.state.products.products);
const categories = computed(() => store.state.categories.categories);
const uploading = computed(() => store.state.products.uploading);



// Store dispatches
const fetchProducts = () => store.dispatch('products/fetchProducts');
const fetchCategories = () => store.dispatch('categories/fetchCategories');

// const fetchProducts = async () => {
//     await store.dispatch('products/fetchProducts');
// }

/**
 * TABLE LOGIC 
 */
const currentPage = ref(1);
const itemsPerPage = ref(12);
const tableTopPosition = ref(null);

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return products.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(products.value.length / itemsPerPage.value);
});

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
    scrollToPosition();
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
    scrollToPosition();
};

const goToPage = (page) => {
    currentPage.value = page;
    scrollToPosition();
};

// Scroll to the top of the table on clicking the table navigation buttons
const scrollToPosition = function () {
    if (tableTopPosition.value) {
        const position = tableTopPosition.value.offsetTop;
        window.scrollTo({ top: position, behavior: 'smooth' });
    }
};

/**
 * PRODUCT FORM LOGIC
 */
const onFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    image.value = files[0];
};

const saveProduct = async () => {
    if (!image.value) return;

    try {
        const imageUrlFromCloudinary = await store.dispatch('products/uploadImage', image.value);

        if (imageUrlFromCloudinary) {
            const product = {
                name: productName.value,
                description: productDescription.value,
                price: productPrice.value,
                categoryId: productCategory.value,
                imageUrl: imageUrlFromCloudinary
            };

            //Resetting form
            productName.value = '';
            productDescription.value = '';
            productPrice.value = '';
            productCategory.value = '';
            image.value = null;
            if (imageUploadInput.value) {
                imageUploadInput.value.value = '';
            }


            const response = await store.dispatch('products/addProduct', product);
            if (response.status === 201) {
                toast.success('Product created successfully!');
                //Immidiately updating the state after saving.
                fetchProducts();
            } else {
                toast.error('failed to create to product!');
            }

        } else {
            toast.error('Failed, are you connected to internet?');
        }
    } catch (error) {
        console.error(error);
        toast.error('failed to create to product!');
    }
};



/**
 * DELETE PROJECT
 */
const productIdToDelete = ref(null);
const showDeleteModal = ref(false);
const warningMessage = ref('');

const openDeleteModal = (productId) => {
    productIdToDelete.value = productId;
    showDeleteModal.value = true;
    warningMessage.value = "Are you sure you want to delete this product?"
};

const confirmDelete = async () => {
    try {
        const res = await store.dispatch('products/deleteProduct', productIdToDelete.value);
        if (res.status === 204) {
            toast.success('Product deleted successfully!');
            fetchProducts();
        }
        showDeleteModal.value = false;
    } catch (error) {
        console.error('Failed to delete product:', error);
        toast.error('Failed to delete product');
        showDeleteModal.value = false;
    }
};



onMounted(() => {
    fetchCategories();
    fetchProducts();
});

</script>
