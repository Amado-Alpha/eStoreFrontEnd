<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-600">Register new admin</h2>
            <form @submit.prevent="registerUser" class="space-y-6">
                <div>
                    <label class="block mb-1 text-gray-600" for="name">Name</label>
                    <input v-model="name" id="name" type="text" placeholder="Name" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
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
                <div>
                    <label class="block mb-1 text-gray-600" for="password_confirmation">Confirm Password</label>
                    <input v-model="password_confirmation" id="password_confirmation" type="password"
                        placeholder="Confirm Password" required
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button type="submit"
                    class="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">Register</button>
            </form>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');


const registerUser = async () => {
    try {
        const user = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        };
        await store.dispatch('users/register', user);
        alert('User registered successfully!');
        router.push({ name: 'admin.users' });
    } catch (error) {
        console.error(error);
        alert('Registration failed');
    }
};

</script>