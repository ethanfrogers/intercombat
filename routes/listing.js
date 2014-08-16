var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET messages listing */
router.get('/', function(req, res) {
    fs.readdir('./public/messages/', function(err, files){
        if(err){
            res.json({success : 0 , 'error' : err});
        } else {
            res.json({success : 1, files : files});
        }
    });
});

module.exports = router;
