var GrovePi = require('node-grovepi').GrovePi;
var DigitalSensor = GrovePi.sensors.base.Digital;
var AnalogSensor = GrovePi.sensors.base.Analog;
var Commands      = GrovePi.commands;
var Board = GrovePi.board
var sensorValArray = [];
var volt_ref = 5.0;
var k = -20.5 ;
var offset = 42.3;

var board = new Board({
    debug: true,
    onError: function(err) {
      console.log('Something wrong just happened')
      console.log(err)
    },
    onInit: function(res) {
      if (res) {
        console.log('GrovePi Version :: ' + board.version())

        var phSensor = new AnalogSensor(2);
        console.log('PH Analog Sensor (start watch)')
        phSensor.on('change', function(sensorValue) {
	  if(sensorValue != 65535 || sensorValue != false){ sensorValArray.push(sensorValue);};
	  var phAvg =  (eval(sensorValArray.join('+'))/sensorValArray.length);	 
	  var voltage = phAvg * volt_ref / 1024;
	  var phValue = k * voltage + offset;
	  console.log(sensorValue + " " + sensorValArray);	
          console.log('Sensor Value: ' + voltage.toFixed(2) + " PH: " + phValue.toFixed(2));
        })
        phSensor.watch(1000)
      }
    }
})

board.init();
