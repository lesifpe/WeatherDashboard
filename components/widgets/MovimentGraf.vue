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
//Dados prontos para receber Firebase
const chartData = ref({
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
  datasets: [
    { label: 'Laboratório 1', data: [45, 52, 48, 60, 42], color: '#3b82f6' },
    { label: 'Laboratório 2', data: [30, 35, 32, 45, 28], color: '#a855f7' },
    { label: 'Sala 101', data: [20, 25, 22, 28, 18], color: '#06b6d4' },
    { label: 'Sala 102', data: [35, 40, 38, 50, 32], color: '#f97316' }
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
          beginAtZero: true, 
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