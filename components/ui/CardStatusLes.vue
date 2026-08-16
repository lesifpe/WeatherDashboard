<template>
  <div class="status-card">
    <h3 class="status-numero texto-gradiente">{{ numero }}</h3>
    <p class="status-label">{{ rotulo }}</p>
  </div>
</template>

<script setup>
defineProps({
  numero: {
    type: String,
    required: true
  },
  rotulo: {
    type: String,
    required: true
  }
})
</script>