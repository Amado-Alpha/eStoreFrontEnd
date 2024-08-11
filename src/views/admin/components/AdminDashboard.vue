<template>
    <div class="p-6 bg-gray-100 min-h-screen relative overflow-hidden">
        <!-- Animated Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-green-200 to-green-400 opacity-50 z-0"></div>

        <div class="relative z-10">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <!-- Card: Total Users -->
                <div
                    class="w-full bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm font-medium text-green-600">Total Users</div>
                            <div class="mt-2 text-3xl font-bold">12,00</div>
                        </div>
                        <div class="text-4xl text-green-600">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                </div>
                <!-- Card: Total Products -->
                <div
                    class="w-full bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm font-medium text-green-600">Total Products</div>
                            <div class="mt-2 text-3xl font-bold">12,00</div>
                        </div>
                        <div class="text-4xl text-green-600">
                            <i class="fas fa-box-open"></i>
                        </div>
                    </div>
                </div>
                <!-- Card: Total Projects -->
                <div
                    class="w-full bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm font-medium text-green-600">Total Projects</div>
                            <div class="mt-2 text-3xl font-bold">12,00</div>
                        </div>
                        <div class="text-4xl text-green-600">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                <!-- Recent Activity -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
                    <ul class="mt-4 space-y-4">
                        <li class="flex items-center">
                            <div class="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                            <div class="ml-3 text-sm text-gray-700">User John Doe registered.</div>
                        </li>
                        <li class="flex items-center">
                            <div class="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                            <div class="ml-3 text-sm text-gray-700">Product XYZ was updated.</div>
                        </li>
                        <li class="flex items-center">
                            <div class="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                            <div class="ml-3 text-sm text-gray-700">Project ABC was completed.</div>
                        </li>
                    </ul>
                </div>
                <!-- Performance Overview -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-lg font-semibold text-gray-800">Performance Overview</h2>
                    <div class="mt-4">
                        <div class="text-sm text-gray-600">User Engagement</div>
                        <div class="mt-2">
                            <div class="h-2 bg-green-200 rounded-full">
                                <div class="h-full bg-green-500 transition-all duration-500" style="width: 75%"></div>
                            </div>
                            <div class="mt-1 text-sm text-gray-700">75% engaged</div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="text-sm text-gray-600">Sales Performance</div>
                        <div class="mt-2">
                            <div class="h-2 bg-green-200 rounded-full">
                                <div class="h-full bg-green-500 transition-all duration-500" style="width: 60%"></div>
                            </div>
                            <div class="mt-1 text-sm text-gray-700">60% of target achieved</div>
                        </div>
                    </div>
                </div>
                <!-- Notifications -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-lg font-semibold text-gray-800">Notifications</h2>
                    <ul class="mt-4 space-y-4">
                        <li class="flex items-center">
                            <div class="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                            <div class="ml-3 text-sm text-gray-700">System update scheduled for midnight.</div>
                        </li>
                        <li class="flex items-center">
                            <div class="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                            <div class="ml-3 text-sm text-gray-700">New feature release coming next week.</div>
                        </li>
                    </ul>
                </div>
                <!-- Sales/User Trends -->
                <div class="bg-white rounded-lg shadow-lg p-6 col-span-2">
                    <h2 class="text-lg font-semibold text-gray-800">Sales/User Trends</h2>
                    <div class="mt-4">
                        <div class="relative h-80">
                            <canvas id="trendChart" class="w-full h-full"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AdminFooter />
</template>

<script setup>
import { onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

import AdminFooter from './AdminFooter.vue';

Chart.register(...registerables);

const initChart = () => {
    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Monthly Trends',
                data: [50, 60, 70, 80, 90, 100, 110],
                borderColor: '#34D399',
                backgroundColor: 'rgba(52, 211, 153, 0.2)',
                fill: true,
                tension: 0.3, // Smooth curve
                pointRadius: 5, // Larger data points
                pointBackgroundColor: '#34D399', // Data point color
                pointHoverBackgroundColor: '#fff', // Hover color
                pointHoverBorderColor: '#34D399', // Hover border color
                pointHoverRadius: 7, // Larger hover radius
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        borderDash: [5, 5],
                    },
                    ticks: {
                        callback: function (value) {
                            return `$${value}`;
                        },
                    },
                },
            },
        },
    });
};

onMounted(() => {
    initChart();
});
</script>

<style scoped>
/* Ensure chart spans full width */
#trendChart {
    width: 100% !important;
    height: 100% !important;
}
</style>
