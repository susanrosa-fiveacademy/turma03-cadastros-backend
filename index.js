require('dotenv').config();
var express = require('express')
const consign = require('consign');
const cors = require('cors');
var app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({  origin: '*'}));
 
 consign({cwd: 'src'})
   .include('controller')
   .into(app)


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ', process.env.PORT);
})