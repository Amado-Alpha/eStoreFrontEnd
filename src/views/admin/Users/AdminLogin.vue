<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
            <form @submit.prevent="login" class="space-y-6">
                <div>
                    <label class="block mb-1 text-gray-600" for="email">Email</label>
                    <input v-model="email" id="email" type="email" placeholder="Email" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label class="block mb-1 text-gray-600" for="password">Password</label>
                    <input v-model="password" id="password" type="password" placeholder="Password" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button type="submit"
                    class="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">Login</button>
            </form>
        </div>
    </div>
    <AdminFooter />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

import AdminFooter from '../components/AdminFooter.vue';

const toast = useToast();
const store = useStore();
const router = useRouter();


console.log('AuthToken:', store.state.users.authToken)
const email = ref('');
const password = ref('');

const login = async () => {
    try {
        const loginCredentials = {
            email: email.value,
            password: password.value
        };
        await store.dispatch('users/login', loginCredentials);
        toast.success('Login successful!');
        router.push({ name: 'admin.home' });
    } catch (error) {
        console.error(error);
        toast.error('Login failed');
    }
};

</script>