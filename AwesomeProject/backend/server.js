var express = require('express');
var cors = require('cors');
var app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});
app.use(cors());

app.get('/score', function (req, res, next) {
  connection.query('SELECT * FROM scores', function (err, results, fields) {
    if (err) {
      console.error('Error fetching scores:', err);
      return res.status(500).json({error: 'Internal server error'});
    }
    res.json(results);
  });
});

app.listen(5001, function () {
  console.log('CORS-enabled web server listening on port 5001');
});
