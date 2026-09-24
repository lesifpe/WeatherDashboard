<template>
  <div class="canvas-container pie-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, shallowRef } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
const chartInstance = shallowRef(null);
const chartData = ref({
  labels: ['Dias Ensolarados', 'Dias Nublados', 'Dias Chuvosos'],
  data: [15, 10, 5],
  colors: ['#facc15', '#94a3b8', '#3b82f6'] // Amarelo, Cinza, Azul
});

const renderChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
  chartInstance.value = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: chartData.value.labels,
      datasets: [{
        data: chartData.value.data,
        backgroundColor: chartData.value.colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { position: 'right', labels: { color: 'rgba(128, 128, 128, 0.9)' } } 
      }
    }
  });
};

onMounted(() => {
  renderChart();
});
watch(chartData, renderChart, { deep: true });
</script>

<style scoped>
.canvas-container {
  width: 100%;
}
.pie-container {
  height: 250px;
}
</style>