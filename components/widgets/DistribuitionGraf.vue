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
//Dados prontos para receber Firebase
const chartData = ref({
  labels: ['Laboratório 1', 'Laboratório 2', 'Sala 101', 'Sala 102'],
  data: [27, 21, 18, 22],
  colors: ['#3b82f6', '#a855f7', '#06b6d4', '#f97316']
});

const renderChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(chartCanvas.value, {
    type: 'pie',
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