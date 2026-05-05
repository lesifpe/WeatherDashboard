<!-- src/components/ProjectHistory.vue -->
<template>
  <div class="project-history">
    <div class="history-header">
      <span class="history-icon">⏣</span>
      <h2 class="history-title">
        {{ selectedTeam ? `HISTÓRIA - EQUIPE ${selectedTeam.name}` : 'HISTÓRIA DO PROJETO' }}
      </h2>
    </div>
    
    <div class="history-content">
      <div class="history-text">
        <p class="history-paragraph">
          {{ historiaAtual.descricao }}
        </p>
        
        <div class="history-milestones">
          <div class="milestone" v-for="marco in historiaAtual.marcos" :key="marco.ano">
            <div class="milestone-year">{{ marco.ano }}</div>
            <div class="milestone-desc">{{ marco.descricao }}</div>
          </div>
        </div>
      </div>
      
      <div class="team-members">
        <h3 class="members-title">EQUIPE - {{ selectedTeam ? selectedTeam.name : 'GERAL' }}</h3>
        <div class="members-grid">
          <div class="member-card" v-for="membro in membrosAtuais" :key="membro.nome">
            <div class="member-avatar" :style="{ background: membro.cor }">
              {{ membro.iniciais }}
            </div>
            <div class="member-info">
              <span class="member-name">{{ membro.nome }}</span>
              <span class="member-role">{{ membro.cargo }}</span>
            </div>
          </div>
        </div>
        
        <div class="team-expertise">
          <span class="expertise-label">ÁREA:</span>
          <span class="expertise-value">{{ historiaAtual.especialidade }}</span>
        </div>
      </div>
    </div>
    
    <div class="tech-stack">
      <span class="tech-item" v-for="tech in historiaAtual.tecnologias" :key="tech">{{ tech }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { equipePadrao } from '../config/equipes.js'

const props = defineProps({
  selectedTeam: {
    type: Object,
    default: null
  }
})

const historiaAtual = computed(() => {
  if (props.selectedTeam && props.selectedTeam.history) {
    return props.selectedTeam.history
  }
  return equipePadrao.historia
})

const membrosAtuais = computed(() => {
  if (props.selectedTeam && props.selectedTeam.members) {
    return props.selectedTeam.members
  }
  return equipePadrao.membros
})
</script>

<style scoped>
/* Estilos mantidos iguais */
.project-history {
  background: rgba(4, 16, 35, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 8px;
  border: 1px solid rgba(0, 245, 255, 0.1);
  padding: 1.5rem;
  min-height: 500px;
}

.history-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
  margin-bottom: 1.5rem;
}

.history-icon {
  font-size: 1.5rem;
  color: #00f5ff;
}

.history-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  letter-spacing: 3px;
  color: #00f5ff;
  margin: 0;
}

.history-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.history-paragraph {
  color: rgba(200, 223, 245, 0.85);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.history-milestones {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.milestone {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.milestone-year {
  font-family: 'Share Tech Mono', monospace;
  font-weight: 700;
  color: #00f5ff;
  min-width: 60px;
}

.milestone-desc {
  font-size: 0.85rem;
  color: rgba(200, 223, 245, 0.65);
}

.team-members {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 1rem;
}

.members-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: rgba(0, 245, 255, 0.7);
  margin-bottom: 1rem;
}

.members-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.member-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.member-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #030711;
  flex-shrink: 0;
}

.member-info {
  display: flex;
  flex-direction: column;
}

.member-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #c8dff5;
}

.member-role {
  font-size: 0.65rem;
  color: rgba(200, 223, 245, 0.5);
}

.team-expertise {
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: baseline;
}

.expertise-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 1px;
  color: rgba(0, 245, 255, 0.5);
}

.expertise-value {
  font-size: 0.75rem;
  color: rgba(200, 223, 245, 0.7);
  font-weight: 500;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.tech-item {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: rgba(0, 245, 255, 0.5);
  background: rgba(0, 245, 255, 0.05);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .project-history { padding: 1rem; }
  .history-content { grid-template-columns: 1fr; gap: 1rem; }
  .history-title { font-size: 0.8rem; }
}
</style>