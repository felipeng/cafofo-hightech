# Cafofo Hightech

The project Cafofo Hightech was developed to be a web platform for home automation
using Arduino boards and communication is through REST API. It was born from a
personal project for home automation of an apartment, after much study and
dedication, I decided to share the code as a free software, maybe can be useful
for some people.

It is developed in pure HTML5, CSS, JavaScript and C (Arduino Sketch).
The access is through the browser, so it is compatible with any device like,
smartphone, tablet, pc, etc. So where ever you are and whatever device you have
available, you should be able to access the web to operate your home.

There are two themes, the default is based on iOS 7 another is based on Android
5, can be easily modified. It was tested with Arduino Uno and Arduino Mega 2650,
isn't a restriction, can be easily adapted to work with other boards like
Raspberry Pi, BeagleBone, etc.

The code was designed to be easy to add new sensors, is used the DHT11 sensor
for temperature and humidity, you can use it with example.

## Components

* Arduino
* Ethernet Shield com leitor SD
* SD card to store HTML5, CSS, JavaScript and image files
* Jumpers
* LEDs
* Resistors
* Sensors (optional)

## How it works?

1. The static page (index.htm) is stored on SD card of Ethernet Shield slot which
is attached on Arduino.
2. The HTTP server on Arduino reply the index.htm
3. On the onLoad is executed the javascript function GetStatus
3. GetStatus request the status.xml to the Arduino
4. Arduino execute the HTTP_reply_xml function, which reads the pins value and
replies with status.xml
5. GetStatus receives status.xml, parses it and update the HTML with values

GetStatus is a loop, by default is executed every 1 second

### API REST

* http://ARDUINO_IP/status.xml                = requests the state of sensor/pin
* http://ARDUINO_IP/file                      = request a file stored on SD card
* http://ARDUINO_IP/arduino/digitalRead/5/0   = digitalRead(5)
* http://ARDUINO_IP/arduino/digitalRead/5/0   = analogRead(5)
* http://ARDUINO_IP/arduino/digitalWrite/5/1  = digitalWrite(5, HIGH)
* http://ARDUINO_IP/arduino/analogWrite/5/250 = analogWrite(5, 250)

## Instalation

See the INSTALL.md

## Contributions

If you have any suggestion, bug, theme, image or useful code, or if you are just
using it, please let me know :)

Icons was made with: http://icons8.com
