<script setup>
import { ref, onMounted } from 'vue'
const menuAberto = ref(false)

const isDark = ref(false)
onMounted(() => {
  const temaSalvo = localStorage.getItem('tema')
  if (temaSalvo === 'escuro') {
    isDark.value = true
    document.body.classList.add('dark-mode')
  }
})
const alternarTema = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.body.classList.add('dark-mode')
    localStorage.setItem('tema', 'escuro')
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('tema', 'claro')
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-logo">
      <img src="../../assets/data-insightsl-ogo.png" alt="Logo Data Insights" class="logo-img" />
      <span class="texto-gradiente">Data Insights</span>
    </div>
    
    <ul class="nav-links">
      <li><router-link to="/" active-class="active">Início</router-link></li>
      <li><router-link to="/Sobre" active-class="active">Sobre</router-link></li>
      <li><router-link to="/Contato" active-class="active">Contato</router-link></li>
      <li class="dropdown-container">
        <button @click="menuAberto = !menuAberto" class="nav-botao" :class="{ 'active': menuAberto }">
          Projetos <span style="font-size: 0.8rem;">{{ menuAberto ? '⌃' : '⌄' }}</span>
        </button>
        <div v-show="menuAberto" class="dropdown-menu">
          <router-link to="/Weather" class="dropdown-item" @click="menuAberto = false">
            <!-- <div class="icone-projeto">
            <img src="../../assets/icone.png" alt="Ícone Clima" class="img-projeto" />
            </div> Futuro icone do projeto. -->
            <div class="item-texto">
              <span class="item-titulo">WeatherDashboard</span>
              <span class="item-subtitulo">Dados meteorológicos</span>
            </div>
          </router-link>
          <router-link to="/AIOTADS" class="dropdown-item" @click="menuAberto = false">
            <!-- <div class="icone-projeto">
              <img src="../../assets/icone.png" alt="Ícone Clima" class="img-projeto" />
            </div> Futuro icone do projeto. -->
            <div class="item-texto">
              <span class="item-titulo">AIOTADS</span>
              <span class="item-subtitulo">Movimentação IFPE ADS</span>
            </div>
          </router-link>
        </div>
      </li>
    </ul>
    
    <button @click="alternarTema" class="theme-toggle" aria-label="Alternar Tema">
      {{ isDark ? '☀️' : '🌙' }}
    </button>
  </nav>
</template>