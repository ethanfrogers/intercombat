
$('document').ready(function(){
    var socket = io.connect('http://intercom.supplyhog.com:3000');
    initAudio();


    var stream = ss.createStream();
    socket.on('new-audio', function(data){
        $("#breaking-news").show(300);
        $("#intercom").attr('src', '/images/intercom.gif');
        $('audio').attr('src','/messages/url/' + data.path).trigger('play');
        $('audio').on('ended', function(){
            $("#breaking-news").hide(300);
            $("#intercom").attr('src', '/images/intercom-01.png');
            //stream = ss.createStream();
        });
        //stream = ss.createStream();
        updateMessageListing();
    });
    socket.on('message-sent', function(){
        alert('Your message has been sent');
    });

    updateMessageListing();
    document.uploadToIntercom = function(blob){
	stream = ss.createStream();
        ss(socket).emit('profile-image', stream, {name: 'testfile.wav'});
        ss.createBlobReadStream(blob).pipe(stream);
    }


    function updateMessageListing(){
        $.get('http://intercom.supplyhog.com:3000/listing', function(response){
            $('.file-listings').html('');
            if(response.success == 1){
                $.each(response.files, function(index, name){
                    if(name === ".gitignore"){
                        return;
                    }
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

    $(document).foundation();

});

