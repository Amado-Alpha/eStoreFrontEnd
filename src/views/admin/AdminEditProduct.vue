<template>
    <!-- Product form -->
    <div class="container mx-auto font-roboto">
        <div class="md:w-1/2 mx-auto">
            <form @submit.prevent="updateProduct" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

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
const productName = ref('');
const productDescription = ref('');
const productPrice = ref('');
const productCategory = ref('');
const imageUploadInput = ref(null);


const categories = computed(() => store.state.categories.categories);
const uploading = computed(() => store.state.products.uploading);
const uploadError = computed(() => store.state.products.uploadError);
const uploadSuccess = computed(() => store.state.products.uploadSuccess);


const fetchProducts = () => store.dispatch('products/fetchProducts');
const fetchCategories = () => store.dispatch('categories/fetchCategories');

// Retrieving product id from route via props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const productId = props.id;



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

const uploadImage = async () => {
    if (!image.value) return;

    try {
        const imageUrlFromCloudinary = await store.dispatch('products/uploadImage', image.value);

        if (imageUrlFromCloudinary) {
            const product = {
                name: productName.value,
                description: productDescription.value,
                price: productPrice.value,
                categoryName: productCategory.value,
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

            //Adding product to the state
            await store.dispatch('products/addProduct', product);
        }
    } catch (error) {
        console.error(error);
    }
};

const updateProduct = async () => {
    uploading.value = true;
    try {
        // const imageUrlFromCloudinary = await store.dispatch('projects/uploadImage', image.value);
        if (image.value) {
            const imageUrlFromCloudinary = await store.dispatch('products/uploadImage', image.value);
            const product = {
                name: productName.value,
                description: productDescription.value,
                price: productPrice.value,
                imageUrl: imageUrlFromCloudinary,
                categoryId: productCategory.value
            };

            // console.log('Edit product PAYLOAD:', product);
            await store.dispatch('products/updateProduct', { id: productId, product });

            uploadSuccess.value = true;
            // router.push({ name: 'admin.products' });
        }
        // A user might not need to update an image
        else {


            const currentProduct = await store.dispatch('products/getProduct', productId);

            const product = {
                name: productName.value,
                description: productDescription.value,
                price: productPrice.value,
                imageUrl: currentProduct.imageUrl,
                categoryId: productCategory.value
            };

            console.log('Product to be added:', product);
            await store.dispatch('products/updateProduct', { id: productId, product });
            uploadSuccess.value = true;
            // router.push({ name: 'admin.projects' });
        }
    } catch (error) {
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