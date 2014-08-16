
$('document').ready(function(){
    var socket = io.connect('http://localhost:3000');

    $("#file").on('change',function(e){
        console.log('file change');
        var file = e.target.files[0];
        var stream = ss.createStream();

        // upload a file to the server.
        console.log(file);
        ss(socket).emit('profile-image', stream, {size: file.size, name: file.name});
        ss.createBlobReadStream(file).pipe(stream);

        socket.on('new-audio', function(data){
            console.log(data);
            $('audio').attr('type', 'audio/mpeg').attr('src',data.path);
        });
    });






});

