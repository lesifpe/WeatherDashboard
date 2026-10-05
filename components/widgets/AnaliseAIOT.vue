<template>
  <div class="analysis-section">
    <h3>Análise dos Dados</h3>
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
  { id: '1', titulo: 'Laboratório 1', descricao: 'Apresenta o maior fluxo com média de 1.050 acessos (26.6%).' },
  { id: '2', titulo: 'Laboratório 2', descricao: 'Segundo local mais frequentado com 810 acessos, indicando alta utilização.' },
  { id: '3', titulo: 'Salas de Aula', descricao: 'A Sala 102 se destaca com 860 acessos.' },
  { id: '4', titulo: 'Tendência Semanal', descricao: 'Observa-se pico de movimentação nas quintas-feiras.' },
  { id: '5', titulo: 'Insights', descricao: 'Os dados sugerem alta demanda pelos laboratórios, podendo indicar necessidade de otimização de horários.' }
]);
</script>

<style scoped>
.analysis-section {
  background-color: rgba(128, 128, 128, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(128, 128, 128, 0.25);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: inherit;
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