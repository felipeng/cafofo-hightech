/*

Cafofo Hightech

License: MIT
This code is part of project: http://github.com/felipeng/cafofo-hightech

created 2014 by Felipe Nogaroto Gonzalez - felipeng84 @ gmail . com

*/

// Configurations
arduinoIP = ''; // URL of the Arduino, if is localhost, leave it blank
refresh = 1000;	// in miliseconds
debug = 0;      // browser console
ajax_cache = 0;	// recommended to use without AJAX cache, 0

// Requests the status.xml, parses the values and updates the HTML
var request = new XMLHttpRequest();
function GetStatus() {
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseXML !== null) {
                // parses the XML values from status.xml
                xml = this.responseXML;

                // Temperature
                var temps = document.getElementsByClassName('temp');
                for (var i=0;i<temps.length;i++){
                  var temperature = xml.getElementsByTagName('temp_' + temps[i].id)[0].childNodes[0].nodeValue;
                  temps[i].innerHTML = temperature + ' °C';
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
                // var pwms = document.getElementsByClassName('pwm');
                // for (var i=0;i<pwms.length;i++){
                //   pwms[i].value = xml.getElementsByTagName('pwm_' + pwms[i].id)[0].childNodes[0].nodeValue;
                //   slider_color(pwms[i]);
                // }
            }
        }
  }

  // Request the status.xml from Arduino
  URL = ArduinoRequest('status.xml', 0);
  request.open('GET', URL, true); // Method, URL, async
  request.send(null);             // Only used for POST

  setTimeout('GetStatus()', refresh); // Do the loop request
}

// Assembles the request (digitalWrite/analogWrite, pin and value)
function arduinoWrite(elem){
  if (elem.classList.contains('pin')){
    oper = 'digitalWrite/';
    value = (elem.checked?1:0);
  } else if (elem.classList.contains('pwm')) {
    oper = 'analogWrite/';
    value = elem.value;
  }
  ArduinoRequest('arduino/' + oper + elem.id + '/' + value, 1);
}

// Send the request to the Arduino
function ArduinoRequest(URL, new_request){
  // Cache enabled?
  if (ajax_cache == 0 ){
    nocache = '&nocache=' + Math.random() * 10000;
  } else if (ajax_cache == 1) {
	  nocache = '';
  }

  // Assembles de URL
  URL = arduinoIP + URL + nocache;

  // Debug enabled?
  if (debug == 1) {
	   console.log('Debug: GET', URL);
  }

  if (new_request == 0){
    return URL;
  } else {
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);
    request.send(null);
  }
}

// Update the color before thumb of input.range elements
function slider_color(elem) {
  // For iOS use #017afd for Android use #009688
  var css_full_path = document.styleSheets.item(1).href
  var css_file = css_full_path.substring(css_full_path.lastIndexOf('/')+1);

  if ( css_file == "android.css"){
    slider_color = "#009688";
  } else {
    slider_color = "#017afd";
  }

  var value = (elem.value - elem.min)/(elem.max - elem.min);
  elem.style.backgroundImage = [
	'-webkit-gradient(',
        'linear,',
        'left top,',
        'right top,',
      'color-stop(' + value + ',' + slider_color + '),',
      'color-stop(' + value + ', #a9acb1)',
  ')'].join('');
};
