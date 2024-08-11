<template>
    <section class="relative flex items-center justify-center h-screen bg-fixed bg-cover bg-center"
        style="background-image: url('/path/to/your-image.jpg');">
        <!-- Minimal Animated Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-green-500/30 to-green-700/30 animate-gradient-move"></div>

        <!-- Hero Content -->
        <div class="relative z-10 text-center text-white px-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4 shadow-lg">
                <span class="animated-text">Innovate</span>
                <span class="animated-text">Create</span>
                <span class="animated-text">Inspire</span>
            </h1>
            <p class="text-lg md:text-2xl mb-8 shadow-lg">
                Supporting subheading that adds value.
            </p>
            <div class="flex justify-center space-x-4">
                <button
                    class="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 border border-white/10">
                    Get Started
                </button>
                <button
                    class="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 border border-white/10">
                    Learn More
                </button>
            </div>
        </div>

        <!-- Down Arrow Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <a href="#next-section">
                <svg class="animate-bounce w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </a>
        </div>

        <!-- Optional Branding Logo -->
        <div class="absolute top-8 left-8">
            <img src="" alt="Logo" class="h-12" />
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';

const animateText = () => {
    const textElements = document.querySelectorAll('.animated-text');
    textElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`;
        el.classList.add('animate-fade-in-up');
    });
};

onMounted(() => {
    animateText();
});
</script>

<style scoped>
/* Fade-In Up Animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
}

/* Animated Gradient Overlay */
@keyframes gradientMove {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient-move {
    background-size: 200% 200%;
    animation: gradientMove 6s ease infinite;
}

.backdrop-blur-sm {
    backdrop-filter: blur(10px);
}
</style>