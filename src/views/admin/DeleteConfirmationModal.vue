<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-8">
            <div class="p-4 border-b">
                <h3 class="text-lg font-medium">Confirm Deletion</h3>
            </div>
            <div class="p-4">
                <p>Are you sure you want to delete this project?</p>
            </div>
            <div class="p-4 border-t flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <button @click="cancel"
                    class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">Cancel</button>
                <button @click="confirm"
                    class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(['close', 'confirm']);

const cancel = () => emit('close');
const confirm = () => emit('confirm');
</script>