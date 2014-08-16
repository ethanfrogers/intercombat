
$('document').ready(function(){
    var socket = io.connect('http://172.16.42.26:3000');
    initAudio();


    var stream = ss.createStream();
    socket.on('new-audio', function(data){
        $('audio').attr('type', 'audio/mpeg').attr('src',data.path).trigger('play');
    });
    socket.on('message-sent', function(){
        alert('Your message has been sent');
    });

    document.uploadToIntercom = function(blob){
        console.log(blob);
            ss(socket).emit('profile-image', stream, {name: 'testfile.wav'});
            ss.createBlobReadStream(blob).pipe(stream);
    }



});

