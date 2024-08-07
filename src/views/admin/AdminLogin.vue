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
                    class="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
            </form>
            <button @click="logout"
                class="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Logout</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../../services/authService';

const router = useRouter();

const email = ref('');
const password = ref('');

const login = async () => {
    try {
        const loginCredentials = {
            email: email.value,
            password: password.value
        };
        const response = await authService.login(loginCredentials);
        console.log('Token:', response.data.token);
        localStorage.setItem('auth_token', response.data.token);
        alert('Login successful!');
        router.push('/');
    } catch (error) {
        console.error(error);
        alert('Login failed');
    }
};

const logout = async () => {
    try {
        await authService.logout();
        alert('Logout successful!');
    } catch (error) {
        console.error('Error during logout', error);
    }
};


</script>