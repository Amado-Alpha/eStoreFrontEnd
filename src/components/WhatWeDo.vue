<template>
  <template v-if="section.order == 1">
    <h1 class="text-4xl font-bold mb-12 text-center">What We Do</h1>
  </template>
  <div class="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8">
    <div
      :class="{ 'md:w-1/2 mb-4 md:mb-0 relative': section.order % 2 === 1, 'md:w-1/2 md:order-2 mb-4 md:mb-0 relative': section.order % 2 === 0 }">
      <img :src="section.imageSrc" :alt="section.altText" class="w-full h-auto md:h-96 md:rounded-lg">
      <div
        class="absolute inset-0 bg-gradient-to-t from-green-500/70 via-green-500/30 to-transparent opacity-80 md:rounded-lg">
      </div>
    </div>
    <div
      :class="{ 'md:w-1/2 md:pl-8': section.order % 2 === 1, 'md:w-1/2 md:pr-8 md:order-1': section.order % 2 === 0 }">
      <h2 class="text-2xl font-bold mb-2">{{ section.header }}</h2>
      <p>{{ section.paragraph }}</p>
      <ul class="list-disc list-inside">
        <li v-for="(item, index) in section.listItems" :key="index" class="text-base text-gray-700">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  section: Object
});
</script>

<style scoped>
.flex-row-reverse {
  flex-direction: row-reverse;
}

@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }
}

/* Style for ul */
ul {
  margin-left: 1.5rem;
  /* Move the ul slightly inside */
}

/* Style for li */
li {
  color: black;
  position: relative;
  padding-left: 1.5rem;
}

/* Style for bullet points */
li::marker {
  content: '•';
  color: #4CAF50;
  font-size: 1.2rem;
  position: absolute;
  left: -1.5rem;
  top: 0.2rem;
  line-height: 1;
  margin-right: 2rem;
}

.bg-gradient-to-t {
  background: linear-gradient(to top, rgba(56, 178, 172, 0.7), rgba(56, 178, 172, 0.3), transparent);
}

.absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
