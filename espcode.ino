#include <ArduinoWiFiServer.h>
#include <BearSSLHelpers.h>
#include <CertStoreBearSSL.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiGratuitous.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiClientSecureBearSSL.h>
#include <WiFiServer.h>
#include <WiFiServerSecure.h>
#include <WiFiServerSecureBearSSL.h>
#include <WiFiUdp.h>

#define BLYNK_TEMPLATE_ID "TMPL6hSdgIBG1"
#define BLYNK_TEMPLATE_NAME "Car Parking System"
#define BLYNK_PRINT Serial

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

// BLYNK authentication and WiFi credentials
char auth[] = "6Z1FVYwb_9-zeF6nK7vj3L6vLAM-RY8V";
char ssid[] = "Dialog 4G";
char pass[] = "HNHM0TTGBAG";

// Sensor and gate pins
const int parkingSensors[6] = {D1, D2, D3, D4, D5, D6}; // Array for sensor pins
const int entranceGatePin = D7;
const int exitGatePin = D8;

int sensorValues[6] = {0}; // Array to store sensor values
String myString;           // Complete message from Arduino

void setup() {
  Serial.begin(9600);
  Blynk.begin(auth, ssid, pass);

  // Initialize sensor pins as inputs
  for (int i = 0; i < 6; i++) {
    pinMode(parkingSensors[i], INPUT);
  }

  // Initialize gate pins as outputs
  pinMode(entranceGatePin, OUTPUT);
  pinMode(exitGatePin, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char rdata = Serial.read();
    myString += rdata;

    if (rdata == '\n') {
      parseSensorData();  // Parse the sensor data
      myString = "";      // Clear string after parsing
    }
  }

  Blynk.run();           // Run Blynk tasks
  sendSensorValues();    // Send sensor values to Blynk app
}

void parseSensorData() {
  int index = 0;
  int start = 0;
  int end = myString.indexOf(',');

  while (end != -1 && index < 6) {
    sensorValues[index++] = myString.substring(start, end).toInt();
    start = end + 1;
    end = myString.indexOf(',', start);
  }
}

void sendSensorValues() {
  for (int i = 0; i < 6; i++) {
    Blynk.virtualWrite(V10 + i, sensorValues[i]); // Send data to virtual pins V10-V15
  }
}