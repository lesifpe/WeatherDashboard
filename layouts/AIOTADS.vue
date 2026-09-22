<template>
  <div class="aiotads-container">
    <header class="page-header">
      <h1 class="title">AIOTADS</h1>
      <p class="subtitle">Monitoramento de Movimentação - Salas e Laboratórios de ADS do IFPE Recife</p>
    </header>

    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.totalAcessos }}</span>
          <span class="kpi-label">Total de Acessos</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.mediaDia }}</span>
          <span class="kpi-label">Média por Dia</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.localMaisFrequentado }}</span>
          <span class="kpi-label">Local Mais Frequentado</span>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-info">
          <span class="kpi-value">{{ firebaseData.kpis.periodoAnalisado }}</span>
          <span class="kpi-label">Período Analisado</span>
        </div>
      </div>
    </section>

    <section class="kpi-grid secondary-kpis">
      <div class="kpi-card outline">
        <span class="kpi-label-secundary">Horários de Pico</span>
        <p><strong>{{ firebaseData.metricasSecundarias.horariosPico.rotulo }}:</strong> {{ firebaseData.metricasSecundarias.horariosPico.valor }}</p>
      </div>
      <div class="kpi-card outline">
        <span class="kpi-label-secundary">Tempo de Permanência</span>
        <p><strong>{{ firebaseData.metricasSecundarias.tempoPermanencia.rotulo }}:</strong> {{ firebaseData.metricasSecundarias.tempoPermanencia.valor }}</p>
      </div>
      <div class="kpi-card outline">
        <span class="kpi-label-secundary">Taxa de Ociosidade</span>
        <p><strong>{{ firebaseData.metricasSecundarias.taxaOciosidade.rotulo }}:</strong> {{ firebaseData.metricasSecundarias.taxaOciosidade.valor }}</p>
      </div>
    </section>

    <section class="chart-controls">
      <select v-model="selectedPeriod" class="dropdown-period">
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
      <h3>Movimentação por Local</h3>
      <MovementChart :type="chartType" />
    </section>

    <section class="bottom-grid">
      <div class="chart-section">
        <h3>Distribuição por Local</h3>
        <DistributionChart />
      </div>
      <DataAnalysis />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MovementChart from '../components/widgets/MovimentGraf.vue';
import DistributionChart from '../components/widgets/DistribuitionGraf.vue';
import DataAnalysis from '../components/widgets/AnaliseAIOT.vue';

const chartType = ref('area');
const selectedPeriod = ref('semana');
const firebaseData = ref({
  kpis: {
    totalAcessos: "3.950",
    mediaDia: 158,
    localMaisFrequentado: "Lab 1",
    periodoAnalisado: "1 Mês"
  },
  metricasSecundarias: {
    horariosPico: { rotulo: "Laboratório 1", valor: "14:00 às 16:00" },
    tempoPermanencia: { rotulo: "Média geral", valor: "1h 20min" },
    taxaOciosidade: { rotulo: "Salas vazias por", valor: "4.5 horas/dia" }
  }
});
</script>

<style scoped>
.aiotads-container {
  padding: 2rem;
  color: inherit;
  font-family: inherit;
}
.page-header .title {
  color: #c084fc;
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
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.kpi-card.outline {
  background-color: rgba(160, 160, 160, 0.05); /* Fica praticamente branco no modo claro[cite: 11] */
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  border: 1px solid rgba(128, 128, 128, 0.1); /* Borda extremamente suave */
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
  color: rgba(128, 128, 128, 0.9); /* Legendas cinzas que se adaptam[cite: 11] */
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
  background: #a855f7;
  border-color: #a855f7;
  color: white;
  border-radius: 6px;
}
.chart-section {
  background-color: rgba(160, 160, 160, 0.25); /* Fundo cinza suave dos gráficos no tema claro[cite: 10] */
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