<template>
  <div class="canvas-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, shallowRef } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  type: {
    type: String,
    default: 'area'
  }
});

const chartCanvas = ref(null);
const chartInstance = shallowRef(null);
const chartData = ref({
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  datasets: [
    { label: 'Temperatura (°C)', data: [28, 30, 31, 29, 27, 25, 26], color: '#f97316' }, // Laranja
    { label: 'Umidade (%)', data: [65, 60, 58, 70, 80, 85, 75], color: '#3b82f6' } // Azul
  ]
});

const renderChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  const isArea = props.type === 'area';
  
  chartInstance.value = new Chart(chartCanvas.value, {
    type: props.type === 'area' ? 'line' : props.type,
    data: {
      labels: chartData.value.labels,
      datasets: chartData.value.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color,
        backgroundColor: isArea ? ds.color + '33' : ds.color,
        fill: isArea,
        tension: 0.4,
        borderWidth: 2
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { position: 'bottom', labels: { color: 'rgba(128, 128, 128, 0.9)' } } 
      },
      scales: {
        y: { 
          beginAtZero: false, 
          grid: { color: 'rgba(128, 128, 128, 0.3)' }, 
          ticks: { color: 'rgba(128, 128, 128, 0.9)' } 
        },
        x: { 
          grid: { color: 'rgba(128, 128, 128, 0.3)' }, 
          ticks: { color: 'rgba(128, 128, 128, 0.9)' } 
        }
      }
    }
  });
};
onMounted(() => {
  renderChart();
});
watch(() => props.type, renderChart);
watch(chartData, renderChart, { deep: true });
</script>

<style scoped>
.canvas-container {
  height: 300px;
  width: 100%;
}
</style>