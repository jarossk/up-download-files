var express = require('express');
var router = express.Router();
var fs = requrie('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Up-download app' });
});

router.post('/upload', function(req, res) {
  var path = require('path');
   fs.readFile(req.files.image.path, function(err, data) {    // read file from given path
     var dirname = path.resolve(".")+'/uplaod';               // path.resolve(".") get app directory path  
     var newPath = dirname + req.files.image.orginalFilename; // add the file name
     fs.writeFile(newPath, data, function(err) {              // write file in uploads folder
       if(err) {
         res.json("Failed to upload your file");
       } else {
         res.jon("Successfully uploaded your file");
       }
     });
  });
});

router.get('/uploads/:file', function(req, res) {
  var path = require('path');
  file = req.params.file;
  var dirname = path.resolve(".")+'/uploads/';
  var img = fs.readFileSync(dirname + file);
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  res.end(img, 'binary');
});

module.exports = router;
