/*

Cafofo Hightech

License: MIT
This code is part of project: http://github.com/felipeng/cafofo-hightech

created 2014 by Felipe Nogaroto Gonzalez - felipeng84 @ gmail . com

*/

// Set of combinations
function arduinoAmbient(elem) {
    switch (elem.id) {
    case 'movie':
        ArduinoRequest('arduino/digitalWrite/0/0', 1);
        ArduinoRequest('arduino/digitalWrite/1/0', 1);
        ArduinoRequest('arduino/digitalWrite/2/0', 1);
        ArduinoRequest('arduino/analogWrite/3/0', 1);
        ArduinoRequest('arduino/analogWrite/5/150', 1);
        ArduinoRequest('arduino/digitalWrite/6/0', 1);
        ArduinoRequest('arduino/digitalWrite/7/0', 1);
        ArduinoRequest('arduino/digitalWrite/8/0', 1);

	    break;
    case 'sex':
        ArduinoRequest('arduino/digitalWrite/0/0', 1);
        ArduinoRequest('arduino/digitalWrite/1/0', 1);
        ArduinoRequest('arduino/digitalWrite/2/0', 1);
        ArduinoRequest('arduino/analogWrite/3/150', 1);
        ArduinoRequest('arduino/analogWrite/5/0', 1);
        ArduinoRequest('arduino/digitalWrite/6/0', 1);
        ArduinoRequest('arduino/digitalWrite/7/0', 1);
        ArduinoRequest('arduino/digitalWrite/8/0', 1);
	    break;
    case 'games':
        ArduinoRequest('arduino/digitalWrite/0/0', 1);
        ArduinoRequest('arduino/digitalWrite/1/1', 1);
        ArduinoRequest('arduino/digitalWrite/2/1', 1);
        ArduinoRequest('arduino/analogWrite/3/0', 1);
        ArduinoRequest('arduino/analogWrite/5/0', 1);
        ArduinoRequest('arduino/digitalWrite/6/0', 1);
        ArduinoRequest('arduino/digitalWrite/7/0', 1);
        ArduinoRequest('arduino/digitalWrite/8/0', 1);
	    break;
    case 'all_on':
        ArduinoRequest('arduino/digitalWrite/0/1', 1);
        ArduinoRequest('arduino/digitalWrite/1/1', 1);
        ArduinoRequest('arduino/digitalWrite/2/1', 1);
        ArduinoRequest('arduino/analogWrite/3/250', 1);
        ArduinoRequest('arduino/analogWrite/5/250', 1);
        ArduinoRequest('arduino/digitalWrite/6/1', 1);
        ArduinoRequest('arduino/digitalWrite/7/1', 1);
        ArduinoRequest('arduino/digitalWrite/8/1', 1);
        break;
    case 'all_off':
        ArduinoRequest('arduino/digitalWrite/0/0', 1);
        ArduinoRequest('arduino/digitalWrite/1/0', 1);
        ArduinoRequest('arduino/digitalWrite/2/0', 1);
        ArduinoRequest('arduino/analogWrite/3/0', 1);
        ArduinoRequest('arduino/analogWrite/5/0', 1);
        ArduinoRequest('arduino/digitalWrite/6/0', 1);
        ArduinoRequest('arduino/digitalWrite/7/0', 1);
        ArduinoRequest('arduino/digitalWrite/8/0', 1);
	    break;
    default:
	    console.log('Invalid ambient');
    }
}
