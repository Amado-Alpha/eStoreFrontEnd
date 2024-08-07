<template>
    <section class="font-roboto bg-cover bg-center text-white py-48 relative"
        :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="absolute inset-0 bg-green-900 opacity-50"></div>
        <div class="container mx-auto text-center relative z-10 mt-10">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ header }}</h1>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({
    header: String,
    description: String,
});
const backgroundImage = 'https://media.istockphoto.com/id/1448043432/photo/african-american-technician-repairing-a-3d-printer-in-laboratory.jpg?s=612x612&w=0&k=20&c=9lWRVDJ1zXGR3bpoR-hPnnv3VJotEAwbr7lJePiodAU=';
</script>