<template>
  <div class="analysis-section">
    <h3>Análise Meteorológica</h3>
    <ul class="analysis-list">
      <li v-for="item in analiseDeDados" :key="item.id">
        <strong>{{ item.titulo }}:</strong> {{ item.descricao }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const analiseDeDados = ref([
  { id: '1', titulo: 'Temperatura', descricao: 'A média semanal aponta para uma máxima de 31 graus, com pico na quarta-feira.' },
  { id: '2', titulo: 'Umidade do Ar', descricao: 'Queda brusca de umidade prevista para o meio da semana (58%), retornando a níveis altos no fim de semana.' },
  { id: '3', titulo: 'Precipitação', descricao: 'O índice pluviométrico indica chuvas moderadas para a noite de sexta e madrugada de sábado.' },
  { id: '4', titulo: 'Pressão Atmosférica', descricao: 'Estabilidade em 1012 hPa, sem indícios de frentes frias severas se aproximando.' },
  { id: '5', titulo: 'Alerta', descricao: 'Luminosidade intensa (UV Alto) durante as tardes de terça e quarta. Recomendado proteção solar.' }
]);
</script>

<style scoped>
.analysis-section {
  background-color: var(--bg-card, rgba(160, 160, 160, 0.25));
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(128, 128, 128, 0.1);
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: inherit;
}

.analysis-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.analysis-list li {
  margin-bottom: 1.25rem;
  line-height: 1.6;
  color: inherit;
  opacity: 0.85;
}

.analysis-list strong {
  font-weight: 600;
  opacity: 1;
}
</style>