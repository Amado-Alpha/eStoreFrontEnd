<template>
    <!-- Product form -->
    <div class="container mx-auto font-roboto">
        <div class="md:w-1/2 mx-auto">
            <form @submit.prevent="updateProduct" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 class="text-2xl font-bold text-gray-700 mb-6 text-center"> Edit product details
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
                    <input v-model="productPrice" type="number" placeholder="Enter product price" required id="price"
                        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Product Category</label>
                    <select v-model="productCategory" required id="category"
                        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{
                            category.name }}</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="uploadInput" class="block text-gray-700 text-sm font-bold mb-2">Upload your image
                        here</label>
                    <input @change="onFileChange" type="file" placeholder="Choose an image" ref="imageUploadInput"
                        name="file" id="uploadInput"
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

// Third party variables
const router = useRouter();
const toast = useToast();
const store = useStore();

// Form variables
const image = ref(null);
const productName = ref('');
const productDescription = ref('');
const productPrice = ref('');
const productCategory = ref('');
const imageUploadInput = ref(null);

// Notification variables
const uploadSuccess = ref(false);
const uploading = ref(false);
const uploadError = ref(null);

// Computed properties
const categories = computed(() => store.state.categories.categories);


// Retrieving product id from route via props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const productId = props.id;

// Store dispatches
const fetchProducts = () => store.dispatch('products/fetchProducts');
const fetchCategories = () => store.dispatch('categories/fetchCategories');

const fetchProduct = async () => {
    const product = await store.dispatch('products/getProduct', productId);
    // Pre-populating the form fields with data.
    productName.value = product.name;
    productDescription.value = product.description;
    productPrice.value = product.price;
    productCategory.value = product.category.id;
};

/**
 * PRODUCT FORM LOGIC
 */
const onFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    image.value = files[0];
};

const updateProduct = async () => {
    uploading.value = true;
    try {
        if (image.value) {
            const imageUrlFromCloudinary = await store.dispatch('products/uploadImage', image.value);
            const product = {
                name: productName.value,
                description: productDescription.value,
                price: productPrice.value,
                imageUrl: imageUrlFromCloudinary,
                categoryId: productCategory.value
            };

            await store.dispatch('products/updateProduct', { id: productId, product });
            toast.success('Product updated successfully!');
            uploadSuccess.value = true;
            router.push({ name: 'admin.products' });
        }
        // A user might not need to update an image
        else {
            const product = {
                name: productName.value,
                description: productDescription.value,
                price: productPrice.value,
                categoryId: productCategory.value
            };
            await store.dispatch('products/updateProduct', { id: productId, product });
            toast.success('Product updated successfully!');
            router.push({ name: 'admin.products' });
            uploadSuccess.value = true;
        }
    } catch (error) {
        toast.error('Failed to update product!');
        uploadError.value = 'An error occurred while updating the product.';
    } finally {
        uploading.value = false;
    }
}

onMounted(() => {
    fetchCategories();
    fetchProducts();
    fetchProduct();
});
</script>