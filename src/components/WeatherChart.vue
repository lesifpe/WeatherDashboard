<template>
  <div class="chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({ data: Array })
const canvas = ref()
let chart

const render = () => {
  if (chart) chart.destroy()

  chart = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: props.data.map(d => ''),
      datasets: [{
        data: props.data.map(d => d.intensidadeChuva || 0),
        borderColor: '#2563eb',
        tension: 0.4
      }]
    }
  })
}

onMounted(render)
watch(() => props.data, render)
</script>

<style scoped>
.chart {
  height: 180px;
}
</style>