# Instalação

## Arduino

Abrir o sketch no Arduino e ajustar os valores abaixo e carregar para o Arduino:

* Endereço IP do Arduino: `IPAddress ip(192,168,69,252);`
* Ajustar o array com os pinos: `int lamp_pins[] = {0, 1, 2, 5, 6, 7, 8, 9};`
* Ajustar o pino que terá uma fita LED (PWM): `int ledstrip_pins[] = {3};`
* Ajustar o pino com sensor de temperatura: `int temp_pins[] = {2};`
* Ajustar endereço do sensor de temperatura: `byte temp1[8] = {0x28, 0xFD, 0xB5, 0xC9, 0x05, 0x00, 0x00, 0x24 };`

## Web App

1. Formatar o cartão SD com sistema de arquivos FAT16
2. Abrir o JavaSscript (main.js) e ajustar a variável: arduinoIP.
3. Copiar arquivos do diretório web-app para o cartão SD.
4. Adicionar o cartão SD no EthernetShield
5. Acessar através do browser: http://ARDUINO_IP/index.htm


# Problemas Conhecidos e Limitações

* Limitação do FAT:
  * não utilizar pastas
  * não utilizar nome de arquivos com mais de 8 caracteres no total

* Pinos reservados ao utilizar Ethernet Shield:
  * Arduino Uno: 4, 10, 11, 12 and 13
  * Ardino Mega: 4, 10, 50, 51 and 52

* Auto Refresh (main.js)
  * A variável refresh, não pode ser definida como 0

* Carregar Código para o Arduino
  * Não conectar nada nos pinos D0 e D1 ao carregar código para o Arduino
