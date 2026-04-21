<template>
  <div
    class="equipe-card"
    :class="{ 'test-mode': isTestMode }"
    :style="{ '--accent': equipeColor }"
  >
    <!-- Canto decorativo -->
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>

    <!-- Linha de acento superior -->
    <div class="accent-top"></div>

    <div class="card-header">
      <div class="header-title">
        <div class="equipe-id">
          <span class="id-bracket">&lt;</span>
          {{ equipeName }}
          <span class="id-bracket">/&gt;</span>
        </div>
        <div class="badges">
          <span v-if="isTestMode" class="test-badge">◈ TESTE</span>
          <span v-if="connectionStatus" class="connection-badge">
            <span class="connection-dot"></span>
            ONLINE
          </span>
        </div>
      </div>
      <div class="status-indicator">
        <span class="status-dot" :class="statusClass"></span>
        <span class="status-text">{{ latestData?.statusSensor || 'INATIVO' }}</span>
      </div>
    </div>

    <div v-if="alerts.length > 0" class="alert-area">
      <div
        v-for="alert in alerts"
        :key="alert.type"
        class="alert"
        :class="alert.severity"
      >
        <span class="alert-icon">{{ alert.severity === 'critical' ? '⚠' : '!' }}</span>
        {{ alert.message }}
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card" v-for="metric in metrics" :key="metric.label">
        <div class="metric-icon">{{ metric.icon }}</div>
        <div class="metric-value" :class="metric.valueClass">
          {{ metric.value }}<span class="metric-unit">{{ metric.unit }}</span>
        </div>
        <div class="metric-label">{{ metric.label }}</div>
        <div class="metric-bar">
          <div class="metric-bar-fill" :class="metric.valueClass" :style="{ width: getBarWidth(metric) + '%' }"></div>
        </div>
      </div>
    </div>

    <div class="timestamp">
      <span class="ts-prefix">SYNC //</span>
      {{ formatTimestamp(latestData?.timestamp) }}
    </div>

    <WeatherChart
      :data="historicalData.slice(0, 20)"
      :chartType="currentChartType"
    />

    <div class="chart-buttons">
      <button
        v-for="btn in chartButtons"
        :key="btn.type"
        class="chart-btn"
        :class="{ active: currentChartType === btn.type }"
        @click="currentChartType = btn.type"
      >
        <span class="btn-icon">{{ btn.icon }}</span>
        {{ btn.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import WeatherChart from './WeatherChart.vue';
import { useAlertProcessor } from '../composables/useAlertProcessor';

const props = defineProps({
  equipeName: { type: String, required: true },
  equipeColor: { type: String, default: '#00f5ff' },
  weatherData: { type: Array, required: true },
  isTestMode: { type: Boolean, default: false },
  connectionStatus: { type: Boolean, default: true }
});

const currentChartType = ref('rain');

const latestData = computed(() => props.weatherData[0] || null);
const historicalData = computed(() => [...props.weatherData].reverse());

const { alerts, intensityClass, statusClass } = useAlertProcessor(
  computed(() => props.weatherData)
);

const metrics = computed(() => {
  const data = latestData.value;
  if (!data) return [];
  return [
    { icon: '🌧️', label: 'Intens. Chuva', value: data.intensidadeChuva || 0, unit: 'mm/h', valueClass: intensityClass.value, max: 50 },
    { icon: '💧', label: 'Vol. Acumulado', value: data.volumeAcumulado || 0, unit: 'mm', valueClass: 'normal', max: 100 },
    { icon: '💨', label: 'Umidade', value: data.umidade || 0, unit: '%', valueClass: 'normal', max: 100 },
    { icon: '🌡️', label: 'Temperatura', value: data.temperatura || 0, unit: '°C', valueClass: 'normal', max: 50 },
    { icon: '📊', label: 'Pressão', value: data.pressao || 0, unit: 'hPa', valueClass: 'normal', max: 1100 },
  ];
});

const chartButtons = [
  { type: 'rain', icon: '🌧️', label: 'Chuva' },
  { type: 'volume', icon: '💧', label: 'Volume' },
  { type: 'climate', icon: '🌡️', label: 'Clima' },
];

const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleString('pt-BR');
};

const getBarWidth = (metric) => {
  const val = parseFloat(metric.value) || 0;
  return Math.min(100, Math.max(0, (val / metric.max) * 100));
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;700;800&display=swap');

.equipe-card {
  --accent: #00f5ff;
  position: relative;
  background: rgba(4, 16, 35, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  padding: 1.25rem;
  transition: box-shadow 0.35s ease, transform 0.35s ease;
  animation: fade-in-up 0.5s ease-out both;
  font-family: 'Exo 2', sans-serif;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.equipe-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 0 0 1px rgba(var(--accent-rgb, 0, 245, 255), 0.25),
    0 12px 40px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(0, 200, 255, 0.06);
}

.test-mode {
  border-color: rgba(255, 45, 85, 0.2) !important;
}

/* Linha de acento superior */
.accent-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--accent) 30%, var(--accent) 70%, transparent 100%);
  opacity: 0.9;
  box-shadow: 0 0 10px var(--accent);
}

