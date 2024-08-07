<template>
    <HeroAboutUs header="Contact Us" />
    <section class="contact-section py-12 bg-gray-100">
        <div class="container mx-auto lg:px-12 px-4">
            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="bg-white shadow-md rounded-lg p-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Address</h2>
                    <div class="space-y-4">
                        <!-- Street -->
                        <div class="flex items-center">
                            <i class="fas fa-map-marker-alt text-green-600 text-3xl mr-3"></i>
                            <p class="text-gray-500">Magomeni Mapipa</p>
                        </div>
                        <!-- City -->
                        <div class="flex items-center">
                            <i class="fas fa-building text-green-600 text-3xl mr-3"></i>
                            <p class="text-gray-500">Dar Es Salaam</p>
                        </div>
                        <!-- Country -->
                        <div class="flex items-center">
                            <i class="fas fa-flag text-green-600 text-3xl mr-3"></i>
                            <p class="text-gray-500">Tanzania</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white shadow-md rounded-lg p-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <div class="flex items-center mb-4">
                        <i class="fas fa-envelope text-green-600 text-2xl mr-3"></i>
                        <a href="mailto:contact@company.com" class="text-gray-700">contact@company.com</a>
                    </div>
                    <div class="flex items-center mb-4">
                        <i class="fas fa-phone-alt text-green-600 text-2xl mr-3"></i>
                        <a href="tel:+1234567890" class="text-gray-700">+1234567890</a>
                    </div>
                    <div class="flex items-center mb-4">
                        <i class="fas fa-clock text-green-600 text-2xl mr-3"></i>
                        <p class="text-gray-700">Mon-Fri: 9am - 6pm</p>
                    </div>
                </div>
            </div>

            <!-- Map Section -->
            <div class="bg-white shadow-md rounded-lg p-8 mb-12">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Find Us Here</h2>
                <div class="relative h-64">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.103459973646!2d-122.0855596846818!3d37.42199977982527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb63d2cfa3b55%3A0x8376c2e8d6b6b7a3!2sGoogleplex!5e0!3m2!1sen!2sus!4v1611182760842!5m2!1sen!2sus"
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="lg:px-24 font-roboto">
                <form @submit.prevent="openWhatsApp" class="bg-gray-100 p-8 rounded-lg shadow-md">
                    <div class="font-roboto text-center mb-12">
                        <h2 class="text-3xl font-semibold text-gray-700 dark:text-white sm:text-5xl">
                            GET IN TOUCH
                        </h2>
                        <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Send us a message via WhatsApp and we'll get back to you asap!
                        </p>
                    </div>
                    <div class="grid grid-cols-1 gap-6 mb-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" v-model="form.name" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        </div>
                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" v-model="form.message" rows="4" required
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button type="submit"
                            class="py-2 px-4 bg-whatsapp text-white font-bold rounded-xl shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Send Message via WhatsApp
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import OurTeam from './CompanyLeadership.vue';
import HeroAboutUs from '../components/HeroAboutUs.vue';

const form = ref({
    name: '',
    message: ''
});

const whatsappNumber = '+255714327327'; // Replace with your WhatsApp number in international format

const openWhatsApp = () => {
    const { name, message } = form.value;
    const whatsappMessage = encodeURIComponent(`Name: ${name}\nMessage: ${message}`);
    const url = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(url, '_blank');
};
</script>
