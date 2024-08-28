<template>

    <div class="flex flex-col min-h-screen">
        <!-- Project feature form -->
        <div class="flex-grow">
            <div class="container mx-auto font-roboto">
                <div class="md:w-1/2 mx-auto">
                    <form @submit.prevent="updateFeature" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 class="text-2xl font-bold mb-8 text-center text-gray-700">Edit projects' feature details
                        </h2>
                        <div class="mb-4">
                            <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Feature</label>
                            <input v-model="featureDescription" type="text"
                                placeholder="Enter brief feature description name" required id="name"
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
        </div>
        <AdminFooter />
    </div>
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


const featureDescription = ref('');
const uploading = ref(false);


// Retrieving feature id from route via props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const featureId = props.id;

// Store dispatches
const fetchFeature = async () => {
    const feature = await store.dispatch('features/getFeature', featureId);
    // Pre-populating the form fields with data.
    featureDescription.value = feature.description;

};

/**
 * CATEGORY FORM LOGIC
 */
const updateFeature = async () => {
    uploading.value = true;
    try {
        const feature = {
            description: featureDescription.value,
        };

        const response = await store.dispatch('features/updateFeature', { id: featureId, feature });
        if (response.status === 200) {
            toast.success('Project updated successfully!');
            router.push({ name: 'admin.features' });
        } else {
            toast.error('Failed to update feature!')
        }

    } catch (error) {
        toast.error('Failed to update feature!');
        console.error(error);
    } finally {
        uploading.value = false;
    }
}

onMounted(() => {
    fetchFeature();
});
</script>