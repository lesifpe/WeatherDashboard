<!-- components/HeroSection.vue -->
<template>
  <header class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        SISTEMA DE MONITORAMENTO — v2.0
      </div>
      
      <h1 class="hero-title">
        <span class="title-glow">Weather</span>
        <span class="title-accent">Watch</span>
      </h1>
      
      <p class="hero-subtitle">
        Monitoramento inteligente de condições climáticas<br>
        e prevenção de desastres naturais
      </p>
      
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-value">4</span>
          <span class="stat-label">Equipes</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">24/7</span>
          <span class="stat-label">Monitoramento</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">Real-time</span>
          <span class="stat-label">Alertas</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 3rem 2rem 2.5rem;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 245, 255, 0.15);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 30% 40%, rgba(0, 245, 255, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 60%, rgba(0, 100, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: rgba(0, 245, 255, 0.7);
  background: rgba(0, 245, 255, 0.08);
  padding: 0.3rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 245, 255, 0.2);
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #00f5ff;
  border-radius: 50%;
  box-shadow: 0 0 6px #00f5ff;
  animation: pulse 1.5s infinite;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
}

.title-glow {
  background: linear-gradient(135deg, #ffffff 0%, #00f5ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px rgba(0, 245, 255, 0.3);
}

.title-accent {
  background: linear-gradient(135deg, #00f5ff 0%, #0088ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1rem;
  color: rgba(200, 223, 245, 0.7);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #00f5ff;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
}

.stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(200, 223, 245, 0.5);
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(0, 245, 255, 0.2);
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* Responsivo */
@media (max-width: 1024px) {
  .hero { padding: 2.5rem 1.5rem 2rem; }
  .hero-title { font-size: 3.5rem; }
}

@media (max-width: 768px) {
  .hero { padding: 2rem 1rem 1.5rem; }
  .hero-title { font-size: 2.5rem; }
  .hero-subtitle { font-size: 0.85rem; margin-bottom: 1.5rem; }
  .hero-subtitle br { display: none; }
  .hero-stats { gap: 1rem; }
  .stat-value { font-size: 1.2rem; }
  .stat-label { font-size: 0.6rem; }
  .stat-divider { height: 20px; }
  .hero-badge { font-size: 0.6rem; padding: 0.2rem 0.8rem; }
}

@media (max-width: 480px) {
  .hero { padding: 1.5rem 0.75rem 1rem; }
  .hero-title { font-size: 1.8rem; }
  .hero-stats { gap: 0.75rem; }
  .stat-value { font-size: 1rem; }
  .stat-label { font-size: 0.5rem; }
}
</style>