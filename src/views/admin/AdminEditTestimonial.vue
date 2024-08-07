<template>
    <!-- Product form -->
    <div class="container mx-auto font-roboto">
        <div class="md:w-1/2 mx-auto">
            <form @submit.prevent="updateTestimonial" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div class="mb-4">
                    <label for="iirstname" class="block text-gray-700 text-sm font-bold mb-2">Author Firstname</label>
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
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {{ uploading ? 'Uploading...' : 'Upload!' }}
                    </button>
                    <p v-if="uploadError" class="text-red-500 text-xs italic mt-2">{{ uploadError }}</p>
                    <p v-if="uploadSuccess" class="text-green-500 text-xs italic mt-2">Image uploaded to Cloudinary!</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const image = ref(null);
const authorFirstname = ref('');
const authorSurname = ref('');
const testimonialStatement = ref('');
const rating = ref('');
const company = ref('');
const position = ref('');
const imageUploadInput = ref(null);

const uploading = computed(() => store.state.testimonials.uploading);
const uploadError = computed(() => store.state.testimonials.uploadError);
const uploadSuccess = computed(() => store.state.testimonials.uploadSuccess);

// Retrieving testimonial id from route via props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const testimonialId = props.id;



const fetchTestimonial = async () => {
    const testimonial = await store.dispatch('testimonials/getTestimonial', testimonialId);
    // Pre-populating the form fields with data.
    authorFirstname.value = testimonial.authorFirstname;
    authorSurname.value = testimonial.authorSurname;
    testimonialStatement.value = testimonial.content;
    company.value = testimonial.company;
    position.value = testimonial.position;
    rating.value = testimonial.rating;
};


/**
 * TESTIMONIAL FORM LOGIC
 */
const onFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    image.value = files[0];
};

const updateTestimonial = async () => {
    uploading.value = true;
    try {

        if (image.value) {
            const imageUrlFromCloudinary = await store.dispatch('testimonials/uploadImage', image.value);
            const testimonial = {
                authorFirstname: authorFirstname.value,
                authorSurname: authorSurname.value,
                company: company.value,
                position: position.value,
                content: testimonialStatement.value,
                rating: rating.value,
                imageUrl: imageUrlFromCloudinary,
            };

            // console.log('Edit testimonial PAYLOAD:', testimonial);
            await store.dispatch('testimonials/updateTestimonial', { id: testimonialId, testimonial });

            uploadSuccess.value = true;
            // router.push({ name: 'admin.testimonials' });
        }
        // A user might not need to update an image
        else {


            const currentTestimonial = await store.dispatch('testimonials/getTestimonial', testimonialId);
            const testimonial = {
                authorFirstname: authorFirstname.value,
                authorSurname: authorSurname.value,
                company: company.value,
                position: position.value,
                content: testimonialStatement.value,
                rating: rating.value,
                imageUrl: currentTestimonial.imageUrl,
            };
            console.log('Product to be added:', testimonial);
            await store.dispatch('testimonials/updateTestimonial', { id: testimonialId, testimonial });
            uploadSuccess.value = true;
            // router.push({ name: 'admin.projects' });
        }
    } catch (error) {
        uploadError.value = 'An error occurred while updating the testimonial.';
    } finally {
        uploading.value = false;
    }
}


onMounted(() => {
    fetchTestimonial();
});
</script>
