
$('document').ready(function(){
    var socket = io.connect('http://localhost:3000');
    initAudio();


    var stream = ss.createStream();
    socket.on('new-audio', function(data){
        $("#breaking-news").show(300);
        $('audio').attr('src','/messages/url/' + data.path).trigger('play');
        $('audio').on('ended', function(){
            $("#breaking-news").hide(300);
        });
        stream = ss.createStream();
        updateMessageListing();
    });
    socket.on('message-sent', function(){
        alert('Your message has been sent');
    });

    updateMessageListing();
    document.uploadToIntercom = function(blob){
        ss(socket).emit('profile-image', stream, {name: 'testfile.wav'});
        ss.createBlobReadStream(blob).pipe(stream);
    }


    function updateMessageListing(){
        $.get('http://localhost:3000/listing', function(response){
            $('.file-listings').html('');
            if(response.success == 1){
                $.each(response.files, function(index, name){
                    $(".file-listings").append('<li class="item" data-filename="' + name + '">' + name + '</li>');
                });
                $('.item').on('click', function(){
                    $('audio').attr('src','/messages/url/' + $(this).data('filename')).trigger('play');
                });

            } else {
                $(".file-listings").append('<li>No Messages to Display</li>');
            }
        });
    }





});

