const oscin = 33333;
const oscout = 11111;
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const sport = 8000;
const osc = require('node-osc');
const oscserv = new osc.Server(oscin, '0.0.0.0');
const oscclient = new osc.Client('127.0.0.1', oscout);

let clients = {};

oscserv.on("message", (msg, rinfo) => {
        switch(msg[0]) {
            case "/vol":  
                io.emit("vol", msg[1]);
                break;
            case "/intensity":  
                io.emit("intensity", msg[1]);
                break;
            case "/freq":  
                io.emit("freq", msg[1]);
                break;
            case "/tenseness":  
                io.emit("tenseness", msg[1]);
                break;
            case "/loudness":  
                io.emit("loudness", msg[1]);
                break;
            case "/vibfreq":  
                io.emit("vibfreq", msg[1]);
                break;
            case "/vibgain":  
                io.emit("vibgain", msg[1]);
                break;
            case "/vibwobble":  
                io.emit("vibwobble", msg[1]);
                break;
            case "/vib":  
                io.emit("vib", msg[1], msg[2], msg[3]);
                break;
            case "/tongueidx":  
                io.emit("tongueidx", msg[1]);
                break;
            case "/tonguediam":  
                io.emit("tonguediam", msg[1]);
                break;
            case "/tongue":  
                io.emit("tongue", msg[1], msg[2]);
                break;
            case "/voiceness":  
                io.emit("voiceness", msg[1]);
                break;
            default:
                break;
        };
});

server.listen(sport, () => {});
app.use("/", express.static(__dirname + '/public'));

io.on('connection', (skt) => {
    clients[skt.id] = skt;

    skt.on('disconnect', () => {
        delete clients[skt.id];
    });

});


