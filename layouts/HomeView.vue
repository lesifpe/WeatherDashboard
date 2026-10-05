<template>
  <section class="hero-section">
    
    <h1 class="hero-titulo texto-gradiente">Data Insights</h1>
    
    <p class="hero-subtitulo">
      Uma plataforma open-source desenvolvida pelo <strong>LES — IFPE Recife</strong> para coletar,
      integrar e visualizar dados de projetos acadêmicos e de pesquisa, de forma centralizada e acessível.
    </p>
    
    <p class="hero-descricao">
      Conectamos sensores IoT, APIs e bases de dados heterogêneas num único pipeline —
      transformando dados brutos em insights claros e dashboards interativos.
    </p>
    
    <div class="hero-botoes">
      <a href="https://lesifpe.com.br/" target="_blank" rel="noopener noreferrer" class="bto-primario">
        Conheça a LES <span>&rarr;</span>
      </a>
      
      <div class="dropdown-container">
        <button @click="menuAberto = !menuAberto" class="bto-secondario" :class="{ 'active': menuAberto }">
          Projetos <span style="font-size: 0.8rem; margin-left: 6px;">{{ menuAberto ? '⌃' : '⌄' }}</span>
        </button>
        
        <div v-show="menuAberto" class="dropdown-menu">
          <router-link to="/Weather" class="dropdown-item" @click="menuAberto = false">
            <div class="item-texto">
              <span class="item-titulo">WeatherDashboard</span>
              <span class="item-subtitulo">Dados meteorológicos</span>
            </div>
          </router-link>
          
          <router-link to="/AIOTADS" class="dropdown-item" @click="menuAberto = false">
            <div class="item-texto">
              <span class="item-titulo">AIOTADS</span>
              <span class="item-subtitulo">Movimentação IFPE ADS</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="hero-art-card">
      <svg viewBox="0 0 1000 400" preserveAspectRatio="none" class="data-art-svg">
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(128, 128, 128, 0.15)" stroke-width="1"/>
          </pattern>
          <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.9" />
          </linearGradient>
          <linearGradient id="gradPink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#d946ef" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#7e22ce" stop-opacity="0.9" />
          </linearGradient>
          <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f97316" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#9a3412" stop-opacity="0.95" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
        <path d="M 0 250 L 200 150 L 400 280 L 600 100 L 800 180 L 1000 50" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.5"/>
        <path d="M 0 350 L 300 200 L 500 250 L 700 150 L 900 250 L 1000 120" fill="none" stroke="#f472b6" stroke-width="2" opacity="0.5"/>
        <path d="M 0 300 C 150 200, 250 100, 450 180 C 650 260, 750 50, 1000 80 L 1000 400 L 0 400 Z" fill="url(#gradBlue)" />
        <path d="M 0 350 C 200 300, 300 150, 500 250 C 700 350, 800 100, 1000 150 L 1000 400 L 0 400 Z" fill="url(#gradPink)" />
        <path d="M 0 400 C 250 350, 350 250, 600 320 C 800 380, 850 180, 1000 220 L 1000 400 L 0 400 Z" fill="url(#gradOrange)" />
      </svg>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
const menuAberto = ref(false) 
</script>