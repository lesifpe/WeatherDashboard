<template>
  <div class="layout-principal">
    <Navbar />
    
    <main>
      <router-view />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/ui/Navbar.vue'
import Footer from './components/ui/Footer.vue'
</script>