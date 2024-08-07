<template>
  <div :class="{ 'flex-row-reverse': order % 2 !== 0 }"
    class="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8 bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
    <div class="md:w-1/2 mb-4 md:mb-0">
      <img :src="imageSrc" :alt="altText" class="w-full h-[250px] md:h-[250px] object-cover md:rounded-lg">
    </div>
    <div class="md:w-1/2 md:pl-8 p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-2">{{ header }}</h2>
      <p class="text-base text-gray-700 leading-7 mb-4">{{ description }}</p>
      <ul class="list-disc list-inside text-left">
        <li v-for="(item, index) in listItems" :key="index" class="text-gray-600">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageSrc: String,
  altText: String,
  header: String,
  description: String,
  listItems: Array,
  order: Number,
});
</script>

<style scoped>
/* Custom styles for the service card */
</style>
