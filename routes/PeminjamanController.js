var express = require('express')
var router = express.Router()
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var conn = mysql.createConnection({
    host: '103.129.220.250',
    user: 'zoopedi1_sigudang',
    password: 'zoopedi1_sigudang',
    database: 'zoopedi1_sigudang',
    multipleStatements: true
});
module.exports = {
	index: function(req,res) {
		conn.query('SELECT * FROM transaksi', function(err, result) {
			res.render('transaksi', {data: result, successMsg: req.flash('success')});
		});
	},

	add: function(req,res) {

	},

	delete: function(req,res) {

	},

	edit: function(req,res) {

	},

	update:function(req,res) {

	}
}