<template>
  <div class="dashboard-container">
    <!-- Grid lines de fundo -->
    <div class="grid-overlay"></div>
    <div class="scanline"></div>

    <header class="dashboard-header">
      <div class="header-left">
        <div class="logo-block">
          <div class="logo-icon">
            <span class="logo-inner">IF</span>
          </div>
          <div class="logo-text">
            <span class="instituto-label">INSTITUTO FEDERAL</span>
            <span class="system-label">SYS://METEOROLOGIA</span>
          </div>
        </div>
      </div>

      <div class="header-center">
        <h1 class="dashboard-title">
          <span class="title-bracket">[</span>
          SISTEMA DE MONITORAMENTO METROPOLITANO
          <span class="title-bracket">]</span>
        </h1>
        <div class="subtitle-row">
          <span class="subtitle-item">
            <span class="dot cyan"></span>ESP32 IoT Network
          </span>
          <span class="divider">//</span>
          <span class="subtitle-item">
            <span class="dot green"></span>Firebase Realtime DB
          </span>
          <span class="divider">//</span>
          <span class="subtitle-item">
            <span class="dot yellow"></span>{{ currentTime }}
          </span>
        </div>
      </div>

      <div class="header-right">
        <div class="live-indicator">
          <span class="live-dot"></span>
          <span class="live-text">LIVE</span>
        </div>
        <div class="signal-bars">
          <span v-for="i in 4" :key="i" class="bar" :class="{ active: i <= 4 }"></span>
        </div>
      </div>
    </header>

    <div v-if="loading" class="loading-container">
      <div class="hud-spinner">
        <div class="spinner-ring outer"></div>
        <div class="spinner-ring inner"></div>
        <span class="spinner-text">CONECTANDO</span>
      </div>
      <p class="loading-text">Sincronizando com Firebase<span class="dots-anim">...</span></p>
    </div>

    <div v-else class="dashboard-grid">
      <EquipeCard
        v-for="equipe in equipes"
        :key="equipe.name"
        :equipeName="equipe.name"
        :equipeColor="equipe.color"
        :weatherData="equipe.data"
        :isTestMode="equipe.isTest"
        :connectionStatus="true"
      />
    </div>

    <footer class="dashboard-footer">
      <div class="footer-line"></div>
      <div class="footer-content">
        <span class="footer-note">DADOS ATUALIZADOS EM TEMPO REAL VIA FIREBASE REALTIME DATABASE</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import EquipeCard from './EquipeCard.vue';
import { useWeatherData } from '../composables/useWeatherData';

const equipesConfig = [
  { name: 'Equipe 1', collection: 'equipe1', isTest: false, color: '#00f5ff' },
  { name: 'Equipe 2', collection: 'equipe2', isTest: false, color: '#7b2fff' },
  { name: 'Equipe 3', collection: 'equipe3', isTest: false, color: '#00ff9f' },
  { name: 'Equipe 4', collection: 'equipe4', isTest: false, color: '#ff6b35' },
  { name: 'Teste Firebase Público', collection: 'teste-publico', isTest: true, color: '#ff2d55' }
];

const equipes = ref([]);
const loading = ref(true);
const currentTime = ref('');

let clockInterval = null;

const updateClock = () => {
  currentTime.value = new Date().toLocaleTimeString('pt-BR');
};

onMounted(() => {
  updateClock();
  clockInterval = setInterval(updateClock, 1000);

  equipesConfig.forEach(config => {
    const { data, loading: dataLoading } = useWeatherData(config.collection);
    equipes.value.push({ ...config, data });

    const checkLoading = setInterval(() => {
      if (!dataLoading.value) {
        loading.value = false;
        clearInterval(checkLoading);
      }
    }, 100);
  });
});

