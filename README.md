Cafofo Hightech
===============

É um projeto pessoal para automatizar meu apartamento utilizando HTML, javascript, CSS e Arduino. O acesso é através do protocolo HTTP, o qual pode ser acessado através de celulares, tablets ou computador.

A interface web é baseada no iOS, porém pode ser facilmente modificada para criação de temas.

Testado com Arduino UNO e Arduino Mega 2650, não é restrição pode ser adaptado pra outras placas como Raspberry Pi, BeagleBone, etc

Componentes:

Arduino:
* Arduino (UNO ou Mega 2650)
* Recebe os eventos dos sensores
* Servidor HTTP
* Cartão SD: imagens, html e javascript
* API Rest

Componentes:
* EthernetShield
* Fita LED:
* Temperatura: D18B20
* Relês: Relay channel 8 canais
* Sensor de corrente: ACS5xxx
* É flexível para adicionar qualquer outro tipo de sensor
* jumpers, fios, conectores

Alimentação:
* Fonte 5V:
* Fonte 5V:
* Fonte 12V:

Como funciona:
Ao acessar o arduino via HTTP, é chamado a função GetStatus no onLoad, o qual solicita ao arduino o arquivo status.xml. O arduino executa a função HTTP_reply_xml a qual lê os valores dos sensores e retorna o arquivo status.xml com os valores. Em seguida a função GetStatus do javascript faz o parser dos campos XML e alimenta a página.

http://192.168.0.1/status.xml
http://192.168.0.1/arduino

REST API (examples)
http://ARDUINO_IP:/arduino/digitalRead/5/0    = digitalRead(5)
http://ARDUINO_IP:/arduino/digitalRead/5/0    = analogRead(5)
http://ARDUINO_IP:/arduino/digitalWrite/5/1   = digitalWrite(5, HIGH)
http://ARDUINO_IP:/arduino/analogWrite/5/250  = analogWrite(5, 250)

TODO:
* diagrama
* fotos
* Falar das limitações
* guia de instalação
* construção da fita led

Instalação:
* Abrir o sketch no Arduino
Ajustar as variáveis:
Fazer upload
 * posso usar os pinos D0 e D1, (ao fazer upload, nao deixei nada conectado na porta D0 e D1)
 
Abrir o main.js, ajustar as variáveis

Formatar o SD como FAT16 ou FAT32
Copiar os arquivos para o SD
Detalhes importantes por limitação do FAT:
* não utilizar pastas
* não utilizar nome de arquivos com mais de 8 caracteres

================== 
TODO:
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
