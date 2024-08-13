<template>
    <div class="px-8">
        <!-- Products table -->
        <div class="container mx-auto p-4 font-roboto">
            <h2 ref="tableTopPosition" class="text-2xl font-bold mb-8 text-center text-gray-700">TESTIMONIALS</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-left rtl:text-right">
                    <thead class="bg-green-600 text-gray-200 uppercase">
                        <tr>
                            <th class="py-3 px-4 border-b">Name</th>
                            <th class="py-3 px-4 border-b">Image</th>
                            <th class="py-3 px-4 border-b">Company</th>
                            <th class="py-3 px-4 border-b">Position</th>
                            <th class="py-3 px-4 border-b">Testimonial</th>
                            <th class="py-3 px-4 border-b">Rating</th>
                            <th class="py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="paginatedTestimonials.length === 0">
                            <td colspan="5" class="py-3 px-4 border-b text-center text-gray-500">
                                No data yet
                            </td>
                        </tr>
                        <tr v-for="testimonial in paginatedTestimonials" :key="testimonial.id"
                            class="hover:bg-gray-100 odd:bg-gray-100 even:bg-green-100">
                            <td class="py-3 px-4 border-b">{{ testimonial.authorFirstname + ' ' +
                                testimonial.authorSurname
                                }}
                            </td>
                            <td class="py-3 px-4 border-b relative group">
                                <img :src="testimonial.imageUrl" alt="testimonial image"
                                    class="h-16 w-16 object-cover" />
                                <div
                                    class="absolute top-0 left-0 hidden group-hover:block bg-white border border-gray-300 p-1 z-10">
                                    <img :src="testimonial.imageUrl" alt="testimonial image"
                                        class="h-auto w-auto object-cover" />
                                </div>
                            </td>
                            <td class="py-3 px-4 border-b">{{ testimonial.company }}</td>
                            <td class="py-3 px-4 border-b">{{ testimonial.position }}</td>
                            <td class="py-3 px-4 border-b">
                                <div class="relative group">
                                    <span class="truncate max-w-xs block">
                                        {{ testimonial.content.length > 30
                                            ? testimonial.content?.slice(0, 30) + '...'
                                            : testimonial.content
                                        }}
                                    </span>
                                    <div
                                        class="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg w-64 max-h-32 overflow-y-auto">
                                        {{ testimonial.content }}
                                    </div>
                                </div>
                            </td>

                            <td class="py-3 px-4 border-b">{{ testimonial.rating }}</td>
                            <td class="py-3 px-4 border-b">
                                <router-link :to="{ name: 'admin.edit-testimonial', params: { id: testimonial.id } }"
                                    class="bg-blue-600 text-white py-1 px-2 rounded-md mr-2 shadow-md hover:bg-blue-700">
                                    <i class="fa-solid fas fa-edit"></i>
                                </router-link>
                                <button @click="openDeleteModal(testimonial.id)"
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
                <form @submit.prevent="saveTestimonial" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl font-bold text-gray-700 mb-6 text-center"> Add new testimonial
                    </h2>
                    <div class="mb-4">
                        <label for="iirstname" class="block text-gray-700 text-sm font-bold mb-2">Author
                            Firstname</label>
                        <input v-model="authorFirstname" type="text" placeholder="Author's Firstname" required id="name"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="surname" class="block text-gray-700 text-sm font-bold mb-2">Author Surname</label>
                        <input v-model="authorSurname" type="text" placeholder="Author's Surname" required id="name"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="company" class="block text-gray-700 text-sm font-bold mb-2">Company</label>
                        <input v-model="company" type="text" placeholder="Company name" required id="name"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="position" class="block text-gray-700 text-sm font-bold mb-2">Position</label>
                        <input v-model="position" type="text" placeholder="Position in company" required id="name"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Testimonial</label>
                        <textarea v-model="testimonialStatement" placeholder="Enter testimonial description" required
                            id="description"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="rating" class="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                        <input v-model="rating" type="number" placeholder="Rating (0-5)" required id="rating"
                            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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

// Components imports
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue';
import AdminFooter from '../components/AdminFooter.vue';

// Third party variables
const store = useStore();
const toast = useToast();

// Form variables
const image = ref(null);
const authorFirstname = ref('');
const authorSurname = ref('');
const testimonialStatement = ref('');
const rating = ref('');
const company = ref('');
const position = ref('');
const imageUploadInput = ref(null);

// Computed properties
const testimonials = computed(() => store.state.testimonials.testimonials);
const uploading = computed(() => store.state.testimonials.uploading);
const uploadError = computed(() => store.state.testimonials.uploadError);
const uploadSuccess = computed(() => store.state.testimonials.uploadSuccess);

// Store dispatches
const fetchTestimonials = () => store.dispatch('testimonials/fetchTestimonials');


/**
 * TABLE LOGIC 
 */
const currentPage = ref(1);
const itemsPerPage = ref(3);
const tableTopPosition = ref(null);

// Pagination
const paginatedTestimonials = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return testimonials.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(testimonials.value.length / itemsPerPage.value);
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
 * DELETE TESTIMONIAL
 */
const testimonialIdToDelete = ref(null);
const showDeleteModal = ref(false);
const warningMessage = ref('');

const openDeleteModal = (testimonialId) => {
    testimonialIdToDelete.value = testimonialId;
    warningMessage.value = "Are you sure you want to delete this testimonial ?"
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        await store.dispatch('testimonials/deleteProduct', testimonialIdToDelete.value);
        showDeleteModal.value = false;
        toast.success('Deleted successfully!')
    } catch (error) {
        console.error('Failed to delete testimonial:', error);
        toast.error('Failed to delete!');
    }
};


/**
 * TESTIMONIAL FORM LOGIC
 */
const onFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    image.value = files[0];
};

const saveTestimonial = async () => {
    if (!image.value) return;

    try {
        const imageUrlFromCloudinary = await store.dispatch('testimonials/uploadImage', image.value);

        if (imageUrlFromCloudinary) {
            const testimonial = {
                authorFirstname: authorFirstname.value,
                authorSurname: authorSurname.value,
                company: company.value,
                position: position.value,
                content: testimonialStatement.value,
                rating: rating.value,
                imageUrl: imageUrlFromCloudinary,
            };

            //Resetting form
            authorFirstname.value = '';
            authorSurname.value = '';
            company.value = '';
            position.value = '',
                testimonialStatement.value = '';
            rating.value = '';
            image.value = null;
            if (imageUploadInput.value) {
                imageUploadInput.value.value = '';
            }

            await store.dispatch('testimonials/addTestimonial', testimonial);
            toast.success('Testimonial created successfully!');
            fetchTestimonials();
        }
    } catch (error) {
        console.error(error);
        toast.error('Failed to create testimonial');
    }
};

onMounted(() => {
    fetchTestimonials();
});
</script>
