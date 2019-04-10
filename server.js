'use strict';

var express = require('express');
var cors = require('cors');
var multer =  require('multer');
var bodyParser = require('body-parser');
var upload = multer({dest: './public'});
// require and use "multer"...

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});


app.route('/api/fileanalyse')
.post(upload.single('upfile'),(req,res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
