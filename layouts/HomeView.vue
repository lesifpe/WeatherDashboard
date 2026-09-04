<template>
  <section class="hero-section">
    <div class="hero-bg-glow"></div>
    
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
        Conheça o LES <span>&rarr;</span>
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
  </section>
</template>

<script setup>
import { ref } from 'vue'
const menuAberto = ref(false) 
</script>