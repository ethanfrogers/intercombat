
$('document').ready(function(){
    var socket = io.connect('http://172.16.42.26:3000');
    initAudio();


    var stream = ss.createStream();
    socket.on('new-audio', function(data){
        $('audio').attr('type', 'audio/mpeg').attr('src','/messages/?url=' + data.path).trigger('play');
        stream = ss.createStream();
    });
    socket.on('message-sent', function(){
        alert('Your message has been sent');
    });

    document.uploadToIntercom = function(blob){
        ss(socket).emit('profile-image', stream, {name: 'testfile.wav'});
        ss.createBlobReadStream(blob).pipe(stream);
    }

    $.get('http://localhost:3000/listing', function(response){
        if(response.success == 1){
            $.each(response.files, function(index, name){
                $(".file-listings").append('<li class="item" data-filename="' + name + '">' + name + '</li>');
            });
            $('.item').on('click', function(){
                $('audio').attr('type', 'audio/mpeg').attr('src','/messages/' + $(this).data('filename')).trigger('play');
            });

        } else {
            //there was an error
        }
    });





});