onUnmounted(() => {
  clearInterval(clockInterval);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

.dashboard-container {
  min-height: 100vh;
  background-color: #040d1a;
  background-image:
    radial-gradient(ellipse at 20% 10%, rgba(0, 200, 255, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(123, 47, 255, 0.06) 0%, transparent 50%);
  padding: 1.5rem;
  font-family: 'Exo 2', sans-serif;
  color: #c8dff5;
  position: relative;
  overflow-x: hidden;
}

/* Grid overlay */
.grid-overlay {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 200, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.scanline {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.4), transparent);
  animation: scanline 6s linear infinite;
  pointer-events: none;
  z-index: 1;
}

/* Header */
.dashboard-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 2rem;
  margin-bottom: 2rem;
  background: rgba(4, 20, 45, 0.85);
  border: 1px solid rgba(0, 245, 255, 0.15);
  border-top: 2px solid rgba(0, 245, 255, 0.5);
  border-radius: 4px;
  backdrop-filter: blur(12px);
  box-shadow:
    0 0 30px rgba(0, 200, 255, 0.07),
    inset 0 1px 0 rgba(0, 245, 255, 0.1);
  animation: fade-in-down 0.6s ease-out;
}

.header-left {
  flex-shrink: 0;
}

.logo-block {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.logo-icon {
  width: 46px;
  height: 46px;
  border: 2px solid #00f5ff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 12px rgba(0, 245, 255, 0.3);
}

.logo-inner {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: #00f5ff;
  letter-spacing: 1px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.instituto-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #5ba3c9;
  text-transform: uppercase;
}

.system-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #00f5ff;
  letter-spacing: 1px;
}

.header-center {
  flex: 1;
  text-align: center;
}

.dashboard-title {
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #e8f4ff;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
}

.title-bracket {
  color: #00f5ff;
  font-weight: 300;
  opacity: 0.7;
}

.subtitle-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  color: #5b89ab;
}

.subtitle-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.divider {
  color: rgba(0, 245, 255, 0.2);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.dot.cyan { background: #00f5ff; box-shadow: 0 0 6px #00f5ff; }
.dot.green { background: #00ff9f; box-shadow: 0 0 6px #00ff9f; }
.dot.yellow { background: #ffe066; box-shadow: 0 0 6px #ffe066; }

.header-right {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border: 1px solid rgba(255, 45, 85, 0.5);
  border-radius: 2px;
  background: rgba(255, 45, 85, 0.08);
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #ff2d55;
  border-radius: 50%;
  box-shadow: 0 0 8px #ff2d55;
  animation: blink 1s infinite;
}

.live-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #ff2d55;
  letter-spacing: 2px;
}

.signal-bars {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 16px;
}

.bar {
  width: 4px;
  background: rgba(0, 245, 255, 0.15);
  border-radius: 1px;
}

.bar:nth-child(1) { height: 4px; }
.bar:nth-child(2) { height: 7px; }
.bar:nth-child(3) { height: 11px; }
.bar:nth-child(4) { height: 15px; }

.bar.active {
  background: #00f5ff;
  box-shadow: 0 0 4px rgba(0, 245, 255, 0.6);
}

/* Loading */
.loading-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 2rem;
}

.hud-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid transparent;
}

.spinner-ring.outer {
  inset: 0;
  border-top-color: #00f5ff;
  border-right-color: rgba(0, 245, 255, 0.2);
  animation: spin 1.2s linear infinite;
  box-shadow: 0 0 12px rgba(0, 245, 255, 0.3);
}

.spinner-ring.inner {
  inset: 14px;
  border-bottom-color: #7b2fff;
  border-left-color: rgba(123, 47, 255, 0.2);
  animation: spin 0.8s linear infinite reverse;
}

.spinner-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.5rem;
  color: #00f5ff;
  letter-spacing: 1px;
}

.loading-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  color: #5ba3c9;
  letter-spacing: 2px;
}

.dots-anim {
  animation: blink 1.2s step-end infinite;
}

/* Grid */
.dashboard-grid {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(5, 1fr);
}

/* Footer */
.dashboard-footer {
  position: relative;
  z-index: 2;
  margin-top: 2.5rem;
}

.footer-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.3), transparent);
  margin-bottom: 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-copy,
.footer-note {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: rgba(91, 163, 201, 0.5);
  letter-spacing: 1px;
}

.footer-note {
  color: rgba(0, 245, 255, 0.3);
}

/* Animations */
@keyframes scanline {
  0% { top: -10px; }
  100% { top: 100vh; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsivo */
@media (max-width: 1400px) {
  .dashboard-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 992px) {
  .dashboard-container { padding: 1rem; }
  .dashboard-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .dashboard-header { flex-wrap: wrap; justify-content: center; text-align: center; }
}
@media (max-width: 640px) {
  .dashboard-grid { grid-template-columns: 1fr; }
  .dashboard-title { font-size: 0.9rem; }
  .footer-content { flex-direction: column; text-align: center; }
}
</style>