<template>
  <section class=" py-12">
    <div class="container mx-auto lg:px-12 px-4 text-center">
      <div class="font-roboto text-center mb-12">
        <h2 class="text-3xl font-semibold text-gray-700 dark:text-white sm:text-5xl">
          WHY CHOOSE US
        </h2>
        <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover why we stand out: unparalleled quality, innovative solutions, and a commitment to your satisfaction.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(item, index) in items" :key="index"
          class="section-item bg-white rounded-lg p-6 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div class="flex justify-center mb-4">
            <i :class="item.iconClass" class="text-green-400 text-4xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = ref([
  {
    iconClass: 'fas fa-certificate',
    title: 'Quality Assurance',
    description: 'We ensure the highest quality standards in all our products, offering reliable and durable electronics.'
  },
  {
    iconClass: 'fas fa-lightbulb',
    title: 'Innovative Solutions',
    description: 'Our cutting-edge technology and innovative solutions keep you ahead in the industry.'
  },
  {
    iconClass: 'fas fa-headset',
    title: 'Excellent Support',
    description: 'We provide 24/7 customer support to assist you with any questions or issues.'
  },
  {
    iconClass: 'fas fa-users',
    title: 'Expert Team',
    description: 'Our team of experts is dedicated to providing you with the best solutions and advice.'
  }
]);

onMounted(() => {

  const items = document.querySelectorAll('.section-item');

  items.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 70,
      scale: 0.95,
      duration: 0.2,
      delay: index * 0.2, // Delay each item based on its index
      ease: "power2.out",
      filter: "blur(10px)", // Start with blur
      clearProps: "filter" // Clear blur after animations
    });
  });
});

</script>

<style scoped>
/* Your styles here */
</style>
