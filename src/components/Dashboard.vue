<!-- src/components/Dashboard.vue (Versão 2 - Melhor) -->
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
import { rtdb } from '../firebase/config.js'
import { ref as dbRef, onValue } from 'firebase/database'

const props = defineProps({
  selectedTeam: {
    type: Object,
    default: null
  }
})

const weatherData = ref([])
const loading = ref(false)
const error = ref(null)
let unsubscribe = null

const loadTeamData = () => {
  // Limpar inscrição anterior
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  
  if (!props.selectedTeam || !props.selectedTeam.collection) {
    weatherData.value = []
    loading.value = false
    return
  }
  
  loading.value = true
  error.value = null
  
  // Conexão direta com Realtime Database
  const path = `${props.selectedTeam.collection}/leituras`
  const leiturasRef = dbRef(rtdb, path)
  
  unsubscribe = onValue(leiturasRef, (snapshot) => {
    const items = []
    
    if (snapshot.exists()) {
      const dados = snapshot.val()
      
      Object.keys(dados).forEach((key) => {
        const item = dados[key]
        items.push({
          id: key,
          ...item,
          timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
        })
      })
      
      // Ordenar por timestamp (mais recente primeiro)
      items.sort((a, b) => {
        const timeA = a.timestamp?.getTime() || 0
        const timeB = b.timestamp?.getTime() || 0
        return timeB - timeA
      })
      
      weatherData.value = items.slice(0, 50) // Últimas 50 leituras
      error.value = null
    } else {
      weatherData.value = []
      console.log(`ℹ️ Nenhum dado encontrado em ${path}`)
    }
    
    loading.value = false
  }, (err) => {
    console.error(`❌ Erro ao carregar ${props.selectedTeam.collection}:`, err)
    error.value = err.message
    weatherData.value = []
    loading.value = false
  })
}

// Quando a equipe mudar, recarrega os dados
watch(() => props.selectedTeam, () => {
  loadTeamData()
}, { immediate: true })

// Limpar ao desmontar
onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
    console.log('🧹 Listener removido')
  }
})
</script>

<style scoped>
/* Seu CSS existente aqui */
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