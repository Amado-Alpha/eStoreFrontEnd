<template>
  <section>
    <HomePageHeroSection />
  </section>
  <section>
    <HomePageServiceSection />
  </section>
  <section>
    <HomePageProjectSection />
  </section>
  <section>
    <HomePageProductSection />
  </section>
  <section>
    <HomePageWhyUsSection />
  </section>
  <section>
    <HomePageTestimonialSection />
  </section>
  <section>
    <BackToTopButton />
  </section>
</template>


<script setup>

import HomePageHeroSection from '../sections/HomePageHeroSection.vue';
import HomePageTestimonialSection from '../sections/HomePageTestimonialSection.vue';
import HomePageServiceSection from '../sections/HomePageServiceSection.vue';
import HomePageProjectSection from '../sections/HomePageProjectSection.vue';
import HomePageWhyUsSection from '../sections/HomePageWhyUsSection.vue';
import HomePageProductSection from '../sections/HomePageProductSection.vue';
import BackToTopButton from './BackToTopButton.vue';

</script>