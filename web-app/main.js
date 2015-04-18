// DESCREVER
arduinoIP = "";	      //
//arduinoIP = "http://192.168.69.252/";
debug = 1;            // browser console
ajax_cache = 1;	      // recomend to use without AJAX cache
refresh = 1000;	      // in miliseconds

// DESCREVER
var request = new XMLHttpRequest();
function GetStatus() {
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseXML != null) {

                // extract XML data from XML file
                xml = this.responseXML;

                // Temperature
                var temps = document.getElementsByClassName('temp');
                for (var temp = 0; temp < temps.length; temp++){
            	    var temperature = xml.getElementsByTagName('temp_' + temps[temp].id)[0].childNodes[0].nodeValue;
            	    temps[temp].innerHTML = ( temperature / 16).toFixed(0) + ' °C';
		}

                // Lamps
                var lamps = document.getElementsByClassName('lamp');
                for (var lamp = 0; lamp < lamps.length; lamp++){
                    if (xml.getElementsByTagName('lamp_' + lamps[lamp].id)[0].childNodes[0].nodeValue == 1){
                        lamps[lamp].setAttribute('checked', 'checked');
                    } else {
                        lamps[lamp].removeAttribute('checked');
                    }
                }
            }
        }
    }
    // Update slider color
    var inputs = document.getElementsByClassName('ledstrip');
    for (var i = 0;i<inputs.length; i++){
        slider_color(inputs[i]);
    };
    ArduinoRequest("status.xml");
    setTimeout('GetStatus()', refresh);
}

// CUSTOM
function arduinoAmbient(elem){
    switch (elem.id){
	case "alloff":
	    alert(elem.id);
	    break;
	case "movie":
      alert(elem.id);
	    // ArduinoRequest("arduino/digitalWrite/2/0");
	    break;
	default:
	    alert("invalido");
    }
}

// DESCREVER
function arduinoWrite(elem){
    if (elem.classList.contains('lamp')){
        oper = "arduino/digitalWrite";
        value = (elem.checked?1:0);
    } else if (elem.classList.contains('ledstrip')) {
        oper = "arduino/analogWrite";
        value = elem.value;
    }
    ArduinoRequest(oper + "/" + elem.id + "/" + value);
}

// DESCREVER
function ArduinoRequest(URI){
    if (ajax_cache == 0 ){
        nocache = "&nocache=" + Math.random() * 10000;
    } else if (ajax_cache == 1) {
	nocache = "";
    }
    URI = arduinoIP + URI + nocache;
    request.open("GET", URI, true);
    request.send(null);

    if (debug == 1) {
	console.log("GET", URI);
    }
}

// DESCREVER
function slider_color(input) {
    var value = (input.value - input.min)/(input.max - input.min);
    input.style.backgroundImage = [
	'-webkit-gradient(',
        'linear, ',
        'left top, ',
        'right top, ',
        'color-stop(' + value + ', #017afd), ',
        'color-stop(' + value + ', #a9acb1)',
    ')'].join('');
};
