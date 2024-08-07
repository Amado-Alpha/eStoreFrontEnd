<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Edit user details</h2>
            <form @submit.prevent="updateUser" class="space-y-6">
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
                    class="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Register</button>
            </form>
        </div>
    </div>
</template>


<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

// Retrieving project id from route via props
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const userId = props.id;

const getUser = async () => {
    const user = await store.dispatch('users/getUser', userId);
    console.log(user)
    console.log('User name:', user.name);
    console.log('User email:', user.email);
    name.value = user.name;
    email.value = user.email;
}


const updateUser = async () => {
    try {
        const user = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        };
        await store.dispatch('users/updateUser', user);
        alert('User registered successfully!');
        router.push('/login');
    } catch (error) {
        console.error(error);
        alert('Registration failed');
    }
};

onMounted(
    getUser
);

</script>