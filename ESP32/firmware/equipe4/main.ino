// =============================================================
//  firmware/equipe4/main.ino
//  Equipe 4 — Sensores: Temperatura (DHT22) + Chuva (FC-37)
//
//  Placa: ESP32 DevKit V1
//  Intervalo de envio: 10 segundos
//
//  Estrutura no Firebase Realtime Database:
//    /equipe4/
//      temperatura   → float (°C)
//      chuva         → float (0–100 %)
//      timestamp     → server timestamp
//      status        → "online" | "offline"
// =============================================================

// ── Credenciais (defina ANTES dos includes) ───────────────────
#define WIFI_SSID          "NOME_DA_REDE"
#define WIFI_PASSWORD      "SENHA_DA_REDE"
#define FIREBASE_API_KEY   "SUA_API_KEY_EQUIPE4"
#define FIREBASE_DB_URL    "https://seu-projeto-default-rtdb.equipe4-rtdb.firebaseio.com/"
#define FIREBASE_USER_EMAIL    "sensor@les.ifpe.edu.br"
#define FIREBASE_USER_PASSWORD "senha_firebase"

// ── Includes compartilhados ───────────────────────────────────
#include "../shared/wifi.h"
#include "../shared/firebase_config.h"

// ── Biblioteca do sensor DHT ──────────────────────────────────
// Instale via Library Manager: "DHT sensor library" by Adafruit
#include <DHT.h>

// ── Identificação da equipe ───────────────────────────────────
#define EQUIPE_ID     "equipe4"
#define EQUIPE_NOME   "Equipe 4"

// ── Pinos ─────────────────────────────────────────────────────
#define PIN_DHT       4     // GPIO4 → Pino de dados do DHT22
#define PIN_CHUVA     34    // GPIO34 → Saída analógica do FC-37 (ADC1)
#define PIN_LED       2     // GPIO2 → LED onboard (feedback visual)

// ── Configuração do DHT ───────────────────────────────────────
#define DHT_TYPE      DHT22
DHT dht(PIN_DHT, DHT_TYPE);

// ── Intervalo entre leituras ──────────────────────────────────
#define INTERVALO_MS  10000UL   // 10 segundos

unsigned long ultimoEnvio = 0;

// ── Caminhos no Firebase ──────────────────────────────────────
const String BASE_PATH    = "/" + String(EQUIPE_ID) + "/";
const String PATH_TEMP    = BASE_PATH + "temperatura";
const String PATH_CHUVA   = BASE_PATH + "chuva";
const String PATH_TS      = BASE_PATH + "timestamp";
const String PATH_STATUS  = BASE_PATH + "status";

// =============================================================
void setup() {
  Serial.begin(115200);
  Serial.println("=== " + String(EQUIPE_NOME) + " — Iniciando ===");

  pinMode(PIN_LED, OUTPUT);
  digitalWrite(PIN_LED, LOW);

  dht.begin();

  // Conecta ao Wi-Fi (bloqueia até conectar ou reiniciar)
  connectWiFi();

  // Inicializa Firebase e aguarda autenticação
  initFirebase();

  // Marca equipe como online no banco
  Firebase.RTDB.setString(&fbdo, PATH_STATUS, "online");

  Serial.println("[Setup] Pronto para enviar dados.");
}

// =============================================================
void loop() {
  // Verifica conectividade Wi-Fi a cada ciclo
  checkWiFi();

  unsigned long agora = millis();
  if (agora - ultimoEnvio < INTERVALO_MS) return;
  ultimoEnvio = agora;

  // ── Leitura do DHT22 ────────────────────────────────────────
  float temperatura = dht.readTemperature();

  if (isnan(temperatura)) {
    Serial.println("[Sensor] Falha na leitura do DHT22.");
    return;
  }

  // ── Leitura do sensor de chuva (FC-37) ──────────────────────
  // O FC-37 retorna ~4095 quando SECO e ~0 quando MOLHADO
  // Invertemos para obter porcentagem de umidade (0 = seco, 100 = encharcado)
  int rawChuva   = analogRead(PIN_CHUVA);
  float chuva    = map(rawChuva, 4095, 0, 0, 100);
  chuva          = constrain(chuva, 0, 100);

  Serial.printf("[Leitura] Temp: %.1f°C | Chuva: %.0f%%\n", temperatura, chuva);

  // ── Envio para o Firebase ────────────────────────────────────
  digitalWrite(PIN_LED, HIGH);   // LED acende durante o envio

  bool ok = true;
  ok &= sendSensorData(PATH_TEMP,  temperatura);
  ok &= sendSensorData(PATH_CHUVA, chuva);
  ok &= sendTimestamp(PATH_TS);

  if (ok) {
    Serial.println("[Firebase] Dados enviados com sucesso.");
  } else {
    Serial.println("[Firebase] Falha em um ou mais envios.");
  }

  delay(50);
  digitalWrite(PIN_LED, LOW);    // Apaga LED
}
