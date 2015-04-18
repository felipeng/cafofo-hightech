Cafofo Hightech
===============

O projeto Cafofo Hightech foi desenvolvido para ser uma plataforma de automação
residencial utilizando o Arduino. É composto por uma interface web que realiza a comunicação com o Arduino através de uma API REST interna. Nasceu de um projeto pessoal para automatização de apartamento, após muito estudo e dedicação, resolvi compartilhá-lo livremente seu código, quem sabe seja útil para outras pessoas.

É desenvolvido em HTML, CSS, JavaScript e C (Arduino Sketch). O acesso é através
de brower HTTP, ou seja, qualquer smartphone, tablet, computador, etc.

O tema inicial é baseada no iOS 7, porém pode ser facilmente modificada para criação outros temas. Foi testado com Arduino UNO e Arduino Mega 2650, não sendo uma restrição, pode ser facilmente adaptado pra outras placas como Raspberry Pi, BeagleBone, etc.

Componentes
------------

* Arduino
* Ethernet Shield com leitor SD
* Cartão SD para armazenar HTML, CSS, imagens e javascript
* Jumpers
* LEDs
* Resistores
* Sensores

Como Funciona
-------------

Uma página estática (index.htm) é armazenada no cartão SD no EthernetShield conectado
ao Arduino, o qual possui um servidor HTTP. Ao acessar o index.htm no onLoad é chamado a função GetStatus, a qual solicita ao Arduino (API REST) o arquivo status.xml. O Arduino executa a função HTTP_reply_xml, a qual lê os valores dos sensores e retorna o status.xml com os valores. Em seguida a função GetStatus realiza um "parser" dos campos XML e atualiza a página com os valores. Por padrão é solicitado o status.xml a cada 1s, para manter as informações sincronizadas.

API REST

- http://ARDUINO_IP/status.xml = solicitar status dos sensores/pinos
- http://ARDUINO_IP/arquivo    = solicitar algum arquivo do cartão SD
- http://ARDUINO_IP:/arduino/digitalRead/5/0    = digitalRead(5)
- http://ARDUINO_IP:/arduino/digitalRead/5/0    = analogRead(5)
- http://ARDUINO_IP:/arduino/digitalWrite/5/1   = digitalWrite(5, HIGH)
- http://ARDUINO_IP:/arduino/analogWrite/5/250  = analogWrite(5, 250)


Instalação
----------

Ver o arquivo INSTALL


Contribuições
-------------

Caso possua sugestões, correções ou contribuição de temas, imagens ou código
entre em contato. Se gostou do projeto e está utilizando, conte-me :)
