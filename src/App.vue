<!-- App.vue -->
<template>
  <div class="app">
    <HeroSection />
    
    <div class="main-layout">
      <Sidebar @team-selected="handleTeamSelected" />
      
      <div class="content-area">
        <ContentCarousel :selectedTeam="selectedTeam" />
      </div>
    </div>
    
    <FooterSection />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from './components/HeroSection.vue'
import Sidebar from './components/Sidebar.vue'
import ContentCarousel from './components/ContentCarousel.vue'
import FooterSection from './components/FooterSection.vue'

const selectedTeam = ref(null)

const handleTeamSelected = (team) => {
  selectedTeam.value = team
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #030711;
  font-family: 'Exo 2', sans-serif;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(ellipse at 20% 30%, #0a1628, #030711);
}

.main-layout {
  display: flex;
  flex: 1;
  gap: 0;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
}

.content-area {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  margin-left: 1rem;
}

/* Responsivo */
@media (max-width: 1024px) {
  .main-layout {
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    padding: 1rem;
  }
  .content-area {
    margin-left: 0;
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .main-layout {
    padding: 0.75rem;
  }
}
</style>