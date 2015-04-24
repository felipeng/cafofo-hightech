/*

Cafofo Hightech

License: MIT
This code is part of project: http://github.com/felipeng/cafofo-hightech

created 2014 by Felipe Nogaroto Gonzalez - felipeng84 @ gmail . com

*/

//
function arduinoAmbient(elem){
  switch (elem.id){
    case 'movie':
        // All lamps off
        ArduinoRequest('arduino/digitalWrite/2/0');
        ArduinoRequest('arduino/digitalWrite/6/0');
        ArduinoRequest('arduino/digitalWrite/7/0');
        ArduinoRequest('arduino/digitalWrite/8/0');
        ArduinoRequest('arduino/digitalWrite/9/0');

        // Led Strips
        ArduinoRequest('arduino/analogWrite/3/0');
        ArduinoRequest('arduino/analogWrite/5/150');
  	    break;
    case 'sex':
        alert(elem.id);
  	    break;
    case 'game':
        alert(elem.id);
  	    break;
    case 'allon':
        ArduinoRequest('arduino/digitalWrite/2/1');
        ArduinoRequest('arduino/digitalWrite/6/1');
        ArduinoRequest('arduino/digitalWrite/7/1');
        ArduinoRequest('arduino/digitalWrite/8/1');
        ArduinoRequest('arduino/digitalWrite/9/1');
        ArduinoRequest('arduino/analogWrite/3/250');
        ArduinoRequest('arduino/analogWrite/5/250');
  	    break;
    case 'alloff':
        ArduinoRequest('arduino/digitalWrite/2/0');
        ArduinoRequest('arduino/digitalWrite/6/0');
        ArduinoRequest('arduino/digitalWrite/7/0');
        ArduinoRequest('arduino/digitalWrite/8/0');
        ArduinoRequest('arduino/digitalWrite/9/0');
        ArduinoRequest('arduino/analogWrite/3/0');
        ArduinoRequest('arduino/analogWrite/5/0');
  	    break;
  default:
	    alert('Invalid ambient');
    }
}
