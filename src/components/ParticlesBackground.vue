<template>
    <div id="tsparticles" class="absolute inset-0 z-0"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { loadFull } from 'tsparticles';

const particleOptions = {
    particles: {
        number: {
            value: 100
        },
        color: {
            value: "ffffff"
        },
        links: {
            enable: true,
            distance: 200
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 1
        },
        size: {
            value: {
                min: 4,
                max: 6
            }
        },
        move: {
            enable: true,
            speed: 2
        }
    },
    background: {
        color: "#000000"
    },
    poisson: {
        enable: true
    }
};

const initializeParticles = async () => {
    const tsParticles = await loadFull(); // Load the complete tsparticles package
    await tsParticles.load({ id: "tsparticles", options: particleOptions });
};

onMounted(() => {
    initializeParticles();
});
</script>

<style scoped>
#tsparticles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>