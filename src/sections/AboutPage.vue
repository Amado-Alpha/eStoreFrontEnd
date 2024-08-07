<template>
    <HeroAboutUs header="About Us" />
    <section class="font-roboto py-12 bg-gray-100">
        <div class="container mx-auto lg:px-12 px-4">
            <!-- Company Overview -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center bg-white shadow-md rounded-lg p-8">
                <div class="order-2 md:order-1">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Company Overview</h2>
                    <p class="text-gray-700 leading-7 mb-4">
                        We are a leading electronics company dedicated to providing top-quality products and services to
                        our customers. Our commitment to innovation and excellence drives everything we do.
                    </p>
                    <ul class="list-none text-gray-700 leading-7 space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i> Top-quality products
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-lightbulb text-green-500 mr-2"></i> Innovative solutions
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-headset text-green-500 mr-2"></i> Exceptional customer service
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-leaf text-green-500 mr-2"></i> Commitment to sustainability
                        </li>
                    </ul>
                </div>
                <div class="order-1 md:order-2">
                    <img :src="companyImage" alt="Company Image"
                        class="rounded-lg shadow-md w-[600px] h-auto object-cover" loading="lazy">
                </div>
            </div>
            <!-- Mission and Vision -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="bg-white shadow-md rounded-lg p-8 flex items-start space-x-4">
                    <div class="text-green-500">
                        <i class="fas fa-bullseye text-4xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                        <p class="text-gray-700 leading-7">
                            Our mission is to deliver cutting-edge electronic solutions that enhance the lives of our
                            customers and contribute to a sustainable future.
                        </p>
                    </div>
                </div>
                <div class="bg-white shadow-md rounded-lg p-8 flex items-start space-x-4">
                    <div class="text-yellow-400">
                        <i class="fas fa-sun text-4xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                        <p class="text-gray-700 leading-7">
                            Our vision is to be a global leader in the electronics industry, known for our innovative
                            products, exceptional service, and commitment to sustainability.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Team Members -->
            <OurTeam />
            <!-- Call to action -->
            <!-- <div class="bg-green-600 text-white py-12 rounded-lg">
                <div class="text-center mb-6">
                    <h2 class="text-3xl font-bold mb-4">Join Our Journey</h2>
                    <p class="text-lg mb-6">Discover how we can help you with our innovative electronic solutions.</p>
                </div>
                <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <a href="mailto:contact@company.com"
                        class="flex items-center bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-50 transition">
                        <i class="fas fa-envelope text-2xl mr-2"></i> contact@company.com
                    </a>
                    <a href="tel:+1234567890"
                        class="flex items-center bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-50 transition">
                        <i class="fas fa-phone-alt text-2xl mr-2"></i> +1234567890
                    </a>
                </div>
            </div> -->
        </div>
    </section>
</template>

<script setup>
import OurTeam from './CompanyLeadership.vue';
import HeroAboutUs from '../components/HeroAboutUs.vue';

//Recommended size 600*400
const companyImage = 'https://media.istockphoto.com/id/1417897191/photo/african-american-black-male-college-student-stressed-and-overwhelmed-studying-in-front-of.jpg?s=612x612&w=0&k=20&c=VIJX_6AlNQj_wiaIK66TBwWxmEqcJ-2OQoQoituKj2Q=';
</script>
