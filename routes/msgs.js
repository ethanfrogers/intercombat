var express = require('express');
var router = express.Router();
var mime = require('mime');
var path = require('path');
var fs = require('fs');

router.get('/url/*', function(req, res) {
//    var filePath = path.join('../messages/', req.param('url'));
    var splitUrl = req.originalUrl.split('/');
    var filePath = path.join('./messages/', splitUrl[splitUrl.length - 1]);
    console.log(filePath);

    var stat = fs.statSync(filePath);

    res.writeHead(200, {
//        'Content-Type': mime.lookup(filePath),
        'Content-Type': 'audio/wav',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
});

module.exports = router;
