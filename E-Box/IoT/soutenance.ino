#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <time.h>
#include <ArduinoJson.h>

// Définir les broches pour le module RC522
#define SS_PIN 5  // Broche de sélection (SDA)
#define RST_PIN 27 // Broche de réinitialisation (RESET)

// Définir les broches pour le buzzer et la LED
#define BUZZER_PIN 13
#define LED_PIN 14
#define LED2_PIN 12 //////////

// Définir les informations de votre réseau WiFi
const char* ssid = "Orange-15D6";
const char* password = "NaTbt7i3MeR";

// Définir l'adresse IP du Raspberry Pi
const char* mqtt_server = "192.168.211.178";

// Définir le nom d'utilisateur et le mot de passe MQTT
const char* mqtt_user = "rpi";
const char* mqtt_password = "rpi";

// Définir le sujet MQTT pour publier l'ID de la balise RFID
const char* mqtt_topic = "G001";

WiFiClient espClient;
PubSubClient client(espClient);
MFRC522 mfrc522(SS_PIN, RST_PIN);

String _time;
const char* ntpServer = "pool.ntp.org";

void setup() {
  Serial.begin(115200);
  SPI.begin();      // Initialiser SPI bus
  mfrc522.PCD_Init(); // Initialiser le module RC522

  pinMode(BUZZER_PIN, OUTPUT); // Initialiser le buzzer comme sortie
  pinMode(LED_PIN, OUTPUT);    // Initialiser la LED comme sortie
  pinMode(LED2_PIN, OUTPUT); ////////
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  configTime(0, 0, ntpServer); // Initialiser NTP
}

void loop() {
  // Vérifier la connexion MQTT
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Vérifier si une nouvelle carte RFID est détectée
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    // Lire l'ID de la carte RFID
    Get_Epoch_Time();
    String content = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
   content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
   content.concat(String(mfrc522.uid.uidByte[i], HEX));
}

    content.toUpperCase();
    
    // Créer un objet JSON
    StaticJsonDocument<200> doc;
    doc["Data1"] = content;
    doc["Data2"] = mqtt_topic;
    doc["Data3"] = _time;

    // Sérialiser l'objet JSON en une chaîne JSON
    char jsonBuffer[256];
    serializeJson(doc, jsonBuffer);
    
    Serial.print("RFID Tag UID: ");
    Serial.println(jsonBuffer);

    // Publier l'ID de la balise RFID sur MQTT
    client.publish(mqtt_topic, jsonBuffer);

    // Activer le buzzer pendant 5 secondes
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(LED2_PIN, HIGH);
    digitalWrite(LED_PIN, LOW);
    delay(3000);
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(LED2_PIN, LOW);
    digitalWrite(LED_PIN, HIGH);

    // Délai avant de pouvoir lire une nouvelle carte
    delay(1000);
  }
}

unsigned long Get_Epoch_Time() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return (0);
  }
  char timeStr[20];  // Buffer to hold the formatted time String
  strftime(timeStr, sizeof(timeStr), "%Y-%m-%d %H:%M:%S", &timeinfo); //time fct
  _time = String(timeStr);
  //Serial.println(_time);
  time(&now);
  return now;
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Boucle jusqu'à ce que nous soyons re-connectés
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Tentative de connexion
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      digitalWrite(LED_PIN, HIGH); // Allumer la LED si connecté
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      digitalWrite(LED_PIN, LOW); // Éteindre la LED si déconnecté
      // Attente avant une nouvelle tentative
      delay(5000);
    }
  }
}
