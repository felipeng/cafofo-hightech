# Instalation

## Arduino

1. Open the sketch in the Arduino IDE
2. Adjust the values below
  * IP address: `IPAddress ip(192,168,0,1);`
  * Fill the pins array: `int pins[] = {0, 1, 2, 5, 6, 7, 8, 9};`
  * Fill the PWM pins array: `int pwm_pins[] = {3};`
3. Loads to the Arduino board

## Web App

1. Format SD card with file system FAT16
2. Copy all files of the `web-app` directory to the SD card
3. Insert the SD card on the SD slot of the Ethernet Shield
4. Access the URL through the browser: http://ARDUINO_IP/index.htm

It's not obligatorily needed host the web-app files on the Arduino SD. In other
words, you can just adjust the `arduinoIP` variable under main.js file, pointing
to the arduino's IP.

## Coding, some tips for you...

* Enable debug on main.js and use console on browser
* To simulate a Arduino, just create a static file called `status.xml` and set
the `arduinoIP` variable in main.js pointing to the host where is the status.xml
file.
* Web development, normally you have to modify the file, copy to SD card, inserts
on SD slot, restarts the Arduino and see the result. The easy/short way to doing
it is host the web-app on some place and set the `arduinoIP` variable in main.js
pointing to the Arduino, like (http://192.168.0.1/)

# Know Issue and Limitations

1. Reserved pins of Ethernet Shield:
  * Arduino Uno: 4, 10, 11, 12 and 13
  * Ardino Mega 2650: 4, 10, 50, 51 and 52

2. File names on SD card, the file system FAT16 and the SD card library does not
support 'long filenames'. It uses the 8.3 format for file names, so keep file
names short and don't use any special characters, more information about 8.3
file names: http://en.wikipedia.org/wiki/8.3_filename, follow this simples rules:
  * extension must have 3 characters (.html is not valid)
  * file name (without extensions) can have till 8 characters
  * do not split files into folders (yes it's sucks)
  * in resume, use file names like this: image.jpg, test.htm (don't use .html)

3. Auto refresh, the variable 'refresh' under main.js, can not be `0`

4. Do not connect any jumper on digital pin 0 and 1 when you are loading to Arduino.