/* Cantos decorativos */
.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: var(--accent);
  border-style: solid;
  opacity: 0.6;
}
.corner.tl { top: 4px; left: 4px; border-width: 1px 0 0 1px; }
.corner.tr { top: 4px; right: 4px; border-width: 1px 1px 0 0; }
.corner.bl { bottom: 4px; left: 4px; border-width: 0 0 1px 1px; }
.corner.br { bottom: 4px; right: 4px; border-width: 0 1px 1px 0; }

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.equipe-id {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.95rem;
  color: var(--accent);
  letter-spacing: 1px;
  text-shadow: 0 0 10px var(--accent);
}

.id-bracket {
  color: rgba(255, 255, 255, 0.25);
  font-weight: 300;
}

.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.test-badge {
  font-family: 'Share Tech Mono', monospace;
  background: rgba(255, 45, 85, 0.1);
  border: 1px solid rgba(255, 45, 85, 0.4);
  color: #ff2d55;
  padding: 0.15rem 0.6rem;
  border-radius: 2px;
  font-size: 0.65rem;
  letter-spacing: 1px;
  animation: blink-slow 2s infinite;
}

.connection-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Share Tech Mono', monospace;
  background: rgba(0, 255, 159, 0.08);
  border: 1px solid rgba(0, 255, 159, 0.3);
  color: #00ff9f;
  padding: 0.15rem 0.6rem;
  border-radius: 2px;
  font-size: 0.65rem;
  letter-spacing: 1px;
}

.connection-dot {
  width: 5px;
  height: 5px;
  background: #00ff9f;
  border-radius: 50%;
  box-shadow: 0 0 4px #00ff9f;
  animation: pulse 1.2s infinite;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-active {
  background: #00ff9f;
  box-shadow: 0 0 8px #00ff9f;
  animation: pulse 1.5s infinite;
}

.status-inactive {
  background: #ff2d55;
  box-shadow: 0 0 6px #ff2d55;
}

.status-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: #5b89ab;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Alertas */
.alert-area {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border-radius: 2px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  animation: slide-in 0.3s ease-out;
}

.alert-icon {
  font-style: normal;
}

.alert.warning {
  background: rgba(255, 224, 102, 0.07);
  border: 1px solid rgba(255, 224, 102, 0.3);
  border-left: 3px solid #ffe066;
  color: #ffe066;
}

.alert.critical {
  background: rgba(255, 45, 85, 0.08);
  border: 1px solid rgba(255, 45, 85, 0.3);
  border-left: 3px solid #ff2d55;
  color: #ff2d55;
  animation: shake 0.4s ease-out;
}

/* Métricas */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.metric-card {
  background: rgba(0, 200, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  padding: 0.75rem 0.5rem 0.6rem;
  text-align: center;
  transition: background 0.25s ease, border-color 0.25s ease;
  cursor: default;
}

.metric-card:hover {
  background: rgba(0, 200, 255, 0.07);
  border-color: rgba(0, 245, 255, 0.15);
}

.metric-icon {
  font-size: 1.15rem;
  margin-bottom: 0.35rem;
  line-height: 1;
}

.metric-value {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.35rem;
  color: #00f5ff;
}

.metric-value.normal { color: var(--accent); text-shadow: 0 0 8px var(--accent); }
.metric-value.warning { color: #ffe066; text-shadow: 0 0 8px #ffe066; animation: pulse-slow 1.2s infinite; }
.metric-value.critical { color: #ff2d55; text-shadow: 0 0 8px #ff2d55; animation: blink-slow 0.6s infinite; }

.metric-unit {
  font-size: 0.6rem;
  font-weight: 400;
  margin-left: 1px;
  opacity: 0.6;
}

.metric-label {
  font-size: 0.6rem;
  color: rgba(200, 223, 245, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
}

.metric-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 1px;
  overflow: hidden;
}

.metric-bar-fill {
  height: 100%;
  border-radius: 1px;
  transition: width 0.6s ease;
  background: var(--accent);
  box-shadow: 0 0 4px var(--accent);
}

.metric-bar-fill.warning { background: #ffe066; box-shadow: 0 0 4px #ffe066; }
.metric-bar-fill.critical { background: #ff2d55; box-shadow: 0 0 4px #ff2d55; }

/* Timestamp */
.timestamp {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 2px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  color: rgba(91, 163, 201, 0.6);
  margin-bottom: 0.85rem;
  letter-spacing: 0.5px;
}

.ts-prefix {
  color: rgba(0, 245, 255, 0.4);
  font-size: 0.6rem;
  letter-spacing: 1.5px;
}

/* Botões de chart */
.chart-buttons {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.75rem;
  justify-content: center;
}

.chart-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.75rem;
  background: transparent;
  border: 1px solid rgba(0, 245, 255, 0.15);
  border-radius: 2px;
  cursor: pointer;
  color: rgba(200, 223, 245, 0.45);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.chart-btn:hover {
  background: rgba(0, 245, 255, 0.07);
  border-color: rgba(0, 245, 255, 0.35);
  color: #00f5ff;
  box-shadow: 0 0 8px rgba(0, 245, 255, 0.1);
}

.chart-btn.active {
  background: rgba(0, 245, 255, 0.1);
  border-color: rgba(0, 245, 255, 0.5);
  color: #00f5ff;
  box-shadow: 0 0 10px rgba(0, 245, 255, 0.15);
}

.btn-icon { font-size: 0.8rem; }

/* Animations */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.9); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes blink-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

@keyframes slide-in {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 768px) {
  .equipe-card { padding: 1rem; }
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>