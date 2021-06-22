//What is this?

//we are getting raw BLE characteristics and sending them out to Wekinator via OSC, then getting them back via OSC to send to Pink Trombone

//or for music we're getting the BLE characteristics, optionally using Wekinator, and outputting MIDI over USB


var noble = require('noble');
const midi = require('midi');

noble.startScanning(); // any service UUID, no duplicates


noble.startScanning([], true); // any service UUID, allow duplicates


var serviceUUIDs = ["<service UUID 1>", ...]; // default: [] => all
var allowDuplicates = <false|true>; // default: false

noble.startScanning(serviceUUIDs, allowDuplicates[, callback(error)]); // particular UUID's


// Set up a new output.
const output = new midi.Output();

// Count the available output ports.
output.getPortCount();

// Get the name of a specified output port.
output.getPortName(0);

// Open the first available output port.
output.openPort(0);

// Send a MIDI message.
output.sendMessage([176,22,1]);

// Close the port when done.
output.closePort();
