<template>
  <div id="app">

    <!-- HERO (compacto) -->
    <header class="hero">
      <div class="hero-grid"></div>
      <div class="hero-glow left"></div>
      <div class="hero-glow right"></div>

      <div class="hero-content fade-in">
        <div class="hero-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">INSTITUTO FEDERAL // ESP32 IoT Network</span>
          <span class="eyebrow-line"></span>
        </div>

        <h1 class="hero-title">
          Plataforma Meteorológica
          <span class="title-accent">IoT</span>
        </h1>

        <p class="subtitle">
          Sistema de monitoramento ambiental em tempo real com ESP32 + Firebase
        </p>

        <div class="badges">
          <span class="badge-item"><span class="badge-dot cyan"></span>IoT</span>
          <span class="badge-item"><span class="badge-dot green"></span>Vue 3</span>
          <span class="badge-item"><span class="badge-dot orange"></span>Firebase</span>
          <span class="badge-item"><span class="badge-dot purple"></span>Tempo Real</span>
        </div>
      </div>
    </header>

    <!-- CONTEÚDO INSTITUCIONAL -->
    <main class="container">

      <section class="card fade-in">
        <div class="card-label">// 01</div>
        <h2 class="section-title">
          <span class="title-icon">◈</span> Sobre o Projeto
        </h2>
        <p class="section-text">
          Plataforma desenvolvida para monitoramento climático em tempo real utilizando sensores IoT
          conectados ao ESP32. Os dados são transmitidos para o Firebase e consumidos por um
          dashboard web moderno.
        </p>
      </section>

      <section class="card fade-in">
        <div class="card-label">// 02</div>
        <h2 class="section-title">
          <span class="title-icon">◈</span> Modelo de Colaboração
        </h2>

        <div class="grid">
          <div class="mini-card">
            <div class="mini-card-icon cyan">FE</div>
            <h3>Frontend</h3>
            <p>Vue 3 + Vite + Chart.js</p>
          </div>
          <div class="mini-card">
            <div class="mini-card-icon orange">DB</div>
            <h3>Backend</h3>
            <p>Firebase Realtime Database</p>
          </div>
          <div class="mini-card">
            <div class="mini-card-icon green">HW</div>
            <h3>Hardware</h3>
            <p>ESP32 + Sensores ambientais</p>
          </div>
        </div>
      </section>

      <section class="card fade-in">
        <div class="card-label">// 03</div>
        <h2 class="section-title">
          <span class="title-icon">◈</span> Equipe
        </h2>

        <div class="team">
          <div class="member" v-for="(m, i) in team" :key="i" :style="{ '--member-color': m.color }">
            <div class="avatar">{{ m.initials }}</div>
            <div class="member-info">
              <strong>{{ m.name }}</strong>
              <span>{{ m.role }}</span>
            </div>
            <div class="member-tag">{{ m.tag }}</div>
          </div>
        </div>
      </section>

    </main>

    <div class="dashboard-container">
      <Dashboard />
    </div>

    <footer class="app-footer">
      <div class="footer-line"></div>
      <span class="text-mono text-muted">
        © {{ new Date().getFullYear() }} PLATAFORMA IoT METEOROLÓGICA — INSTITUTO FEDERAL
      </span>
    </footer>

  </div>
</template>

<script setup>
import Dashboard from './components/Dashboard.vue';

const team = [
  { initials: 'YS', name: 'Yuri Santos',  role: 'Full Stack / IoT',      tag: 'DEV',  color: '#00f5ff' },
  { initials: 'AM', name: 'Ana Maria',    role: 'Frontend / UX',          tag: 'UX',   color: '#7b2fff' },
  { initials: 'JP', name: 'João Pedro',   role: 'Hardware / ESP32',        tag: 'HW',   color: '#00ff9f' },
  { initials: 'LS', name: 'Lucas Silva',  role: 'Backend / Firebase',      tag: 'DB',   color: '#ff6b35' },
];
</script>

<style>
/* ================================
   RESET + FONTES
================================ */
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Exo 2', sans-serif;
  background: #040d1a;
  background-image:
    radial-gradient(ellipse at 20% 10%, rgba(0, 200, 255, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 90%, rgba(123, 47, 255, 0.05) 0%, transparent 50%);
  color: #c8dff5;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ================================
   HERO (COMPACTO)
================================ */
.hero {
  position: relative;
  padding: 50px 20px 40px; /* reduzido de 90px 20px 70px */
  text-align: center;
  background: rgba(4, 16, 35, 0.6);
  border-bottom: 1px solid rgba(0, 245, 255, 0.1);
  overflow: hidden;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 245, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px; /* reduzido de 400px */
  height: 300px;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
  opacity: 0.1;
}
.hero-glow.left  { left: -80px;  background: #00f5ff; }
.hero-glow.right { right: -80px; background: #7b2fff; }

.hero-content { position: relative; z-index: 2; }

.hero-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1rem; /* reduzido de 1.5rem */
}
.eyebrow-line {
  flex: 1;
  max-width: 60px; /* reduzido de 80px */
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.4));
}
.eyebrow-line:last-child {
  background: linear-gradient(90deg, rgba(0, 245, 255, 0.4), transparent);
}
.eyebrow-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem; /* ligeiramente menor */
  color: rgba(0, 245, 255, 0.5);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero-title {
  font-size: 2.4rem; /* reduzido de 2.8rem */
  font-weight: 800;
  color: #e8f4ff;
  letter-spacing: 1px;
  line-height: 1.2;
  margin-bottom: 0.75rem; /* reduzido de 1rem */
}
.title-accent {
  color: #00f5ff;
  text-shadow: 0 0 15px rgba(0, 245, 255, 0.4);
}

