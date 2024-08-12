<template>
    <div class="bg-white">
        <div class="container mx-auto py-12 lg:px-12 px-4 rounded-lg">
            <div ref="moveMeUp" class="relative font-roboto text-center mb-2">
                <h2 class="text-3xl font-semibold text-gray-700 dark:text-white sm:text-5xl">
                    PROJECTS
                </h2>
                <p class="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Explore our diverse array of projects, showcasing our dedication to quality, creativity, and
                    innovation in every endeavor.
                </p>
            </div>
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
                <button @click="scrollToPreviousSection"
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                    Previous Section
                </button>
            </div>
            <swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="20" :pagination="{ clickable: true }"
                :modules="modules" :loop="true" :autoplay="{ delay: 5000, disableOnInteraction: false }"
                class="mySwiper">
                <swiper-slide v-for="(project, index) in projects" :key="index"
                    class="project-slide p-4 md:p-8 bg-green-600 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 shadow-lg transform transition duration-500 hover:scale-105">
                    <!-- <p>button</p> -->

                    <!-- Button to Scroll Up -->
                    <button @click="scrollToPreviousSection"
                        class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white p-2 shadow-lg hover:bg-gray-200 transition-all duration-300 animate-bounce rounded-full">
                        <i class="fas fa-hand-point-up text-green-500 text-2xl"></i>
                    </button>

                    <img :src="project.image" alt="Project Image"
                        class="w-full h-48 md:h-64 object-cover rounded-lg hover:shadow-2xl transition-shadow duration-300" />
                    <div class="flex flex-col justify-center space-y-2 md:space-y-4">
                        <h3 class="font-roboto text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-gray-600">
                            {{
                                project.title }}</h3>
                        <p class="font-roboto text-md md:text-base lg:text-lg text-gray-600 mb-2 md:mb-4">{{
                            project.description }}
                        </p>
                        <div class="mt-4 text-gray-700">
                            <strong class="text-base md:text-lg">Key Features:</strong>
                            <ul class="list-disc list-inside pl-4 text-sm md:text-base">
                                <li v-for="(feature, index) in project.features" :key="index" class="flex items-center">
                                    <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                    {{ feature }}
                                </li>
                            </ul>
                        </div>
                        <div class="flex items-center mb-2 md:mb-4">
                            <template v-for="star in 5" :key="star">
                                <i v-if="star <= project.rating"
                                    class="fas fa-star text-yellow-400 text-base md:text-lg"></i>
                                <i v-else class="fas fa-star text-gray-300 text-base md:text-lg"></i>
                            </template>
                            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                                <!-- Button to Scroll Down -->
                                <button @click="scrollToNextSection"
                                    class="bg-gray-100 p-2 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 animate-bounce">
                                    <i class="fas fa-hand-point-down text-gold text-2xl"></i>
                                </button>
                                <!-- Button to Scroll Up -->
                                <button @click="scrollToPreviousSection"
                                    class="bg-gray-100 p-2 shadow-lg hover:bg-gray-200 transition-all duration-300 animate-bounce rounded-full">
                                    <i class="fas fa-hand-point-up text-green-500 text-2xl"></i>
                                </button>
                            </div>

                        </div>
                        <!-- <blockquote
                            class="border-l-4 border-green-500 pl-2 md:pl-4 italic text-gray-600 text-xs md:text-sm">
                            "This project has significantly improved our workflow and efficiency." - Client Testimonial
                        </blockquote> -->
                    </div>

                </swiper-slide>
            </swiper>
        </div>
    </div>

    <section ref="moveMeDown" class="bg-green-100">
        <div class="container min-h-[475px] font-sans mx-auto">
            <div class="grid md:grid-cols-2 justify-center items-center max-md:text-center gap-8 p-8">
                <div class="md:text-right max-md:mt-12 h-full">
                    <img src="https://media.istockphoto.com/id/1417897191/photo/african-american-black-male-college-student-stressed-and-overwhelmed-studying-in-front-of.jpg?s=612x612&w=0&k=20&c=VIJX_6AlNQj_wiaIK66TBwWxmEqcJ-2OQoQoituKj2Q="
                        alt="Premium Benefits"
                        class="w-full h-full object-cover rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
                        loading="lazy" />
                </div>

                <div class="max-w-md mx-auto p-4">
                    <h2 class="font-roboto text-gray-800 text-4xl md:text-5xl font-extrabold mb-6 md:leading-tight">We
                        turn
                        your
                        idea
                        into reality!</h2>
                    <p class="font-roboto text-gray-600 text-xl lg:text-2xl mb-8">Are you a final-year student looking
                        to
                        develop
                        an
                        outstanding
                        project, and you're frustrated not knowing where to start? We've helped many like you!</p>

                    <div class="mt-12">
                        <router-link :to="{ name: 'Contact' }"
                            class="text-lg font-roboto animate-none focus:animate-none hover:animate-none inline-flex text-md font-medium bg-green-500 mt-3 px-4 py-2 rounded-lg tracking-wide text-white">
                            Contact Us Today
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { ref } from 'vue';

