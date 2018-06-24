var express = require('express');
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static("."));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/user1', function(req, res) {
    res.sendFile(__dirname + '/user1.html');
});


app.get('/user2', function(req, res) {
    res.sendFile(__dirname + '/user2.html');
});

//connecting to the chat active windows
io.on('connection', function(socket) {

    //capture and emit the emitted event from chat of user1 
    socket.on('user1', function(msg) {
        io.emit('user1', 'Jim: ' + msg);
        io.emit('user2', 'Me: ' + msg);
    });

    //capture and emit the emitted event from chat of user2
    socket.on('user2', function(msg) {
        io.emit('user2', 'John: ' + msg);
        io.emit('user1', 'Me: ' + msg);
    });
});

//start the server on 3000 port
http.listen(port, function() {
    console.log('listening on *:' + port);
});