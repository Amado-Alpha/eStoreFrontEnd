<template>
    <div class="px-8">
        <!-- Products table -->
        <div class="container mx-auto p-4 font-roboto">
            <h2 ref="tableTopPosition" class="text-2xl font-bold mb-8 text-center text-gray-700">PRODUCTS' CATEGORIES
            </h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-left rtl:text-right">
                    <thead class="bg-green-600 text-gray-200 uppercase">
                        <tr>
                            <th class="py-3 px-4 border-b">Name</th>
                            <th class="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="paginatedProducts.length === 0">
                            <td colspan="5" class="py-3 px-4 border-b text-center text-gray-500">
                                No data yet
                            </td>
                        </tr>
                        <tr v-for="category in paginatedProducts" :key="category.id"
                            class="hover:bg-gray-100 odd:bg-gray-100 even:bg-green-100">
                            <td class="py-3 px-4 border-b">{{ category.name }}</td>
                            <td class="py-3 px-4 border-b">
                                <router-link :to="{ name: 'admin.edit-category', params: { id: category.id } }"
                                    class="bg-blue-600 text-white py-1 px-2 rounded-md mr-2 shadow-md hover:bg-blue-700">
                                    <i class="fa-solid fas fa-edit"></i>
                                </router-link>
                                <button @click="openDeleteModal(category.id)"
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

        <!-- Category form -->
        <div class="container mx-auto font-roboto">
            <div class="md:w-1/2 mx-auto">
                <form @submit.prevent="saveCategory" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl font-bold text-gray-700 mb-6 text-center"> Add new products' category
                    </h2>
                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                        <input v-model="categoryName" type="text" placeholder="Enter category name" required id="name"
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
const categoryName = ref('');

// Computed properties
const categories = computed(() => store.state.categories.categories);
const uploading = computed(() => store.state.products.uploading);

// Store dispatches
const fetchCategories = () => store.dispatch('categories/fetchCategories');


/**
 * TABLE LOGIC 
 */
const currentPage = ref(1);
const itemsPerPage = ref(12);
const tableTopPosition = ref(null);

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return categories.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(categories.value.length / itemsPerPage.value);
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
 * DELETE CATEGORY
 */
const categoryIdToDelete = ref(null);
const showDeleteModal = ref(false);
const warningMessage = ref('');

const openDeleteModal = (categoryId) => {
    categoryIdToDelete.value = categoryId;
    showDeleteModal.value = true;
    warningMessage.value = "Deleting this category will also delete all the products under this category, Do you still want to delete this category?"
};

const confirmDelete = async () => {
    try {
        console.log('ID', categoryIdToDelete.value)
        const res = await store.dispatch('categories/deleteCategory', categoryIdToDelete.value);
        if (res.status === 204) {
            toast.success('Category deleted successfully!');
            fetchCategories();
        } else {
            toast.error('Failed to delete category');
        }

        showDeleteModal.value = false;

        fetchCategories();
    } catch (error) {
        console.error('Failed to delete category:', error);
        showDeleteModal.value = false;
        toast.error('Failed to delete category');
    }
};


/**
 * PRODUCT FORM LOGIC
 */

const saveCategory = async () => {

    try {
        const category = {
            name: categoryName.value,
        };
        //Resetting form
        categoryName.value = '';

        const isCategoryUnique = await store.dispatch('categories/checkUniqueness', category.name);

        if (isCategoryUnique) {
            // Add the feature only if it's unique
            const response = await store.dispatch('categories/addCategory', category);

            if (response.status === 201) {
                toast.success('Category created successfully!');
                fetchCategories();
            } else {
                toast.error('Failed to create feature!');
            }
        } else {
            toast.error('Category already exists!');
        }
    } catch (error) {
        console.error(error);
        toast.error('failed to create to category!');
    }
};


onMounted(() => {
    fetchCategories();
});

</script>
