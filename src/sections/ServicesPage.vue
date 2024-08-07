<template>
    <HeroAboutUs header="Our Services" />
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 lg:px-8">
            <!-- Page Title -->
            <!-- Services Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <!-- Service Card -->
                <div v-for="service in services" :key="service.name"
                    class="bg-white shadow-md rounded-lg p-8 text-center">
                    <div class="text-4xl text-yellow-300 mb-4">
                        <i :class="service.icon"></i> <!-- FontAwesome icon for Selling Electronic Devices -->
                    </div>
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ service.name }}</h2>
                    <p class="text-gray-700 leading-6 mb-6">
                        {{ service.description }}
                    </p>
                    <ul v-for="feature in service.features" :key="feature" class="ml-6 space-y-6 text-gray-600">
                        <li class="flex items-center mb-4">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i> {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import HeroAboutUs from '../components/HeroAboutUs.vue';

const services = ref([
    {
        name: '3D Printing',
        icon: 'fas fa-print',
        description: 'High-quality 3D printing services for prototypes and custom parts.',
        features: [
            'Rapid prototyping',
            'Custom parts and components',
            'High precision and quality'
        ]
    },
    {
        name: 'Software Development',
        icon: 'fas fa-code',
        description: 'Tailored software solutions for businesses of all sizes.',
        features: [
            'Custom web applications',
            'Mobile app development',
            'Software integration'
        ]
    },
    {
        name: 'Circuit Design & Development',
        icon: 'fas fa-microchip',
        description: 'Expert design and development of electronic circuits.',
        features: [
            'Custom circuit design',
            'Prototype development',
            'Testing and validation'
        ]
    },
    {
        name: 'Computer Maintenance & Repair',
        icon: 'fas fa-tools',
        description: 'Reliable maintenance and repair services for your computer systems.',
        features: [
            'Diagnostic services',
            'Hardware repairs',
            'Software troubleshooting'
        ]
    },
    {
        name: 'Tech Consultancy',
        icon: 'fas fa-lightbulb',
        description: 'Strategic technology consulting to optimize your business operations.',
        features: [
            'IT strategy development',
            'Technology assessments',
            'Implementation guidance'
        ]
    },
    {
        name: 'Selling Electronic Devices',
        icon: 'fas fa-shopping-cart',
        description: 'A comprehensive range of electronic devices and gadgets.',
        features: [
            'Latest electronics',
            'Competitive pricing',
            'Quality assurance'
        ]
    }
]);
</script>

<style scoped>
/* No additional scoped styles needed */
</style>