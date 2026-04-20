#ifndef WIFI_H
#define WIFI_H

// =============================================================
//  wifi.h — Configuração de rede Wi-Fi
//  Compartilhado por todas as equipes (firmware/shared/)
//
//  ⚠️  NUNCA faça commit com credenciais reais.
//      Use um arquivo .env ou defina as macros antes de incluir:
//
//      #define WIFI_SSID     "MinhaRede"
//      #define WIFI_PASSWORD "MinhaSenha"
//      #include "wifi.h"
// =============================================================

#include <WiFi.h>

// ── Credenciais ───────────────────────────────────────────────
#ifndef WIFI_SSID
  #define WIFI_SSID     "SEU_SSID_AQUI"
#endif

#ifndef WIFI_PASSWORD
  #define WIFI_PASSWORD "SUA_SENHA_AQUI"
#endif

// ── Configurações de reconexão ────────────────────────────────
#define WIFI_MAX_RETRIES     20       // Tentativas antes de reiniciar
#define WIFI_RETRY_DELAY_MS  500      // Intervalo entre tentativas (ms)

// =============================================================
//  connectWiFi()
//  Tenta conectar ao Wi-Fi até WIFI_MAX_RETRIES vezes.
//  Se não conseguir, reinicia o ESP32 automaticamente.
// =============================================================
void connectWiFi() {
  Serial.print("[WiFi] Conectando a: ");
  Serial.println(WIFI_SSID);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int retries = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(WIFI_RETRY_DELAY_MS);
    Serial.print(".");
    retries++;

    if (retries >= WIFI_MAX_RETRIES) {
      Serial.println("\n[WiFi] FALHA na conexão. Reiniciando...");
      ESP.restart();
    }
  }

  Serial.println("\n[WiFi] Conectado!");
  Serial.print("[WiFi] IP local: ");
  Serial.println(WiFi.localIP());
}

// =============================================================
//  checkWiFi()
//  Verifica conectividade e tenta reconectar se necessário.
//  Chame no loop() para garantir estabilidade contínua.
// =============================================================
void checkWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[WiFi] Conexão perdida. Reconectando...");
    connectWiFi();
  }
}

#endif // WIFI_H
