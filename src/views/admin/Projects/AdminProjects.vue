<template>
    <div class="px-8">
        <!-- Projects table -->
        <div class="container mx-auto p-4 font-roboto">

            <div class="overflow-x-auto">
                <h2 ref="tableTopPosition" class="text-2xl text-gray-700 font-bold mb-8 text-center">PROJECTS</h2>

                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-left rtl:text-right">
                    <thead class="bg-green-600 text-gray-200 uppercase">
                        <tr>
                            <th class="py-3 px-4 text-left">Title</th>
                            <th class="py-3 px-4 text-left">Description</th>
                            <th class="py-3 px-4 text-left">Image</th>
                            <th class="py-3 px-4 text-left">Features</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="paginatedProjects.length === 0">
                            <td colspan="5" class="py-4 px-4 text-center text-gray-500">
                                No data yet
                            </td>
                        </tr>
                        <tr v-for="project in paginatedProjects" :key="project.id"
                            class="border-b border-gray-200 hover:bg-gray-100 odd:bg-gray-100 even:bg-green-100">
                            <td class="py-4 px-4">{{ project.title }}</td>
                            <td class="py-4 px-4">
                                <div class="relative group">
                                    <span class="truncate block max-w-xs">
                                        {{ project.description.length > 30 ? project.description?.slice(0, 30) + '...' :
                                            project.description }}
                                    </span>
                                    <div
                                        class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg w-64 max-h-32 overflow-y-auto">
                                        {{ project.description }}
                                    </div>
                                </div>
                            </td>
                            <td class="py-4 px-4 relative group">
                                <img :src="project.imageUrl" alt="project image" class="h-16 w-16 object-cover" />
                                <div
                                    class="absolute top-0 left-0 hidden group-hover:block bg-white border border-gray-300 p-1 z-10">
                                    <img :src="project.imageUrl" alt="project image"
                                        class="h-full w-full object-cover" />
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <div class="relative group">
                                    <span class="truncate block max-w-xs">
                                        {{ project.features && project.features.length > 0 ?
                                            project.features[0].description?.slice(0, 30) +
                                            (project.features.length > 1 ? '...' : '') : 'No features' }}
                                    </span>
                                    <div
                                        class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg w-64 max-h-32 overflow-y-auto">
                                        {{ project.features.map(f => f.description).join(', ') }}
                                    </div>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <router-link :to="{ name: 'admin.edit-project', params: { id: project.id } }"
                                    class="bg-blue-600 text-white py-1 px-2 rounded-md mr-2 shadow-md hover:bg-blue-700">
                                    <i class="fa-solid fas fa-edit"></i>
                                </router-link>
                                <button @click="openDeleteModal(project.id)"
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
                    <nav aria-label="Page navigation">
                        <ul class="inline-flex items-center space-x-2">
                            <li>
                                <button @click="prevPage" :disabled="currentPage === 1"
                                    class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50">Previous</button>
                            </li>
                            <li v-for="page in totalPages" :key="page">
                                <button @click="goToPage(page)"
                                    :class="currentPage === page ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="px-3 py-2 rounded-md hover:bg-gray-300">
                                    {{ page }}
                                </button>
                            </li>
                            <li>
                                <button @click="nextPage" :disabled="currentPage === totalPages"
                                    class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Projects form -->
        <div class="container mx-auto mt-8 font-roboto">
            <div class="md:w-1/2 mx-auto">
                <form @submit.prevent="saveProject" class="bg-white shadow-lg rounded-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-700 mb-6 text-center"> Add new project
                    </h2>
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
                                    <button @click="removeFeature(feature)"
                                        class="ml-2 text-blue-600 hover:text-blue-800">
                                        &times;
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="uploadInput" class="block text-gray-700 text-sm font-bold mb-2">Upload your image
                            here</label>
                        <input @change="onFileChange" type="file" placeholder="Choose an image" required
                            ref="imageUploadInput" name="file" id="uploadInput"
                            class="w-full border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <div class="text-center">
                        <button type="submit"
                            class="bg-green-600 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
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

const toast = useToast();
const store = useStore();

// Form variables
const image = ref(null);
const projectTitle = ref('');
const projectDescription = ref('');
const selectedFeatures = ref([]);
const imageUploadInput = ref(null);


// Computed properties
const projects = computed(() => store.state.projects.projects);
const features = computed(() => store.state.features.features);
const uploading = computed(() => store.state.projects.uploading);

console.log('Projects computed:', projects.value)

const fetchProjects = async () => {
    const response = await store.dispatch('projects/fetchProjects');
    console.log('Projects resp.', response)
};

// const fetchProjects = () => store.dispatch('projects/fetchProjects');

// Store dispatches
const fetchFeatures = () => store.dispatch('features/fetchFeatures');


// Our server expects feature Ids so we prepare an array of IDs from each feature here.
const selectedFeatureIds = computed(() => {
    return selectedFeatures.value.map(feature => feature.id);
});

/**
 * FEATURE SEARCH LOGIC
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


/**
 * TABLE LOGIC
 */
const currentPage = ref(1);
const itemsPerPage = ref(12);
const tableTopPosition = ref(null);

const paginatedProjects = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return projects.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(projects.value.length / itemsPerPage.value);
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

const scrollToPosition = () => {
    if (tableTopPosition.value) {
        tableTopPosition.value.scrollIntoView({ behavior: 'smooth' });
    }
};


/**
 * PROJECT FORM LOGIC
 */
const onFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    image.value = files[0];
};

const saveProject = async () => {

    if (!image.value) return;

    try {
        const imageUrlFromCloudinary = await store.dispatch('projects/uploadImage', image.value);
        console.log('ImageFromCloudinary:', imageUrlFromCloudinary);
        if (imageUrlFromCloudinary) {
            const project = {
                title: projectTitle.value,
                description: projectDescription.value,
                imageUrl: imageUrlFromCloudinary,
                features: selectedFeatureIds.value
            };

            // Resetting form
            projectTitle.value = '';
            projectDescription.value = '';
            selectedFeatures.value = [];
            image.value = null;
            if (imageUploadInput.value) {
                imageUploadInput.value.value = '';
            }

            const response = await store.dispatch('projects/addProject', project);
            if (response.status === 201) {
                toast.success('Project created successfully!')
                fetchProjects();
            } else {
                console.error(error);
                toast.error('Failed to creat project!')
            }

        } else {
            toast.error('Failed to creat project!')
            console.error(error);
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed creating a project!')
    }
};

/**
 * DELETE PROJECT
 */
// Delete variables
const showDeleteModal = ref(false);
const projectIdToDelete = ref(null);
const warningMessage = ref('');

const openDeleteModal = (projectId) => {
    projectIdToDelete.value = projectId;
    warningMessage.value = "Are you want to delete this project ?"
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        const res = await store.dispatch('projects/deleteProject', projectIdToDelete.value);
        if (res.status === 204) {
            toast.success('Project deleted successful');
            fetchProjects();
        }
        showDeleteModal.value = false;
    } catch (error) {
        toast.error("Failed to delete project");
        console.error('Failed to delete project:', error);
    }
};




// Fetch data on component mount
onMounted(() => {
    fetchProjects();
    fetchFeatures();
});
</script>
