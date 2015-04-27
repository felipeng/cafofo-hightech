/*

Cafofo Hightech

License: MIT
This code is part of project: http://github.com/felipeng/cafofo-hightech

created 2014 by Felipe Nogaroto Gonzalez - felipeng84 @ gmail . com

Reserved pins for EthernetShield
Arduino Uno: 4, 10, 11, 12 and 13
Ardino Mega: 4, 10, 50, 51 and 52

*/

#include <SPI.h>
#include <Ethernet.h>
#include <SD.h>
#include "DHT11.h"  // Temperature (DHT11 sensor)

IPAddress ip(192,168,0,1);

int pins[] = {0, 1, 2, 6, 7, 8};  // Digital pins
int pwm_pins[] = {3, 5};          // Digital PWM pins
DHT11 dht11sensor(9);             // Temperature (DHT11 sensor)

// Size Of Arrays
int sizeof_pins = sizeof(pins)/2;
int sizeof_pwms = sizeof(pwm_pins)/2;
EthernetServer server(80);

void setup() {
  // Temperature (DHT11 sensor)
  dht11sensor.Initialize();

  // Arduino UNO: 4, 10, 11, 12 and 13 are reserved
  pinMode(0, OUTPUT);
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  SD.begin(4);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(8, OUTPUT);
  pinMode(9, OUTPUT);
  
  // Ethernet Shield - Reserved Pins
  pinMode(10, OUTPUT);
  digitalWrite(10, HIGH);
  byte mac[8] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
  Ethernet.begin(mac, ip);
  server.begin();
}

void loop() {
  // Clean the values on each request
  char arg1[15] = "";
  char arg2[15]= "";
  int arg3;
  int arg4;

  // Recives the request and parses into variables
  EthernetClient client = server.available();
  if (client) {
    while (client.connected()) {
      if (client.available()) {
          String HTTP_request = client.readStringUntil('\n');
          if ((HTTP_request.startsWith("GET ")) && (HTTP_request.endsWith("\r"))) {
            sscanf(HTTP_request.c_str(), "GET /%99[^&/ ]/%99[^/]/%99d/%99d", arg1, arg2, &arg3, &arg4);
            HTTP_switch(client, arg1, arg2, arg3, arg4);
            delay(1);
            client.stop();
          }
      }
      delay(1);
      client.stop();
    }
  }
}

// REST API
void HTTP_switch(EthernetClient client, char arg1[20], char oper[20], int pin, int value){
  if (strcmp(arg1, "status.xml") == 0) {
     HTTP_reply_xml(client);
  } else if (strcmp(arg1, "arduino") == 0) {
      if (strcmp(oper, "digitalWrite") == 0) {
        if (value == 0 || value == 1) {
          digitalWrite(pin, value);
          HTTP_reply(client, value);
        }
      } else if (strcmp(oper, "digitalRead") == 0) {
        int pinValue = digitalRead(pin);
        HTTP_reply(client, pinValue);
      } else if (strcmp(oper, "analogWrite") == 0) {
        if (value >= 0 || value <= 255) {
          analogWrite(pin, value);
          int pwm_value_pin = value;
          HTTP_reply(client, value);
        }
      } else if (strcmp(oper, "analogRead") == 0) {
        int pinValue = analogRead(pin);
        HTTP_reply(client, pinValue);
      }
  } else if (SD.exists(arg1)) {
      HTTP_reply_file(client, arg1);
  } else {
     HTTP_reply_invalid(client);
  }
}

// HTTP reply with the value
void HTTP_reply(EthernetClient client, int value) {
  client.println("HTTP/1.1 200 OK");
  client.println("Access-Control-Allow-Origin: *");
  client.println("Access-Control-Allow-Methods: GET");
  client.println("Content-Type: text/plain");
  client.println("Connection: close");
  client.println();
  client.println(value);
}

// HTTP reply if the request is not valid
void HTTP_reply_invalid(EthernetClient client){
  client.println("HTTP/1.1 406 Not Acceptable");
  client.println("Content-Type: text/plain");
  client.println("Connection: close");
  client.println();
  client.println(406);
}

// HTTP reply if the request is a valid file
void HTTP_reply_file(EthernetClient client, char arg1[20]){
  client.println("HTTP/1.1 200 OK");
  client.println("Connection: close");
  client.println();
  File webFile = SD.open(arg1);
  if (webFile) {
      while(webFile.available()) {
          client.write(webFile.read());
      }
      webFile.close();
  }
}

// HTTP reply with the values in xml file
void HTTP_reply_xml(EthernetClient client) {
  client.println("HTTP/1.1 200 OK");
  client.println("Access-Control-Allow-Origin: *");
  client.println("Access-Control-Allow-Methods: GET");
  client.println("Connection: close");
  client.println();
  client.print("<?xml version = \"1.0\" ?>");
  client.println("<arduino>");
  // Temperature (DHT11 sensor)
  client.print("<temp_9>");
  client.print(getTemperature());
  client.print("</temp_9>");

  // PWM (Led Strip)
  for (int i=0; i < sizeof_pwms; i++){
    client.print("<pwm_");
    client.print(pwm_pins[i]);
    client.print(">");
    client.print(0);
    client.print("</pwm_");
    client.print(pwm_pins[i]);
    client.println(">");
  }

  // Pins (Lamp)
  for (int i=0; i < sizeof_pins; i++){
    client.print("<pin_");
    client.print(pins[i]);
    client.print(">");
    client.print(digitalRead(pins[i]));
    client.print("</pin_");
    client.print(pins[i]);
    client.println(">");
  }
  client.println("</arduino>");
}

// Get temperature (DHT11 sensor)
int getTemperature(){
  double dht11sensorData[2];
  int dht11_query = dht11sensor.Read(dht11sensorData);
  if (dht11_query == 0){
    return dht11sensorData[1];
  } else {
    return 0;
  }
}
