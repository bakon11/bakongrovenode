var GrovePi = require('node-grovepi').GrovePi;
var DigitalSensor = GrovePi.sensors.base.Digital;
var AnalogSensor = GrovePi.sensors.base.Analog;
var Commands      = GrovePi.commands;
var Board = GrovePi.board

var board = new Board({
    debug: true,
    onError: function(err) {
      console.log('Something wrong just happened')
      console.log(err)
    },
    onInit: function(res) {
      if (res) {
        console.log('GrovePi Version :: ' + board.version())

        var tempSensor = new DigitalSensor(2);
        console.log('Temp Digital Sensor (start watch)')
        tempSensor.on('change', function(sensorValue) {
	  
          console.log('Sensor Value: ' + sensorValue);
        })
        tempSensor.watch()
      }
    }
})

board.init();
