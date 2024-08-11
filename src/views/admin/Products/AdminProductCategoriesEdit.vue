<template>
    <!-- Product form -->
    <div class="container mx-auto font-roboto">
        <div class="md:w-1/2 mx-auto">
            <form @submit.prevent="updateCategory" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                    <input v-model="categoryName" type="text" placeholder="Enter category name" required id="name"
                        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-6 text-center">
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {{ uploading ? 'Uploading...' : 'Submit' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
    <AdminFooter />
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

import AdminFooter from '../components/AdminFooter.vue';

const router = useRouter();
const toast = useToast();
const store = useStore();


const categoryName = ref('');
const uploading = ref(false);


// Retrieving category id from route via props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const categoryId = props.id;

// Store dispatches
const fetchCategory = async () => {
    const category = await store.dispatch('categories/getCategory', categoryId);
    // Pre-populating the form fields with data.
    categoryName.value = category.name;

};

/**
 * CATEGORY FORM LOGIC
 */
const updateCategory = async () => {
    uploading.value = true;
    try {
        const category = {
            name: categoryName.value,
        };

        await store.dispatch('categories/updateCategory', { id: categoryId, category });
        toast.success('Product updated successfully!');
        uploadSuccess.value = true;
        router.push({ name: 'admin.categories' });

    } catch (error) {
        toast.error('Failed to update category!');
        uploadError.value = 'An error occurred while updating the category.';
    } finally {
        uploading.value = false;
    }
}

onMounted(() => {
    fetchCategory();
});
</script>