<!-- src/components/Sidebar.vue -->
<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <span class="sidebar-icon">⌘</span>
      <span class="sidebar-title">GRUPOS</span>
    </div>
    
    <div class="team-list">
      <button
        v-for="equipe in equipesLista"
        :key="equipe.id"
        class="team-btn"
        :class="{ active: selectedEquipeId === equipe.id }"
        @click="selecionarEquipe(equipe.id)"
      >
        <div class="team-indicator" :style="{ background: equipe.cor }"></div>
        <div class="team-info">
          <span class="team-name">{{ equipe.nome }}</span>
          <span class="team-location">{{ equipe.regiao }}</span>
        </div>
        <div class="team-status" :class="equipe.online ? 'online' : 'offline'"></div>
      </button>
    </div>
    
    <div class="sidebar-footer">
      <div class="system-status">
        <span class="status-led"></span>
        <span>SISTEMA OPERACIONAL</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { getEquipes, getEquipePorId } from '../config/equipes.js'

const emit = defineEmits(['team-selected'])

// Carrega as equipes do arquivo central
const equipesLista = ref(getEquipes())
const selectedEquipeId = ref(1)

const selecionarEquipe = (id) => {
  selectedEquipeId.value = id
  const equipe = getEquipePorId(id)
  
  // Converte para o formato esperado pelos outros componentes
  const teamFormatado = {
    id: equipe.id,
    name: equipe.nome,           // ← converte nome → name
    location: equipe.regiao,     // ← converte regiao → location
    color: equipe.cor,           // ← converte cor → color
    online: equipe.online,
    collection: equipe.colecaoFirebase,
    history: equipe.historia,
    members: equipe.membros
  }
  
  emit('team-selected', teamFormatado)
}

// Emitir equipe inicial
selecionarEquipe(1)
</script>

<style scoped>
.sidebar {
  width: 280px;
  background: rgba(4, 16, 35, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 8px;
  border: 1px solid rgba(0, 245, 255, 0.1);
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 500px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem 1rem;
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
  margin-bottom: 1rem;
}

.sidebar-icon {
  font-size: 1.2rem;
  color: #00f5ff;
}

.sidebar-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: rgba(0, 245, 255, 0.7);
}

.team-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.75rem;
}

.team-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0.75rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.team-btn:hover {
  background: rgba(0, 245, 255, 0.08);
  border-color: rgba(0, 245, 255, 0.2);
  transform: translateX(4px);
}

.team-btn.active {
  background: rgba(0, 245, 255, 0.12);
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.1);
}

.team-indicator {
  width: 3px;
  height: 24px;
  border-radius: 2px;
  transition: all 0.2s;
}

.team-btn.active .team-indicator {
  box-shadow: 0 0 8px currentColor;
  width: 4px;
}

.team-info {
  flex: 1;
}

.team-name {
  display: block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: #c8dff5;
  letter-spacing: 1px;
}

.team-location {
  font-size: 0.65rem;
  color: rgba(200, 223, 245, 0.4);
}

.team-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.team-status.online {
  background: #00ff9f;
  box-shadow: 0 0 6px #00ff9f;
  animation: pulse 1.5s infinite;
}

.team-status.offline {
  background: #ff2d55;
  box-shadow: 0 0 4px #ff2d55;
}

.sidebar-footer {
  margin-top: 1.5rem;
  padding: 1rem 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.system-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: rgba(0, 255, 159, 0.7);
  letter-spacing: 1px;
}

.status-led {
  width: 6px;
  height: 6px;
  background: #00ff9f;
  border-radius: 50%;
  box-shadow: 0 0 6px #00ff9f;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

@media (max-width: 1024px) {
  .sidebar { width: 260px; }
  .team-btn { padding: 0.7rem 0.6rem; }
  .team-name { font-size: 0.8rem; }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-height: auto;
  }
  .team-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .team-btn {
    width: calc(50% - 0.25rem);
    padding: 0.6rem 0.5rem;
  }
  .sidebar-header { padding: 0 0.75rem 0.75rem; }
  .sidebar-footer { display: none; }
}

@media (max-width: 480px) {
  .team-btn { width: 100%; padding: 0.5rem; }
  .team-name { font-size: 0.75rem; }
  .team-location { font-size: 0.6rem; }
  .sidebar-icon { font-size: 1rem; }
  .sidebar-title { font-size: 0.65rem; }
}
</style>