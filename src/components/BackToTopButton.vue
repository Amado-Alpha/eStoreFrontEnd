<template>
    <div>
        <button v-if="isVisible" @click="scrollToTop"
            class="fixed bottom-5 right-5 p-4 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-center z-50">
            <i class="fas fa-arrow-up text-xl"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isVisible = ref(false);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

const toggleVisibility = () => {
    isVisible.value = window.scrollY > 300;
};

onMounted(() => {
    window.addEventListener('scroll', toggleVisibility);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', toggleVisibility);
});
</script>

<style scoped>
/* Additional styles if needed */
</style>