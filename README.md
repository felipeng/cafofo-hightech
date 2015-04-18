Cafofo Hightech
===============

O projeto Cafofo Hightech foi desenvolvido para ser uma plataforma de automação
residencial utilizando o Arduino. É composto por uma interface web que realiza a comunicação com o Arduino através de API REST HTTP. Nasceu de um projeto pessoal para automatização de apartamento, após muito estudo e dedicação, resolvi compartilhá-lo livremente seu código, quem sabe seja útil para outras pessoas.

É desenvolvido em HTML, CSS, JavaScript e C (Arduino Sketch). O acesso é através do protocolo HTTP, ou seja smartphones, tablets, computador, etc.

O tema inicial é baseada no iOS 7, porém pode ser facilmente modificada para criação outros temas.

Foi testado com Arduino UNO e Arduino Mega 2650, isso não é restrição, pode ser adaptado pra outras placas como Raspberry Pi, BeagleBone, etc.


Como Funciona
-------------

Uma página estática (index.htm) é armazenada no cartão SD no EthernetShield conectado
ao Arduino, o qual possui um servidor HTTP. Ao acessar o index.htm no onLoad é chamado a função GetStatus, a qual solicita ao Arduino (API REST) o arquivo status.xml. O Arduino executa a função HTTP_reply_xml, a qual lê os valores dos sensores e retorna o status.xml com os valores. Em seguida a função GetStatus realiza um "parser" dos campos XML e atualiza a página com os valores. Por padrão é solicitado o status.xml a cada 1s, para manter as informações sincronizadas.

API REST

http://192.168.0.1/status.xml = solicitar status dos sensores/pinos
http://192.168.0.1/arquivo    = solicitar algum arquivo do cartão SD

http://192.168.0.1:/arduino/digitalRead/5/0    = digitalRead(5)
http://192.168.0.1:/arduino/digitalRead/5/0    = analogRead(5)
http://192.168.0.1:/arduino/digitalWrite/5/1   = digitalWrite(5, HIGH)
http://192.168.0.1:/arduino/analogWrite/5/250  = analogWrite(5, 250)

Componentes
------------

* Arduino
* Ethernet Shield com leitor SD
* Cartão SD para armazenar HTML, CSS, imagens e javascript
* Jumpers
* LEDs
* Resistores
* Sensores

Instalação
----------

Favor ler o arquivo INSTALL


Contribuições
-------------

Caso possua sugestões, correções ou contribuição de temas, imagens ou código
entre em contato.
Se gostou do projeto e está utilizando, conte-me :)


TODO
====
* documentar funcoes
* da pra usar porta analogica?

C
* pensar melhor nas variaves do sensor de temperadura
* salvar o valor da fita ler e retornar no xml
* se na URL nao passar parametro (/) deve abrir o index - http://en.wikipedia.org/wiki/URL_redirection#HTTP_status_codes_3xx

HTML
* fazer slider funcionar no FF
* adicionar acao no botao de ambiente
* aumentar o tamnho dos icones (stop, play, etc)
* colocar icone de garagem
* aquario e outras coisas
* melhorar o arduino ambient, pode passar por parameto, quais é para apagar

JS
* se colocar timeout 0, entra em loop muito rapido, descobrir como definir um valor para nao ter refresh
