<template>
  <div class="layoutPrincipal">
    <header>
      <h1>Data Insights</h1>
    </header>
    
    <main>
      <!-- Onde as páginas da pasta view serão exibidas -->
      <HomeView />
    </main>
  </div>
</template>

<script setup>
import HomeView from './view/HomeView.vue'
</script>

<style scoped>
.layout-principal {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>