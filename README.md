# 📡 ESP32 + Firebase Realtime Dashboard

Sistema de monitoramento em tempo real utilizando **ESP32** e **Firebase Realtime Database**, com visualização em um dashboard web.

---

## 📌 Visão Geral

O projeto coleta dados de sensores (temperatura e chuva) via ESP32 e envia para o Firebase.  
Uma aplicação web consome esses dados e exibe em um dashboard interativo.

---

## 🎯 Funcionalidades

- 📡 Coleta de dados via ESP32  
- ☁️ Envio em tempo real para o Firebase  
- 📈 Dashboard com atualização automática  
- 👥 Visualização separada por equipes  

---

## 🧩 Tecnologias

- **Hardware:** ESP32, sensores  
- **Backend:** Firebase Realtime Database  
- **Frontend:** HTML, CSS, TypeScript (React opcional)  

---

## 👥 Estrutura

O sistema é dividido em equipes, cada uma com:

- Um ESP32  
- Um Firebase independente  
- Um fluxo de dados isolado  

---

## 🚀 Como executar

### 1. Clonar o repositório
```bash
git clone https://github.com/lesifpe/mestrado-sensor-dashboard.git
cd mestrado-sensor-dashboard
