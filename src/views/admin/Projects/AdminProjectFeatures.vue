<template>
    <div class="px-8">
        <!-- Products table -->
        <div class="container mx-auto p-4 font-roboto">
            <h2 ref="tableTopPosition" class="text-2xl font-bold mb-8 text-center text-gray-700">PRODUCTS</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-left rtl:text-right">
                    <thead class="bg-green-600 text-gray-200 uppercase">
                        <tr>
                            <th class="py-3 px-4 border-b">Description</th>
                            <th class="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="paginatedFeatures.length === 0">
                            <td colspan="5" class="py-3 px-4 border-b text-center text-gray-500">
                                No data yet
                            </td>
                        </tr>
                        <tr v-for="feature in paginatedFeatures" :key="feature.id"
                            class="hover:bg-gray-100 odd:bg-gray-100 even:bg-green-100">
                            <td class="py-3 px-4 border-b">{{ feature.name }}</td>
                            <td class="py-3 px-4 border-b">{{ feature.feature.name }}</td>
                            <td class="py-3 px-4 border-b">
                                <router-link :to="{ name: 'admin.edit-feature', params: { id: feature.id } }"
                                    class="bg-blue-600 text-white py-1 px-2 rounded-md mr-2 shadow-md hover:bg-blue-700">
                                    <i class="fa-solid fas fa-edit"></i>
                                </router-link>
                                <button @click="openDeleteModal(feature.id)"
                                    class="bg-red-600 text-white py-1 px-2 rounded-md shadow-md hover:bg-red-700">
                                    <i class="fa-solid fas fa-trash"></i>
                                </button>
                                <DeleteConfirmationModal :isOpen="showDeleteModal" @close="showDeleteModal = false"
                                    @confirm="confirmDelete" />
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

        <!-- Feature form -->
        <div class="container mx-auto font-roboto">
            <div class="md:w-1/2 mx-auto">
                <form @submit.prevent="saveFeature" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Feature description</label>
                        <input v-model="featureDescription" type="text" placeholder="eg. Speech recognition" required
                            id="name"
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

const store = useStore();
const toast = useToast();
const featureDesription = ref('');

// Computed properties
const features = computed(() => store.state.features.features);
const uploading = computed(() => store.state.products.uploading);

// Store dispatches
const fetchFeatures = () => store.dispatch('features/fetchFeatures');


/**
 * TABLE LOGIC 
 */
const currentPage = ref(1);
const itemsPerPage = ref(3);
const tableTopPosition = ref(null);

const paginatedFeatures = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return features.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(features.value.length / itemsPerPage.value);
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
 * DELETE FEATURE
 */
const categoryIdToDelete = ref(null);
const showDeleteModal = ref(false);

const openDeleteModal = (projectId) => {
    categoryIdToDelete.value = projectId;
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        await store.dispatch('features/deleteCategory', categoryIdToDelete.value);
        showDeleteModal.value = false;
        toast.success('Feature deleted successfully!');
    } catch (error) {
        console.error('Failed to delete feature:', error);
        toast.error('Failed to delete feature');
    }
};


/**
 * FEATURE FORM LOGIC
 */

const saveFeature = async () => {

    try {
        const feature = {
            name: featureDesription.value,
        };
        //Resetting form
        featureDesription.value = '';

        await store.dispatch('features/addFeature', feature);
        toast.success('Feature created successfully!');

    } catch (error) {
        console.error(error);
        toast.error('failed to create to feature!');
    }
};


onMounted(() => {
    fetchFeatures();
});

</script>
