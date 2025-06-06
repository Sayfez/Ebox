#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <PubSubClient.h>

//// Définir les broches pour le module RC522
#define RST_PIN     27  // Broche de réinitialisation (RESET)
#define SS_PIN      5  // Broche de sélection (SDA)

///////////////////////////////////////////////////////////// Définir les informations de votre réseau WiFi
const char* ssid = "Orange-15D6";
const char* password = "NaTbt7i3MeR";

////////////////////////////////////////////////////////// Définir l'adresse IP du Raspberry Pi
const char* mqtt_server = "192.168.251.178"; 

/////////////////////////////////////////// Définir le nom d'utilisateur et le mot de passe MQTT
const char* mqtt_user = "rpi";
const char* mqtt_password = "rpi";

////////////////////////////////////// Définir le sujet MQTT pour publier l'ID de la balise RFID
const char* mqtt_topic = "G001";

WiFiClient espClient;
PubSubClient client(espClient);
MFRC522 mfrc522(SS_PIN, RST_PIN);




void setup() {
  Serial.begin(115200);
  SPI.begin();      // Initialiser SPI bus
  mfrc522.PCD_Init(); // Initialiser le module RC522
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
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
    String content = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
       content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
       content.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    content.toUpperCase();
    Serial.print("RFID Tag UID: ");
    Serial.println(content);
    
    //////////////////////////// Publier l'ID de la balise RFID sur MQTT
    client.publish(mqtt_topic, content.c_str());
  
    // Délai avant de pouvoir lire une nouvelle carte
    delay(1000);
  }
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
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Attente avant une nouvelle tentative
      delay(5000);
    }
  }
}
