<template>
  <div class="layout-principal">
    <Navbar />
    
    <main>
      <HomeView />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/ui/Navbar.vue'
import Footer from './components/ui/Footer.vue'
import HomeView from './view/HomeView.vue'
</script>