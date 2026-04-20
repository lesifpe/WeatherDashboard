#ifndef FIREBASE_CONFIG_H
#define FIREBASE_CONFIG_H

// =============================================================
//  firebase_config.h — Configuração do Firebase Realtime DB
//  Compartilhado por todas as equipes (firmware/shared/)
//
//  Dependência: Firebase ESP Client
//  https://github.com/mobizt/Firebase-ESP-Client
//
//  Instale via Arduino Library Manager:
//  "Firebase ESP Client" by Mobizt
// =============================================================

#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

// ── Credenciais do projeto Firebase ──────────────────────────
// Encontre em: Firebase Console → Configurações do Projeto
#ifndef FIREBASE_API_KEY
  #define FIREBASE_API_KEY   "SUA_API_KEY_AQUI"
#endif

#ifndef FIREBASE_DB_URL
  #define FIREBASE_DB_URL    "https://seu-projeto-default-rtdb.firebaseio.com/"
#endif

// ── Autenticação anônima (sem login obrigatório) ──────────────
// Para projetos acadêmicos. Em produção, use autenticação completa.
#ifndef FIREBASE_USER_EMAIL
  #define FIREBASE_USER_EMAIL    "sensor@les.ifpe.edu.br"
#endif

#ifndef FIREBASE_USER_PASSWORD
  #define FIREBASE_USER_PASSWORD "senha_firebase_aqui"
#endif

// ── Objetos globais do Firebase ───────────────────────────────
FirebaseData   fbdo;      // Objeto de dados para leitura/escrita
FirebaseAuth   auth;      // Objeto de autenticação
FirebaseConfig config;    // Objeto de configuração

// ── Flag de controle de envio ─────────────────────────────────
bool firebaseReady = false;

// =============================================================
//  initFirebase()
//  Inicializa a conexão com o Firebase.
//  Deve ser chamado em setup(), após connectWiFi().
// =============================================================
void initFirebase() {
  Serial.println("[Firebase] Inicializando...");

  config.api_key           = FIREBASE_API_KEY;
  config.database_url      = FIREBASE_DB_URL;
  config.token_status_callback = tokenStatusCallback; // do TokenHelper

  auth.user.email    = FIREBASE_USER_EMAIL;
  auth.user.password = FIREBASE_USER_PASSWORD;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Aguarda autenticação
  Serial.print("[Firebase] Aguardando autenticação");
  unsigned long timeout = millis();
  while (auth.token.uid == "") {
    Serial.print(".");
    delay(1000);
    if (millis() - timeout > 15000) {
      Serial.println("\n[Firebase] Timeout de autenticação.");
      return;
    }
  }

  firebaseReady = true;
  Serial.println("\n[Firebase] Pronto! UID: " + String(auth.token.uid.c_str()));
}

// =============================================================
//  sendSensorData()
//  Envia um valor float para um caminho no Realtime Database.
//
//  Parâmetros:
//    path  — caminho no DB, ex: "/equipe1/temperatura"
//    value — valor do sensor
//
//  Retorna: true se enviado com sucesso
// =============================================================
bool sendSensorData(const String& path, float value) {
  if (!firebaseReady) return false;

  if (Firebase.RTDB.setFloat(&fbdo, path, value)) {
    return true;
  } else {
    Serial.print("[Firebase] Erro ao enviar para ");
    Serial.print(path);
    Serial.print(": ");
    Serial.println(fbdo.errorReason());
    return false;
  }
}

// =============================================================
//  sendTimestamp()
//  Envia o timestamp do servidor Firebase para o caminho dado.
//  Útil para registrar o horário exato de cada leitura.
// =============================================================
bool sendTimestamp(const String& path) {
  if (!firebaseReady) return false;
  return Firebase.RTDB.setTimestamp(&fbdo, path);
}

#endif // FIREBASE_CONFIG_H
