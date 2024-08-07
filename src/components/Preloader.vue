<template>
    <div class="fixed inset-0 flex flex-col items-center justify-center bg-white z-50" v-if="loading">
        <img :src="logo" alt="Company Logo" class="w-24 h-24 animate-flip" />
        <p class="text-gray-900 animate-pulse">Loading...</p>
    </div>
</template>

<script setup>

const props = defineProps({
    loading: Boolean,
    logo: String,
});
</script>

<style scoped>
@keyframes flip {
    0% {
        transform: rotateY(0);
    }

    100% {
        transform: rotateY(360deg);
    }
}

.animate-flip {
    animation: flip 2s infinite;
}
</style>