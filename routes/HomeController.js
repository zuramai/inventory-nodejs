var express = require('express')
var mysql = require('mysql')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'sigudang',
    multipleStatements: true
});



module.exports = {
		
	home: function(req,res) {
		conn.query('SELECT * FROM users', function(error,result) {
			conn.query('SELECT * FROM barang', function(error, result1) {
		        res.render('index', {user:result, barang:result1})
			});
	    });
	}
}