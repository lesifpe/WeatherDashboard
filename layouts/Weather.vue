<template>
  <div class="weather-container">
    <header class="page-header">
      <h1 class="title">Estação Meteorológica</h1>
      <p class="subtitle">Monitoramento em Tempo Real - Indicadores Climáticos e Atmosféricos</p>
    </header>

    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.temperatura }}</span>
          <span class="kpi-label">Temperatura Atual</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.umidade }}</span>
          <span class="kpi-label">Umidade do Ar</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.pressao }}</span>
          <span class="kpi-label">Pressão Atmosférica</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.indicePluviometrico }}</span>
          <span class="kpi-label">Índice Pluviométrico (24h)</span>
        </div>
      </div>
    </section>

    <section class="kpi-grid secondary-kpis">
      <div class="kpi-card outline">
        <span class="kpi-label-secundary">Luminosidade (UV)</span>
        <p><strong>{{ firebaseData.metricasSecundarias.luminosidade.rotulo }}:</strong> {{ firebaseData.metricasSecundarias.luminosidade.valor }}</p>
      </div>
      <div class="kpi-card outline">
        <span class="kpi-label-secundary">Sensação Térmica</span>
        <p><strong>{{ firebaseData.metricasSecundarias.sensacaoTermica.rotulo }}:</strong> {{ firebaseData.metricasSecundarias.sensacaoTermica.valor }}</p>
      </div>
      <div class="kpi-card outline">
        <span class="kpi-label-secundary">Tendência Diária</span>
        <p><strong>{{ firebaseData.metricasSecundarias.tendencia.rotulo }}:</strong> {{ firebaseData.metricasSecundarias.tendencia.valor }}</p>
      </div>
    </section>

    <section class="chart-controls">
      <select v-model="selectedPeriod" class="dropdown-period">
        <option value="hoje">Hoje</option>
        <option value="semana">Última semana</option>
        <option value="mes">Último mês</option>
      </select>
      
      <div class="chart-toggles">
        <button :class="{ active: chartType === 'line' }" @click="chartType = 'line'">Linha</button>
        <button :class="{ active: chartType === 'bar' }" @click="chartType = 'bar'">Barra</button>
        <button :class="{ active: chartType === 'area' }" @click="chartType = 'area'">Área</button>
      </div>
    </section>

    <section class="chart-section">
      <h3>Variação de Temperatura e Umidade</h3>
      <WeatherMainChart :type="chartType" />
    </section>

    <section class="bottom-grid">
      <div class="chart-section">
        <h3>Proporção de Condições (Mensal)</h3>
        <WeatherDistChart />
      </div>
      <WeatherAnalysis />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WeatherMainChart from '../components/widgets/WeatherCard.vue';
import WeatherDistChart from '../components/widgets/WeatherGraf.vue';
import WeatherAnalysis from '../components/widgets/AnaliseWeather.vue';

const chartType = ref('area');
const selectedPeriod = ref('semana');
const firebaseData = ref({
  kpis: {
    temperatura: "28°C",
    umidade: "65%",
    pressao: "1012 hPa",
    indicePluviometrico: "12 mm"
  },
  metricasSecundarias: {
    luminosidade: { rotulo: "Índice Atual", valor: "Alta (8500 lux)" },
    sensacaoTermica: { rotulo: "Percepção", valor: "30°C" },
    tendencia: { rotulo: "Previsão", valor: "Chuva moderada à tarde" }
  }
});
</script>

<style scoped>
.weather-container {
  padding: 2rem;
  color: inherit;
  font-family: inherit;
}
.page-header .title {
  color: #3b82f6;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}
.page-header .subtitle {
  color: rgba(128, 128, 128, 0.9);
  margin-bottom: 2rem;
}
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.kpi-card {
  background-color: rgba(160, 160, 160, 0.4);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.kpi-card.outline {
  background-color: rgba(160, 160, 160, 0.05);
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  border: 1px solid rgba(128, 128, 128, 0.1);
}
.kpi-label-secundary {
  color: rgba(128, 128, 128, 0.9);
  font-size: 0.95rem;
  font-weight: 500;
}
.kpi-card.outline p {
  margin: 0;
  font-size: 0.95rem;
  color: inherit;
}
.kpi-info {
  display: flex;
  flex-direction: column;
}
.kpi-value {
  font-size: 1.8rem;
  font-weight: bold;
}
.kpi-label {
  color: rgba(128, 128, 128, 0.9);
  font-size: 0.9rem;
}
.chart-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
}
.dropdown-period {
  background: rgba(160, 160, 160, 0.5);
  color: inherit;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  outline: none;
}
.chart-toggles button {
  background: transparent;
  border: 1px solid rgba(128, 128, 128, 0.2);
  color: inherit;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.chart-toggles button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  border-radius: 6px;
}
.chart-section {
  background-color: rgba(160, 160, 160, 0.25);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(128, 128, 128, 0.1);
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.chart-section h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: inherit;
}
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}
</style>