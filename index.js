var express = require('express');
var cors = require('cors');
require('dotenv').config()
require('dotenv').config()
const multer = require('multer')
const up = multer({dest:'uploads/'})
const bP = require('body-parser')
var app = express();
const fs = require('fs')

const getBytes = (f) => {
  f = f+''
  var stats = fs.statSync(f);
  var bytes = stats.size;
  console.log(bytes)
  return bytes;
}


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(bP.urlencoded({extended:true}))
app.use(express.json())
app.use(bP.json())
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", up.single('upfile'),(req,res)=>{
  console.log(req.file)
  return !req.file ? res.send("Nothing was uploaded") : res.json({ name:req.file.originalname, type:req.file.mimetype, size: req.file.size})// or getBytes(`/mnt/chromeos/MyFiles/Downloads/`+req.file.originalname)
})






const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
