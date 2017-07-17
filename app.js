var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SerialPort = require('serialport');
var commander = require('commander');
var Readline = SerialPort.parsers.Readline;
 
commander
  .version('0.0.1')
  .option('-t, --tcp-port', 'TCP port to start server on')
  .option('-p, --port <address>', 'Serial Port Path/Name')
  .option('-b, --baud [baudrate]', 'Baudrate to open port at [baudrate]', 115200)
  .option('-d, --demo', 'Generates super fake n̶e̶w̶s̶ data')
  .parse(process.argv);

if (commander.demo) {
  while(true) {
    // TODO: Use a random function to generate data
    // TODO: Add timing delay to simulate bus speed (~500Kbps)
    console.log("25", "1FFD88078787839");
  }
}
 
if (!commander.port) {
  console.error("Please specify a serial port with --port or use --demo mode");
  console.log("A list of available ports is provided below");
  SerialPort.list()
  .then(ports => {
    ports.forEach(function(port) {
      console.log("%s", port.comName);
      // TODO: Make this information print if it's relevant
      // console.log(port.pnpId);
      // console.log(port.manufacturer);
    });
    process.exit();
  })
  .catch(err => {
    console.log("Unable to enumerate serial ports");
    console.error(err);
    process.exit();
  });
} else {

  // Something isn't working correctly with Commander's argument parsing defaults 
  var baudRate = commander.buad;
  if (baudRate === undefined) {
    baudRate = 115200;
  }

  console.log("Using %s at %s ", commander.port, baudRate);

  let dotPosition = 0;
  let currentlyConnected = false;
  let connectedEmoji = "✅";
  let disconnectedEmoji = "💔";
  let dotsWidth = 10;

  function updateConsole() {

    if(dotPosition >= dotsWidth) {
      dotPosition = 0;
    }

    let fromName = "CAN BUS";
    let toName = "Viewer";

    let leftPadding = ' '.repeat(dotPosition);
    let rightPadding = ' '.repeat(dotsWidth - dotPosition - 1);

    let dotDisplay = fromName + leftPadding + ">" + rightPadding + toName;

    let connectionStatus = "[Status: " + ( currentlyConnected ? ("Connected " + connectedEmoji) : ("Disconnected " + disconnectedEmoji) ) + "  ]";

    let fullConsoleString = dotDisplay + "\t" + connectionStatus;

    process.stdout.write("\r");
    process.stdout.write(" ".repeat(fullConsoleString.length));
    process.stdout.write("\r")
    process.stdout.write(fullConsoleString);

    dotPosition++;
    
  }

  io.on('disconned', () => {
    currentlyConnected = false;
    updateConsole();
  });

  io.on('connection', function(socket){
    currentlyConnected = true;
    updateConsole();
  });


  var port = new SerialPort(commander.port, {baudRate: baudRate}, open => {
    var parser = port.pipe(Readline());
    parser.on('data', serialData => {

      // The CAN ID is at least one character long
      if(serialData.indexOf(":") > 0) {
        // Assuming it's useful CAN data if it has a colon
        canMessage = serialData.split(":");
        
        formattedMessage = {
          can_id: canMessage[0],
          can_data: canMessage[1]
        }

        if(currentlyConnected) {
          io.emit('client-inform', formattedMessage);
        }

        updateConsole();
      }

    });
  });


  http.listen(3003, function () {
    console.log('Web server running on 3003!')
  })
}
