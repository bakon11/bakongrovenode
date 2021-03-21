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

        var phSensor = new AnalogSensor(2);
        console.log('PH Analog Sensor (start watch)')
        phSensor.on('change', function(sensorValue) {
	  var phValue = -19.18518519 * sensorValue * 5 / 1024 + 41.02740741;
          console.log('Sensor Value: ' + sensorValue + " PH: " + phValue);
        })
        phSensor.watch()
      }
    }
})

board.init();
