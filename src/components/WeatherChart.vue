<!-- components/WeatherChart.vue -->
<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({
  data: { type: Array, default: () => [] },
  chartType: { type: String, default: 'rain' }
})

const canvas = ref(null)
let chart = null

const getChartData = () => {
  const labels = props.data.map((_, index) => index + 1)
  
  let datasetLabel = 'Intensidade de Chuva (mm/h)'
  let datasetData = props.data.map(d => d.chuvaIntensidade ?? d.intensidadeChuva ?? 0)
  let borderColor = '#2563eb'
  let backgroundColor = '#2563eb20'
  
  if (props.chartType === 'volume') {
    datasetLabel = 'Chuva Acumulada (mm)'
    datasetData = props.data.map(d => d.chuvaDiaria ?? d.volumeAcumulado ?? 0)
    borderColor = '#00ff9f'
    backgroundColor = '#00ff9f20'
  } else if (props.chartType === 'climate') {
    datasetLabel = 'Temperatura (°C)'
    datasetData = props.data.map(d => d.dht_temperatura ?? d.temperatura ?? d.temperature ?? 0)
    borderColor = '#ff6b35'
    backgroundColor = '#ff6b3520'
  }
  
  return { labels, datasetLabel, datasetData, borderColor, backgroundColor }
}

const render = () => {
  if (!canvas.value || !props.data.length) return
  
  if (chart) chart.destroy()
  
  const { labels, datasetLabel, datasetData, borderColor, backgroundColor } = getChartData()
  
  chart = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: datasetLabel,
        data: datasetData,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: borderColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#c8dff5',
            font: {
              family: 'Share Tech Mono, monospace',
              size: 10
            },
            boxWidth: 10,
            padding: 8
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(4, 16, 35, 0.95)',
          titleColor: '#00f5ff',
          bodyColor: '#c8dff5',
          borderColor: 'rgba(0, 245, 255, 0.3)',
          borderWidth: 1,
          titleFont: {
            family: 'Share Tech Mono, monospace',
            size: 11
          },
          bodyFont: {
            family: 'Exo 2, sans-serif',
            size: 10
          },
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || ''
              let value = context.parsed.y
              let unit = ''
              if (datasetLabel.includes('Chuva')) unit = ' mm'
              if (datasetLabel.includes('Temperatura')) unit = '°C'
              return `${label}: ${value.toFixed(1)}${unit}`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: 'rgba(200, 223, 245, 0.5)',
            maxRotation: 45,
            minRotation: 45,
            font: {
              size: 9,
              family: 'Share Tech Mono, monospace'
            },
            callback: function(val, index) {
              return index + 1
            }
          },
          title: {
            display: true,
            text: 'Últimas leituras →',
            color: 'rgba(200, 223, 245, 0.4)',
            font: {
              size: 9,
              family: 'Share Tech Mono, monospace'
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: 'rgba(200, 223, 245, 0.5)',
            font: {
              size: 9,
              family: 'Share Tech Mono, monospace'
            },
            callback: function(value) {
              return value.toFixed(0)
            }
          },
          title: {
            display: true,
            text: getYAxisLabel(),
            color: 'rgba(200, 223, 245, 0.4)',
            font: {
              size: 9,
              family: 'Share Tech Mono, monospace'
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      elements: {
        line: {
          borderJoin: 'round',
          borderCap: 'round'
        },
        point: {
          hoverRadius: 5,
          hoverBorderWidth: 2
        }
      },
      layout: {
        padding: {
          top: 10,
          bottom: 5,
          left: 5,
          right: 5
        }
      }
    }
  })
}

const getYAxisLabel = () => {
  if (props.chartType === 'rain') return 'Intensidade (mm/h) →'
  if (props.chartType === 'volume') return 'Acumulado (mm) →'
  if (props.chartType === 'climate') return 'Temperatura (°C) →'
  return 'Valor →'
}

onMounted(() => {
  if (props.data && props.data.length) {
    render()
  }
})

watch(() => props.data, () => {
  render()
}, { deep: true })

watch(() => props.chartType, () => {
  render()
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 200px;
  margin: 0.5rem 0;
  position: relative;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 1024px) {
  .chart-container {
    height: 180px;
  }
}

@media (max-width: 768px) {
  .chart-container {
    height: 160px;
    margin: 0.35rem 0;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 140px;
    margin: 0.25rem 0;
  }
}

@media (prefers-contrast: high) {
  .chart-container {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  canvas {
    transition: none;
  }
}
</style>