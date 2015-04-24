# Instalation

## Arduino

Abrir o sketch no Arduino IDE e ajustar os valores abaixo e carregar para o Arduino:

* Endereço IP do Arduino: `IPAddress ip(192,168,69,252);`
* Ajustar o array com os pinos: `int lamp_pins[] = {0, 1, 2, 5, 6, 7, 8, 9};`
* Ajustar o pino que terá uma fita LED (PWM): `int ledstrip_pins[] = {3};`
* Ajustar o pino com sensor de temperatura: `int temp_pins[] = {2};`
* Ajustar endereço do sensor de temperatura: `byte temp1[8] = {0x28, 0xFD, 0xB5, 0xC9, 0x05, 0x00, 0x00, 0x24 };`

Open the sketch on Arduino IDE and adjust the values above, and load to the board:
* IP address: `IPAddress ip(192,168,0,1);`
* Fill the pins array: `int pins[] = {0, 1, 2, 5, 6, 7, 8, 9};`
* Fill the PWM pins: `int pwm_pins[] = {3};`

## Web App

1. Formatar o cartão SD com sistema de arquivos FAT16
2. Abrir o JavaSscript (main.js) e ajustar a variável: arduinoIP.
3. Copiar arquivos do diretório web-app para o cartão SD.
4. Insira o cartão SD no EthernetShield
5. Acessar através do browser: http://ARDUINO_IP/index.htm

1. Format SD card with file system FAT16
2. Open the JavaScript file (main.js) and adjust the variable: arduinoIP
3. Copy all files in the web-app directory to the SD card
4. Insert the SD card on the SD slot of the EthernetShield
5. Access thought browser the Arduino IP: http://ARDUINO_IP/index.htm

# Know Issue and Limitations

* Reserved pins of Ethernet Shield:
  * Arduino Uno: 4, 10, 11, 12 and 13
  * Ardino Mega: 4, 10, 50, 51 and 52

* Auto Refresh (main.js)
  * The variable 'refresh', can not be 0

* When load the sketch to the Arduino
  * Não conectar nada nos pinos D0 e D1 ao carregar código para o Arduino


The SD card library does not support 'long filenames' such as we are used to. Instead, it uses the 8.3 format for file names, so keep file names short! For example IMAGE.JPG is fine, and datalog.txt is fine by "My GPS log file.text" is not! Also keep in mind that short file names do not have 'case' sensitivity, so datalog.txt is the same file as DataLog.Txt is the same file as DATALOG.TXT
http://en.wikipedia.org/wiki/8.3_filename

exten with 3 caracters
8 caracter + . + htm

* Limitação do FAT:
  * não utilizar pastas
  * não utilizar nome de arquivos com mais de 8 caracteres no total
