<!-- components/FooterSection.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-brand">
        <span class="footer-logo">&lt;WW/&gt;</span>
        <span class="footer-copyright">© 2024-2026 Weather Watch</span>
      </div>
      
      <div class="footer-links">
        <a href="#" class="footer-link">SOBRE</a>
        <a href="#" class="footer-link">PRIVACIDADE</a>
        <a href="#" class="footer-link">CONTATO</a>
        <a href="#" class="footer-link">API</a>
      </div>
      
      <div class="footer-version">
        <span class="version-badge">v2.0.0</span>
        <span class="build-info">build: stable</span>
      </div>
    </div>
    
    <div class="footer-marquee">
      <div class="marquee-text">
        SISTEMA DE MONITORAMENTO EM TEMPO REAL • DADOS DE SENSORES IoT • ALERTAS INTEGRADOS
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  margin-top: auto;
  background: rgba(4, 16, 35, 0.8);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(0, 245, 255, 0.1);
  padding: 1.5rem 2rem 0.75rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-logo {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #00f5ff;
  text-shadow: 0 0 8px rgba(0, 245, 255, 0.5);
}

.footer-copyright {
  font-size: 0.7rem;
  color: rgba(200, 223, 245, 0.4);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: rgba(200, 223, 245, 0.5);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #00f5ff;
}

.footer-version {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.version-badge {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  background: rgba(0, 245, 255, 0.1);
  border: 1px solid rgba(0, 245, 255, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  color: #00f5ff;
}

.build-info {
  font-size: 0.6rem;
  color: rgba(200, 223, 245, 0.3);
}

.footer-marquee {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.marquee-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: rgba(0, 245, 255, 0.3);
  white-space: nowrap;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

@media (max-width: 768px) {
  .footer { padding: 1rem 1rem 0.5rem; }
  .footer-content { flex-direction: column; text-align: center; }
  .footer-links { flex-wrap: wrap; justify-content: center; }
}
</style>