.subtitle {
  color: rgba(200, 223, 245, 0.55);
  font-size: 0.9rem;
  max-width: 480px;
  margin: 0 auto 1.25rem; /* reduzido de 1.75rem */
  line-height: 1.6;
}

.badges {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  flex-wrap: wrap;
}
.badge-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(200, 223, 245, 0.6);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.3rem 0.75rem;
  border-radius: 2px;
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.badge-dot.cyan   { background: #00f5ff; box-shadow: 0 0 5px #00f5ff; }
.badge-dot.green  { background: #00ff9f; box-shadow: 0 0 5px #00ff9f; }
.badge-dot.orange { background: #ff6b35; box-shadow: 0 0 5px #ff6b35; }
.badge-dot.purple { background: #7b2fff; box-shadow: 0 0 5px #7b2fff; }

/* ================================
   CONTAINER (margem ajustada)
================================ */
.container {
  max-width: 1100px;
  margin: -20px auto 40px; /* menos negativo que -30px */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  z-index: 2;
}

/* ================================
   CARDS
================================ */
.card {
  background: rgba(4, 16, 35, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-top: 2px solid rgba(0, 245, 255, 0.35);
  border-radius: 4px;
  padding: 1.5rem;
  position: relative;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  border-color: rgba(0, 245, 255, 0.15);
  box-shadow: 0 0 24px rgba(0, 200, 255, 0.05), 0 12px 30px rgba(0,0,0,0.4);
}

.card-label {
  position: absolute;
  top: 1rem; right: 1.25rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: rgba(0, 245, 255, 0.2);
  letter-spacing: 2px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #e8f4ff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  letter-spacing: 0.5px;
}
.title-icon { color: #00f5ff; font-size: 0.85rem; }

.section-text {
  color: rgba(200, 223, 245, 0.55);
  font-size: 0.9rem;
  line-height: 1.75;
}

/* ================================
   MINI CARDS
================================ */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}
.mini-card {
  background: rgba(0, 200, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  padding: 1rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.mini-card:hover {
  background: rgba(0, 200, 255, 0.06);
  border-color: rgba(0, 245, 255, 0.15);
}
.mini-card-icon {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 0.25rem 0.6rem;
  border-radius: 2px;
  display: inline-block;
  margin-bottom: 0.65rem;
}
.mini-card-icon.cyan   { background: rgba(0, 245, 255, 0.1);  border: 1px solid rgba(0, 245, 255, 0.3);  color: #00f5ff; }
.mini-card-icon.orange { background: rgba(255, 107, 53, 0.1); border: 1px solid rgba(255, 107, 53, 0.3); color: #ff6b35; }
.mini-card-icon.green  { background: rgba(0, 255, 159, 0.1);  border: 1px solid rgba(0, 255, 159, 0.3);  color: #00ff9f; }

.mini-card h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #e8f4ff;
  margin-bottom: 0.25rem;
}
.mini-card p {
  font-size: 0.78rem;
  color: rgba(200, 223, 245, 0.45);
}

/* ================================
   TEAM
================================ */
.team {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.member {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 200, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 2px solid var(--member-color, #00f5ff);
  border-radius: 3px;
  padding: 0.75rem 1rem;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.member:hover {
  background: rgba(0, 200, 255, 0.05);
}
.avatar {
  width: 38px; height: 38px;
  border-radius: 2px;
  border: 1px solid var(--member-color, #00f5ff);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--member-color, #00f5ff);
  flex-shrink: 0;
  box-shadow: 0 0 8px rgba(0, 245, 255, 0.2);
}
.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.member-info strong {
  font-size: 0.9rem;
  font-weight: 700;
  color: #e8f4ff;
}
.member-info span {
  font-size: 0.75rem;
  color: rgba(200, 223, 245, 0.4);
}
.member-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 1.5px;
  color: var(--member-color, #00f5ff);
  border: 1px solid var(--member-color, #00f5ff);
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
  opacity: 0.6;
  flex-shrink: 0;
}

/* ================================
   DASHBOARD CONTAINER
================================ */
.dashboard-container {
  max-width: 1100px;
  margin: 0 auto 40px;
  padding: 0 20px;
  width: 100%;
}

/* ================================
   FOOTER
================================ */
.app-footer {
  text-align: center;
  padding: 1.5rem 1rem 2rem;
  margin-top: auto;
}
.footer-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.2), transparent);
  margin-bottom: 1rem;
}
.app-footer span {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: rgba(91, 163, 201, 0.45);
  letter-spacing: 1.5px;
}

/* ================================
   ANIMAÇÕES
================================ */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeInUp 0.6s ease-out both; }

/* ================================
   RESPONSIVO
================================ */
@media (max-width: 768px) {
  .hero-title    { font-size: 1.8rem; } /* reduzido proporcionalmente */
  .hero          { padding: 40px 20px 30px; }
  .container     { padding: 12px; margin-top: -16px; }
  .card          { padding: 1.1rem; }
  .member-tag    { display: none; }
}
</style>