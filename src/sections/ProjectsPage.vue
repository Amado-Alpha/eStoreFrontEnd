<template>
    <div class="container mx-auto py-8 mt-16">
        <h1 class="text-4xl font-semibold mb-4 flex justify-center">Our Projects</h1>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(project, index) in paginatedProjects" :key="index"
                class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img :src="project.imageUrl" :alt="project.title" class="w-full h-56 object-cover object-center">
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2 truncate">{{ project.title }}</h2>
                    <p class="text-gray-700 line-clamp-3">{{ project.description }}</p>
                    <div class="mt-4 flex justify-between items-center">
                        <div class="text-sm font-medium text-gray-500">{{ project.technologies }}</div>
                        <div class="flex items-center justify-center gap-2">
                            <a :href="project.link" class="text-blue-500 hover:underline">View Project</a>
                            <a href="https://wa.me/1234567890" target="_blank"
                                class=" bg-green-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                                <i class="fab fa-whatsapp text-3xl" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-4">
            <button v-if="currentPage > 1" @click="prevPage" class="pagination-btn">
                Previous
            </button>
            <button v-for="page in totalPages" :key="page" @click="gotoPage(page)"
                :class="{ 'font-semibold': currentPage === page }" class="pagination-btn">
                {{ page }}
            </button>
            <button v-if="currentPage < totalPages" @click="nextPage" class="pagination-btn">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const projects = [
    {
        title: 'Smart Home Automation System',
        description: 'A project aimed at automating various tasks within the home environment using IoT devices.',
        technologies: 'IoT, Node.js, MQTT',
        imageUrl: 'https://www.iot-now.com/wp-content/uploads/2021/10/Smart-Home-Automation-System.jpg',
        link: '/projects/smart-home'
    },
    {
        title: 'Temperature and Humidity Monitoring System',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://i.pinimg.com/originals/ba/db/e1/badbe1f569788d64ae86fe42d5324113.jpg',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Water Quality Monitoring System',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://circuitdigest.com/sites/default/files/projectimage_mic/Aquaculture-Monitoring-System-using-IoT.jpg',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Smart agriculture system',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://s3.amazonaws.com/s3-biz4intellia/images/applications-of-iot-in-agriculture.jpg',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Waste management system',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://www.researchgate.net/publication/341449321/figure/fig1/AS:892408770330639@1589778239941/Internet-of-things-based-smart-waste-management-process.png',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Elderly Care Monitoring System',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://pub.mdpi-res.com/sustainability/sustainability-12-08946/article_deploy/html/images/sustainability-12-08946-g001.png?1603875963',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Smart agriculture system',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://s3.amazonaws.com/s3-biz4intellia/images/applications-of-iot-in-agriculture.jpg',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Waste management system',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://www.researchgate.net/publication/341449321/figure/fig1/AS:892408770330639@1589778239941/Internet-of-things-based-smart-waste-management-process.png',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Elderly Care Monitoring System',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://pub.mdpi-res.com/sustainability/sustainability-12-08946/article_deploy/html/images/sustainability-12-08946-g001.png?1603875963',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Waste management system',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://www.researchgate.net/publication/341449321/figure/fig1/AS:892408770330639@1589778239941/Internet-of-things-based-smart-waste-management-process.png',
        link: '/projects/temperature-monitoring'
    },
    {
        title: 'Elderly Care Monitoring System',
        description: 'An IoT solution for monitoring temperature and humidity levels in industrial settings.',
        technologies: 'IoT, Arduino, MQTT',
        imageUrl: 'https://pub.mdpi-res.com/sustainability/sustainability-12-08946/article_deploy/html/images/sustainability-12-08946-g001.png?1603875963',
        link: '/projects/temperature-monitoring'
    },
];
const projectsPerPage = 9; // Number of projects per page
const currentPage = ref(1); // Current page

const paginatedProjects = computed(() => {
    const startIndex = (currentPage.value - 1) * projectsPerPage;
    const endIndex = currentPage.value * projectsPerPage;
    return projects.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(projects.length / projectsPerPage));

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        scrollToTop();
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
        scrollToTop();
    }
}

function gotoPage(page) {
    currentPage.value = page;
    scrollToTop();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<style scoped>
/* Add any custom styling here */
.truncate {
    max-height: 3.6rem;
    /* Adjust as needed */
    overflow: hidden;
    text-overflow: ellipsis;
}

.line-clamp-3 {
    /* TailwindCSS utility class for limiting lines */
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.pagination-btn {
    padding: 8px 16px;
    margin: 0 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
}
</style>
