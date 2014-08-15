
$('document').ready(function(){
    var socket = io.connect('http://localhost:3000');
    socket.on('ping-back' ,function(){
       alert('Connected to Socket.io');
    });

    var stream = ss.createStream();
});

