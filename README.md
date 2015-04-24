# Cafofo Hightech

O projeto Cafofo Hightech foi desenvolvido para ser uma plataforma web de automação
residencial utilizando as placas Arduino e comunicação através de API REST interna. Nasceu de um projeto pessoal para automatização de apartamento, após muito estudo e dedicação, resolvi torná-lo software livre, quem sabe seja útil para outras pessoas.

É desenvolvido puramente em HTML5, CSS, JavaScript e C (Arduino Sketch). O acesso
é através de browser, ou seja, é compatível com qualquer smartphone, tablet,
computador, etc.

O tema é baseada no iOS 7, porém pode ser facilmente modificada. Foi testado
com Arduino Uno e Arduino Mega 2650, não é uma restrição, pode ser facilmente
adaptado pra outras placas como Raspberry Pi, BeagleBone, etc.

So where ever you are and whatever device you have available, you should be able
to access the web to operate your home.



The project Cafofo Hightech was developed to be a web platform for home automation
using Arduino boards and communication thought internal REST API. Was born from a personal project for home automation of an apartment, after much study and
dedication, I resolvi tornar free software, could be usefull for others people.

It is developed in pure HTML5, CSS, JavaScript and C (Arduino Sketch). The access
is thourght the browser, so it is compatible with any device like, smartphone, tablet, pc, etc.

The theme is based on iOS 7, but can be easily modified. Was tested with Arduino Uno and Arduino Mega 2650, isn't a restriction, can be easily adapted to work with other
boards like Raspberry Pi, BeagleBone, etc.


## Components

* Arduino
* Ethernet Shield com leitor SD
* SD card to store HTML5, CSS, JavaScript and image files
* Jumpers
* LEDs
* Resistors
* Sensors (optional)

## How it works?

Uma página estática (index.htm) é armazenada no cartão SD no EthernetShield conectado
ao Arduino, o qual possui um servidor HTTP. Ao acessar o index.htm no onLoad é chamado a função GetStatus, a qual solicita ao Arduino (API REST) o arquivo status.xml. O Arduino executa a função HTTP_reply_xml, a qual lê os valores dos sensores e retorna o status.xml com os valores. Em seguida a função GetStatus realiza um "parser" dos campos XML e atualiza a página com os valores. Por padrão é solicitado o status.xml a cada 1s, para manter as informações sincronizadas.

### API REST

* http://ARDUINO_IP/status.xml                  = request state of sensors/pins
* http://ARDUINO_IP/arquivo                     = request a file stored on SD card
* http://ARDUINO_IP:/arduino/digitalRead/5/0    = digitalRead(5)
* http://ARDUINO_IP:/arduino/digitalRead/5/0    = analogRead(5)
* http://ARDUINO_IP:/arduino/digitalWrite/5/1   = digitalWrite(5, HIGH)
* http://ARDUINO_IP:/arduino/analogWrite/5/250  = analogWrite(5, 250)

## Instalation

See the INSTALL.md

## Contributions

If you have any suggestions, bugs, new theme, image or usefull code please let
me know. Maybe if you are using it, tell me :)

Icons was made with: http://icons8.com
