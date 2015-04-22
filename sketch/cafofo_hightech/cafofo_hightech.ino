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
//#include <OneWire.h>    // Temperadure sensor (DS18B20)

//IPAddress ip(192,168,0,1);
IPAddress ip(192,168,69,252);
EthernetServer server(80);

// Arduino UNO
int lamp_pins[] = {0, 1, 2, 6, 7, 8, 9};
int ledstrip_pins[] = {3, 5};
// int temp_pins[] = {2};
// byte temp1[8] = {0x28, 0xFD, 0xB5, 0xC9, 0x05, 0x00, 0x00, 0x24 };

// Arduino Mega
// int lamp_pins[] = {31, 32, 33, 34 ,35, 36, 41};
// int ledstrip_pins[] = {5, 6, 7};
// int temp_pin = 30;
// byte temp_sensor1[8] = {0x28, 0xFD, 0xB5, 0xC9, 0x05, 0x00, 0x00, 0x24};
// byte temp_sensor2[8] = {0x28, 0x33, 0x7F, 0x8E, 0x05, 0x00, 0x00, 0x51};
// byte* temp_address[2] = {temp_sensor1, temp_sensor2};

void setup() {
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

  // Arduino Mega 2560: 4, 10, 50, 51 and 52 are reserved
  // SD.begin(4);
  // pinMode(5, OUTPUT);
  // pinMode(6, OUTPUT);
  // pinMode(7, OUTPUT);
  // pinMode(30, OUTPUT);
  // pinMode(31, OUTPUT);
  // pinMode(32, OUTPUT);
  // pinMode(33, OUTPUT);
  // pinMode(34, OUTPUT);
  // pinMode(35, OUTPUT);
  // pinMode(36, OUTPUT);
  // pinMode(37, OUTPUT);
  // pinMode(41, OUTPUT);
  // pinMode(38, OUTPUT);
  // pinMode(39, OUTPUT);
  // pinMode(40, OUTPUT);

  // Ethernet Shield - Reserved Pins
  pinMode(10, OUTPUT);
  digitalWrite(10, HIGH);
  byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
  Ethernet.begin(mac, ip);
  server.begin();
}

void loop() {
  // Clean the value on each request
  char arg1[15] = "";
  char arg2[15]= "";
  int arg3;
  int arg4;

  EthernetClient client = server.available();
  if (client) {
    while (client.connected()) {
      if (client.available()) {
          String HTTP_request = client.readStringUntil('\n');
          if ((HTTP_request.startsWith("GET ")) && (HTTP_request.endsWith("\r"))) {
            sscanf(HTTP_request.c_str(), "GET /%99[^&/ ]/%99[^/]/%99d/%99d", arg1, arg2, &arg3, &arg4);
            HTTP_switch(client, arg1, arg2, arg3, arg4);
          }
      }
      client.stop();
      delay(1);
    }
  }
}

// REST
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
        if (value >= 0 || value <= 1023) {
          analogWrite(pin, value);
          //ledstrip_value = value;
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
  // Temperature
//  for (int i=0; i < sizeof(temp_address)/2; i++){
    client.print("<temp_");
    client.print(30);
    client.print(">");
    client.print(getTemperature(30, temp_sensor1));
    client.print("</temp_");
    client.print(30);
    client.println(">");

    client.print("<temp_");
    client.print(40);
    client.print(">");
    client.print(getTemperature(40, temp_sensor2));
    client.print("</temp_");
    client.print(40);
    client.println(">");

  // Led Strip
  for (int i=0; i < sizeof(ledstrip_pins)/2; i++){
    client.print("<ledstrip_");
    client.print(ledstrip_pins[i]);
    client.print(">");
    client.print(0);
    client.print("</ledstrip_");
    client.print(ledstrip_pins[i]);
    client.println(">");
  }

  // Lamp
  for (int i=0; i < sizeof(lamp_pins)/2; i++){
    client.print("<lamp_");
    client.print(lamp_pins[i]);
    client.print(">");
    client.print(digitalRead(lamp_pins[i]));
    client.print("</lamp_");
    client.print(lamp_pins[i]);
    client.println(">");
  }
  client.println("</arduino>");
}

// Get temperadure using OneWire Library with DS18B20 sensor
int getTemperature(int pin, byte dsAddress[8]){
  OneWire ds(pin);
  ds.reset();
  ds.select(dsAddress);
  ds.write(0x44,1);
  ds.reset();
  ds.select(dsAddress);
  ds.write(0xBE);
  int dsData = ds.read();
  float temp = (256 | dsData);
  return temp;
}
