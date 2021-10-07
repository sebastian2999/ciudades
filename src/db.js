var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proyecto',
  charset : 'utf8'
});

module.exports = db;