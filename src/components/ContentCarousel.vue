<!-- src/components/ContentCarousel.vue -->
<template>
  <div class="carousel-container">
    <div class="carousel-nav">
      <button class="nav-btn prev" @click="prevSlide" :disabled="currentSlide === 0">
        ‹
      </button>
      
      <div class="carousel-track-wrapper">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div class="carousel-slide">
            <ProjectHistory :selectedTeam="selectedTeam" />
          </div>
          <div class="carousel-slide">
            <Dashboard :selectedTeam="selectedTeam" />
          </div>
        </div>
      </div>
      
      <button class="nav-btn next" @click="nextSlide" :disabled="currentSlide === totalSlides - 1">
        ›
      </button>
    </div>
    
    <div class="carousel-dots">
      <button
        v-for="(_, index) in totalSlides"
        :key="index"
        class="dot"
        :class="{ active: currentSlide === index }"
        @click="currentSlide = index"
      >
        <span class="dot-label">{{ index === 0 ? 'HISTÓRIA' : 'DASHBOARD' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectHistory from './ProjectHistory.vue'
import Dashboard from './Dashboard.vue'

const props = defineProps({
  selectedTeam: {
    type: Object,
    default: null
  }
})

const currentSlide = ref(0)
const totalSlides = 2

const nextSlide = () => {
  if (currentSlide.value < totalSlides - 1) currentSlide.value++
}

const prevSlide = () => {
  if (currentSlide.value > 0) currentSlide.value--
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
}

.carousel-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.carousel-track-wrapper {
  flex: 1;
  overflow: hidden;
  border-radius: 8px;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
}

.nav-btn {
  width: 40px;
  height: 40px;
  background: rgba(0, 245, 255, 0.08);
  border: 1px solid rgba(0, 245, 255, 0.2);
  border-radius: 50%;
  color: #00f5ff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(0, 245, 255, 0.15);
  border-color: rgba(0, 245, 255, 0.4);
  transform: scale(1.05);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.dot {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0;
}

.dot-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: rgba(200, 223, 245, 0.3);
  padding: 0.25rem 1rem;
  border-radius: 20px;
  transition: all 0.2s ease;
}

.dot.active .dot-label {
  color: #00f5ff;
  background: rgba(0, 245, 255, 0.1);
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.3);
}

@media (max-width: 768px) {
  .nav-btn { width: 32px; height: 32px; font-size: 1.2rem; }
  .carousel-dots { margin-top: 1rem; gap: 0.75rem; }
  .dot-label { font-size: 0.6rem; padding: 0.2rem 0.6rem; }
}

@media (max-width: 480px) {
  .nav-btn { width: 28px; height: 28px; font-size: 1rem; }
  .dot-label { font-size: 0.55rem; padding: 0.15rem 0.5rem; }
  .carousel-dots { gap: 0.5rem; margin-top: 0.75rem; }
}
</style>