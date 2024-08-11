<template>
    <div class="container mx-auto mt-8 font-roboto">
        <div class="md:w-1/2 mx-auto">
            <form @submit.prevent="updateProject" class="bg-white shadow-lg rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-6 text-center">Edit project details</h2>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Project Title</label>
                    <input v-model="projectTitle" type="text" placeholder="Enter project title" required id="name"
                        class="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div class="mb-4">
                    <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Project
                        Description</label>
                    <textarea v-model="projectDescription" placeholder="Enter project description" required
                        id="description"
                        class="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                </div>
                <div class="mb-4 relative">
                    <label for="features" class="block text-gray-700 text-sm font-bold mb-2">Select Features</label>
                    <input v-model="searchTerm" @focus="openDropdown" type="text" placeholder="Search features..."
                        class="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <ul v-if="isDropdownOpen && filteredFeatures.length > 0"
                        class="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
                        <li v-for="feature in filteredFeatures" :key="feature.id" @click="toggleFeature(feature)"
                            class="cursor-pointer px-3 py-2 hover:bg-gray-100">
                            {{ feature.description }}
                            <span v-if="isFeatureSelected(feature)" class="text-green-600 float-right">✓</span>
                        </li>
                    </ul>
                    <div v-if="selectedFeatures.length > 0" class="mt-2">
                        <p class="text-gray-700 text-sm font-bold mb-1">Selected Features:</p>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="feature in selectedFeatures" :key="feature.id"
                                class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full border border-blue-300 flex items-center">
                                {{ feature.description }}
                                <button @click="removeFeature(feature)" class="ml-2 text-blue-600 hover:text-blue-800">
                                    &times;
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="uploadInput" class="block text-gray-700 text-sm font-bold mb-2">Upload your image
                        here</label>
                    <input @change="onFileChange" type="file" placeholder="Choose an image" ref="imageUploadInput"
                        name="file" id="uploadInput"
                        class="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                </div>
                <div class="text-center">
                    <button type="submit"
                        class="bg-green-600 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        {{ uploading ? 'Updating...' : 'Submit' }}
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
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import AdminFooter from '../components/AdminFooter.vue';

const store = useStore();
const router = useRouter();
const toast = useToast();

const projectTitle = ref('');
const projectDescription = ref('');
const selectedFeatures = ref([]);
const image = ref(null);

const uploading = ref(false);
const uploadError = ref(null);
const uploadSuccess = ref(false);

const features = computed(() => store.state.features.features);

// Retrieving project id from route via props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

// console.log('ID passed as props:', props.id)
const projectId = props.id;

const fetchProject = async () => {
    const project = await store.dispatch('projects/getProject', projectId);
    projectTitle.value = project.title;
    projectDescription.value = project.description;
    selectedFeatures.value = project.features.map(feature => feature);
};

// Store dispatches
const fetchFeatures = async () => {
    await store.dispatch('features/fetchFeatures');
}
const fetchProjects = async () => {
    store.dispatch('projects/fetchProjects');
}
/**
 * FEATURES FORM FIELD LOGIC
 */

const searchTerm = ref('');
const isDropdownOpen = ref(false);

const filteredFeatures = computed(() => {
    return features.value.filter(feature =>
        feature.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

const openDropdown = () => {
    isDropdownOpen.value = true;
    document.addEventListener('click', handleClickOutside);
};

const closeDropdown = () => {
    isDropdownOpen.value = false;
    document.removeEventListener('click', handleClickOutside);
};

const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
        closeDropdown();
    }
};

const toggleFeature = (feature) => {
    const index = selectedFeatures.value.findIndex(f => f.id === feature.id);
    if (index > -1) {
        selectedFeatures.value.splice(index, 1);
    } else {
        console.log('FEATURE TO BE ADDED:', feature)
        selectedFeatures.value.push(feature);
        console.log(`Feature added: ${feature.description}`);
    }
    closeDropdown();
};

const isFeatureSelected = (feature) => {
    return selectedFeatures.value.some(f => f.id === feature.id);
};

const removeFeature = (feature) => {
    const index = selectedFeatures.value.findIndex(f => f.id === feature.id);
    if (index > -1) {
        selectedFeatures.value.splice(index, 1);
    }
};

// Our server expects feature Ids so we prepare an array of IDs from each feature here.
const selectedFeaturesIds = computed(() => {
    return selectedFeatures.value.map(feature => feature.id);
});



const onFileChange = (event) => {
    image.value = event.target.files[0];
};

const updateProject = async () => {
    uploading.value = true;
    try {
        // const imageUrlFromCloudinary = await store.dispatch('projects/uploadImage', image.value);
        if (image.value) {
            const imageUrlFromCloudinary = await store.dispatch('projects/uploadImage', image.value);
            const project = {
                title: projectTitle.value,
                description: projectDescription.value,
                imageUrl: imageUrlFromCloudinary,
                features: selectedFeaturesIds.value
            };

            // console.log('Edit project PAYLOAD:', project);
            await store.dispatch('projects/updateProject', { id: projectId, project });
            uploadSuccess.value = true;
            toast.success('Project updated successfully');
            router.push({ name: 'admin.projects' });
        }
        // A user might not need to update an image
        else {
            // const currentProject = await store.dispatch('projects/getProject', projectId);
            const project = {
                title: projectTitle.value,
                description: projectDescription.value,
                features: selectedFeaturesIds.value
            };

            // console.log('Project to be added:', project);
            await store.dispatch('projects/updateProject', { id: projectId, project });
            uploadSuccess.value = true;
            toast.success('Project updated succesfully');
            router.push({ name: 'admin.projects' });
        }
    } catch (error) {
        uploadError.value = 'An error occurred while updating the project.';
        toast.error('Project updating failed!');
        console.error(error);
    } finally {
        uploading.value = false;
    }
}

// Fetch features and project details on component mount
onMounted(() => {
    fetchFeatures();
    fetchProject();
    fetchProjects();
});
</script>