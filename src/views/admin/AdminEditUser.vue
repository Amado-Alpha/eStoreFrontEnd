<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Edit User Details</h2>
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
                    <input v-model="password" id="password" type="password" placeholder="Password"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label class="block mb-1 text-gray-600" for="password_confirmation">Confirm Password</label>
                    <input v-model="password_confirmation" id="password_confirmation" type="password"
                        placeholder="Confirm Password"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">Passwords do not match</p>
                    <p v-if="passwordTooShort" class="text-red-500 text-sm mt-1">Password must be at least 8 characters
                    </p>
                </div>
                <button type="submit" :disabled="isButtonDisabled"
                    class="w-full py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    :class="{ 'bg-indigo-600 hover:bg-indigo-700': !isButtonDisabled, 'bg-gray-400 cursor-not-allowed': isButtonDisabled }">
                    Update
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';

const router = useRouter();
const store = useStore();
const toast = useToast();

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

// Computed properties for password validation
const passwordMismatch = computed(() => {
    return password.value && password_confirmation.value && password.value !== password_confirmation.value;
});

const passwordTooShort = computed(() => {
    return password.value && password.value.length < 8;
});

// Computed property to determine if the submit button should be disabled
const isButtonDisabled = computed(() => {
    // If password fields are filled, check for password-related validations
    if (password.value || password_confirmation.value) {
        return !(password.value && password_confirmation.value && !passwordMismatch.value && !passwordTooShort.value);
    }
    return false;
});

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const userId = props.id;

const getUser = async () => {
    const user = await store.dispatch('users/getUser', userId);
    name.value = user.name;
    email.value = user.email;
}

const updateUser = async () => {
    try {
        const user = {
            name: name.value,
            email: email.value,
        };

        if (password.value) {
            user.password = password.value;
            user.password_confirmation = password_confirmation.value;
        }

        await store.dispatch('users/updateUser', { id: userId, user });
        toast.success('User updated successfully!');
        router.push('/admin/users');
    } catch (error) {
        console.error(error);
        toast.error('User update failed');
    }
};

onMounted(getUser);

</script>
