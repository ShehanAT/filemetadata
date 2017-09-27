var express = require('express');
var app = express();
var fs = require('file-system');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest:'uploads/'});//initaishiating a instance of multer
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + ""));//instead of making thousand app get we make a single statement
// views is directory for all template files
app.set('views', __dirname + '/views/');


app.get('/', function(request, response) {
  response.writeHead(200, {'Content-Type':'text/html'})
  var myReadStream = fs.createReadStream(__dirname + 'index.html', 'utf8');
  myReadStream.pipe(response);
});
app.post('/upload', upload.single('file'), function(req, res, next){
//returning the params of the file
return res.json(req.file);
})//creating post request for checking the file size

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
