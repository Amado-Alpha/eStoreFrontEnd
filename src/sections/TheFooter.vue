<template>
  <footer class="relative bg-gradient-to-t from-green-100 to-white font-roboto text-black py-12">
    <div class="container mx-auto px-4 lg:px-8">

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 mx-auto">
        <!-- About Section -->
        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">About Us</h2>
          <p class="mb-4">We are a leading electronics company committed to providing top-notch services and
            innovative
            solutions.</p>
          <img src="https://example.com/logo.png" alt="Company Logo" class="w-32">
        </div>

        <!-- Contact Section -->

        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold mb-4">Contact Us</h2>
          <div class="flex items-center mb-2 text-gray-500">
            <i class="fas fa-envelope text-xl mr-3"></i>
            <a href="mailto:contact@company.com" class="hover:text-green-400">contact@company.com</a>
          </div>
          <div class="flex items-center mb-2 text-gray-500">
            <i class="fas fa-phone-alt text-xl mr-3"></i>
            <a href="tel:+1234567890" class="hover:text-green-400">+1234567890</a>
          </div>
          <div class="flex items-center text-gray-500">
            <i class="fas fa-map-marker-alt text-xl mr-3"></i>
            <address>Magomeni Mapipa, Dar Es Salaam, Tanzania</address>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div>
          <h2 class="text-xl  font-semibold mb-4">Quick Links</h2>
          <ul class="space-y-2 text-gray-500">
            <li><router-link :to="{ name: 'About' }" class="hover:text-green-400">About Us</router-link></li>
            <li><router-link :to="{ name: 'Services' }" class="hover:text-green-400">Services</router-link></li>
            <li><router-link :to="{ name: 'Products' }" class="hover:text-green-400">Products</router-link></li>
            <li><router-link :to="{ name: 'Contact' }" class="hover:text-green-400">Contact Us</router-link></li>
          </ul>
        </div>


        <!-- Social Media Section -->
        <div>
          <h2 class="text-xl font-semibold mb-4">Follow Us</h2>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-500 hover:text-green-400"><i class="fab fa-facebook-f text-2xl"></i></a>
            <a href="#" class="text-gray-500 hover:text-green-400"><i class="fab fa-twitter text-2xl"></i></a>
            <a href="#" class="text-gray-500 hover:text-green-400"><i class="fab fa-linkedin-in text-2xl"></i></a>
            <a href="#" class="text-gray-500 hover:text-green-400"><i class="fab fa-instagram text-2xl"></i></a>
          </div>
        </div>
      </div>

      <div class="mt-8 border-t border-gray-300 pt-4 text-center">
        <p>&copy; 2024 <routerLink :to="{ name: 'admin.login' }">MeckTonix</routerLink> Solutions Ltd.
          All rights
          reserved.</p>
      </div>

    </div>



  </footer>
</template>

<script setup>
// No script setup needed for this static footer component
</script>