/*

Cafofo Hightech

License: MIT
This code is part of project: http://github.com/felipeng/cafofo-hightech

created 2014 by Felipe Nogaroto Gonzalez - felipeng84 @ gmail . com

*/

// Configurations
arduinoIP = '';	      // IP address configured on Arduino Ethernet Shield
// arduinoIP = 'http://192.168.69.252/';
refresh = 1000;	      // in miliseconds
debug = 1;            // browser console
ajax_cache = 1;	      // recommended to use without AJAX cache, 0

// Loop: requests the status.xml, parses the values and updates the HTML
var request = new XMLHttpRequest();
function GetStatus() {
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseXML != null) {
        // parses the XML values from status.xml
        xml = this.responseXML;

        // Temperature
        var temps = document.getElementsByClassName('temp');
        for (var i=0;i<temps.length;i++){
          var temperature = xml.getElementsByTagName('temp_' + temps[i].id)[0].childNodes[0].nodeValue;
          temps[i].innerHTML = (temperature / 16).toFixed(0) + ' °C';
         }

        // Pins (Lamps)
        var pins = document.getElementsByClassName('pin');
        for (var i=0;i<pins.length;i++){
          if (xml.getElementsByTagName('pin_' + pins[i].id)[0].childNodes[0].nodeValue == 1){
            pins[i].setAttribute('checked', 'checked');
          } else {
            pins[i].removeAttribute('checked');
          }
        }

        // PWM (Led Strips)
        var pwms = document.getElementsByClassName('pwm');
        for (var i=0;i<pwms.length;i++){
          pwms[i].value = xml.getElementsByTagName('pwm_' + pwms[i].id)[0].childNodes[0].nodeValue;
          slider_color(pwms[i]);
        }
      }
    }
  }

  // Request the status.xml from Arduino
  ArduinoRequest('status.xml');
  setTimeout('GetStatus()', refresh);
}

// Assembles the request (digitalWrite/analogWrite, pin and value)
function arduinoWrite(elem){
  if (elem.classList.contains('pin')){
    oper = 'arduino/digitalWrite';
    value = (elem.checked?1:0);
  } else if (elem.classList.contains('ledstrip')) {
    oper = 'arduino/analogWrite';
    value = elem.value;
  }
  ArduinoRequest(oper + '/' + elem.id + '/' + value);
}

// Send the request to the Arduino
function ArduinoRequest(URI){
  if (ajax_cache == 0 ){
      nocache = '&nocache=' + Math.random() * 10000;
  } else if (ajax_cache == 1) {
	   nocache = '';
  }
  URI = arduinoIP + URI + nocache;
  request.open('GET', URI, true);
  request.send(null);

  if (debug == 1) {
	   console.log('GET', URI);
  }
}

// Update the color before thumb of input.range elements
function slider_color(elem) {
  var value = (elem.value - elem.min)/(elem.max - elem.min);
  elem.style.backgroundImage = [
	'-webkit-gradient(',
        'linear,',
        'left top,',
        'right top,',
        'color-stop(' + value + ', #017afd),',
        'color-stop(' + value + ', #a9acb1)',
  ')'].join('');
};
