<template>
    <main class="">
        <Preloader :loading="loading" :logo="companyLogo" />
        <section class="mb-12">
            <TheNavBar />
        </section>

        <router-view />

        <section class="">
            <TheFooter />
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TheNavBar from '../components/TheNavBar.vue';
import TheFooter from '../sections/TheFooter.vue';
import Preloader from '../components/Preloader.vue';

import { logo } from '../assets/images';


// Reactive states for the preloader
const loading = ref(true);
const companyLogo = logo;

// Function to simulate loading progress
const simulateLoading = () => {
    setTimeout(() => {
        loading.value = false;
    }, 3000); // Simulate loading for 3 seconds
};

// Start loading simulation on component mount
onMounted(() => {
    simulateLoading();
});

</script>


<style scoped></style>