const modules = [Pagination, Autoplay];

const moveMeDown = ref(null);
const moveMeUp = ref(null);

function scrollToNextSection() {
    if (moveMeDown.value) {
        const position = moveMeDown.value.offsetTop;
        window.scrollTo({ top: position, behavior: 'smooth' });
    }
}

function scrollToPreviousSection() {
    if (moveMeUp.value) {
        const position = moveMeUp.value.offsetTop;
        window.scrollTo({ top: position - 300, behavior: 'smooth' });
    }
}


const projects = [
    {
        title: "Automated Car",
        description:
            "An innovative project showcasing an automated car capable of navigating through predefined routes with minimal human intervention. This project leverages advanced technologies to enhance driving efficiency and safety.",
        rating: 5,
        features: [
            "Innovative and cutting-edge technology",
            "Efficient and user-friendly design",
            "Seamless integration with existing systems"
        ],
        image:
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_tpcOWxyxnK5xABlSFZSLYQBqYs0amBx9GADOcnR6KqZbGd81NfOtd_K3Djdf4rtptrSJEp0cYnzW00KHEJ6z506aQNKBN3I6jiEKGOBMUpZFS6FZOt7Gy6LudX4caYyMwYaZyEFrZG4/s1600/20471483357907.jpg",
    },
    {
        title: "Water Dispenser",
        description:
            "A smart water dispenser that provides instant access to clean drinking water. This project integrates IoT and cloud technologies to ensure reliable and efficient water dispensing.",
        rating: 4,
        features: [
            "Instant access to clean drinking water",
            "Integration with IoT and cloud technologies",
            "Reliable and efficient water dispensing"
        ],
        image:
            "https://circuitdigest.com/sites/default/files/inlineimages/u/Automatic-Water-Dispenser-using-Arduino-in-action.jpg",
    },
    {
        title: "Smart Waste Bin",
        description:
            "A modern waste management solution featuring a smart bin that automatically sorts waste. This project aims to promote environmental sustainability through intelligent waste disposal.",
        rating: 4,
        features: [
            "Automated waste sorting",
            "Promotes environmental sustainability",
            "Intelligent waste disposal"
        ],
        image:
            "https://hackster.imgix.net/uploads/attachments/1600475/_GcIvnFXZzP.blob?auto=compress&w=1600&h=1200&fit=min&fm=jpg",
    },

];

</script>

<style scoped>
.swiper {
    width: 100%;
    height: 600px;
    /* Set the fixed height for the Swiper container */
}

.swiper-slide {
    text-align: left;
    background: #ffffff;
    display: grid;
    align-items: center;
    height: 100%;
    /* Ensure each slide takes the full height */
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 0.5rem;
}

.project-slide:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.project-slide h3 {
    color: #2d3748;
}

.project-slide p {
    color: #4a5568;
}

.project-slide blockquote {
    color: #4a5568;
    font-style: italic;
    border-left-width: 4px;
    border-left-color: #089942;
    padding-left: 1rem;
    margin-top: 1rem;
}

.project-slide ul {
    padding-left: 1rem;
    color: #4a5568;
}

.project-slide li {
    margin-bottom: 0.5rem;
}

.pulse {
    animation: pulse 3.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
