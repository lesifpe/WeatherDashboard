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
      <li><a href="#">Projetos</a></li>
    </ul>
    
    <button class="theme-toggle" aria-label="Alternar Tema">
      🌙
    </button>
  </nav>
</template>