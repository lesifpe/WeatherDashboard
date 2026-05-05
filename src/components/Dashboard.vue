<!-- src/components/Dashboard.vue -->
<template>
  <div class="dashboard-container">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <span>CARREGANDO DADOS...</span>
    </div>

    <div v-else-if="!selectedTeam" class="empty-container">
      <span>Selecione um grupo para visualizar os dados</span>
    </div>

    <div v-else-if="error" class="error-container">
      <span class="error-icon">⚠</span>
      <span>Erro ao carregar dados: {{ error }}</span>
    </div>

    <div v-else-if="!weatherData || weatherData.length === 0" class="empty-container">
      <span>Nenhum dado disponível para {{ selectedTeam.name }}</span>
    </div>

    <div v-else class="dashboard-grid">
      <EquipeCard
        :equipeName="selectedTeam.name"
        :equipeColor="selectedTeam.color"
        :weatherData="weatherData"
        :isTestMode="false"
        :connectionStatus="selectedTeam.online"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import EquipeCard from './EquipeCard.vue'
import { useWeatherData } from '../composables/useWeatherData'

const props = defineProps({
  selectedTeam: {
    type: Object,
    default: null
  }
})

const weatherData = ref([])
const loading = ref(false)
const error = ref(null)
let currentUnsubscribe = null
let currentCheckInterval = null

const loadTeamData = () => {
  // Limpar dados anteriores
  if (currentUnsubscribe) {
    currentUnsubscribe()
    currentUnsubscribe = null
  }
  if (currentCheckInterval) {
    clearInterval(currentCheckInterval)
    currentCheckInterval = null
  }
  
  if (!props.selectedTeam || !props.selectedTeam.collection) {
    weatherData.value = []
    loading.value = false
    return
  }
  
  loading.value = true
  error.value = null
  weatherData.value = []
  
  const { data, loading: dataLoading, error: dataError } = useWeatherData(props.selectedTeam.collection)
  
  const checkLoading = () => {
    if (!dataLoading.value) {
      if (dataError.value) {
        error.value = dataError.value
        weatherData.value = []
      } else if (data.value && data.value.length > 0) {
        weatherData.value = data.value
        error.value = null
      } else {
        weatherData.value = []
      }
      loading.value = false
      
      if (currentCheckInterval) {
        clearInterval(currentCheckInterval)
        currentCheckInterval = null
      }
    }
  }
  
  checkLoading()
  currentCheckInterval = setInterval(checkLoading, 100)
  currentUnsubscribe = () => {
    if (currentCheckInterval) clearInterval(currentCheckInterval)
  }
}

onUnmounted(() => {
  if (currentUnsubscribe) currentUnsubscribe()
})

watch(() => props.selectedTeam, () => {
  loadTeamData()
}, { immediate: true, deep: true })
</script>

<style scoped>
.dashboard-container {
  background: rgba(4, 16, 35, 0.4);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  padding: 1rem;
  min-height: 500px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.loading-container,
.empty-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 400px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-align: center;
  padding: 2rem;
}

.loading-container {
  color: rgba(0, 245, 255, 0.6);
}

.empty-container {
  color: rgba(200, 223, 245, 0.4);
}

.error-container {
  color: #ff2d55;
}

.error-icon {
  font-size: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(0, 245, 255, 0.2);
  border-top-color: #00f5ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .dashboard-container { padding: 0.75rem; min-height: 400px; }
  .loading-container, .empty-container, .error-container { min-height: 300px; font-size: 0.7rem; padding: 1.5rem; }
  .loading-spinner { width: 32px; height: 32px; }
}
</style>