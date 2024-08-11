<template>
    <!-- Projects table -->
    <div class="container mx-auto p-4 font-roboto">
        <h2 ref="tableTopPosition" class="text-2xl font-bold mb-8 text-center text-gray-700">ADMINS</h2>
        <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr class="bg-green-600 text-white uppercase">
                        <th class="py-3 px-4 text-left">Name</th>
                        <th class="py-3 px-4 text-left">Email</th>
                        <th class="py-3 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="paginatedUsers.length === 0">
                        <td colspan="5" class="py-4 px-4 text-center text-gray-500">
                            No data yet
                        </td>
                    </tr>
                    <tr v-for="user in paginatedUsers" :key="user.id"
                        class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-4 px-4">{{ user.name }}</td>
                        <td class="py-4 px-4">{{ user.email }}</td>
                        <td class="py-4 px-4">
                            <router-link :to="{ name: 'admin.edit-user', params: { id: user.id } }"
                                class="bg-blue-600 text-white py-1 px-2 rounded-md mr-2 shadow-md hover:bg-blue-700">
                                <i class="fa-solid fas fa-edit"></i>
                            </router-link>
                            <button @click="openDeleteModal(user.id)"
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
    <AdminRegister />
    <AdminFooter />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue';
import AdminRegister from './AdminRegister.vue';
import AdminFooter from '../components/AdminFooter.vue';

const toast = useToast();
const store = useStore();

const userName = ref('');
const email = ref('');
const showDeleteModal = ref(false);
const userIdToDelete = ref(null);


const users = computed(() => store.state.users.users);

// console.log(users.value);


const fetchUsers = () => store.dispatch('users/fetchUsers');

const currentPage = ref(1);
const itemsPerPage = ref(5);
const tableTopPosition = ref(null);

/**
 * TABLE LOGIC
 */

// Pagination
const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    // console.log(users.value)
    return users.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(users.value.length / itemsPerPage.value);
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
 * DELETE USER
 */
const openDeleteModal = (userId) => {
    userIdToDelete.value = userId;
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    try {
        await store.dispatch('users/deleteUser', userIdToDelete.value);
        showDeleteModal.value = false;
        toast.success('User deleted successfully.');
        fetchUsers();
    } catch (error) {
        showDeleteModal.value = false;
        toast.error('Failed to delete user');
        console.error('Failed to delete user:', error);
    }
};


// Fetch data on component mount
onMounted(() => {
    fetchUsers();
});
</script>
