var express = require('express');
var router = express.Router();
var mime = require('mime');

/* GET users listing. */
router.get('/', function(req, res) {
    var filename = '../messages/' + req.param('url');
    res.set('Content-Type', mime.lookup(filename));
    res.sendFile(filename);
});

module.exports = router;
