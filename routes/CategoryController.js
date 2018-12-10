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
		conn.query("SELECT * FROM kategori", function(error,result) {
			res.render('category', {data:result, successMsg: req.flash('success')})
			// res.send(result);
			
		})
	},
	add: function(req,res) {
		var nama = req.body.nama;
		conn.query("INSERT INTO kategori (nama) VALUES('"+nama+"')", function(error,result) {
			req.flash('success','Sukses tambah data!');
			res.redirect(301,'/category');

		});
	},
	delete:function(req,res) {
		var id = req.params.id;
		conn.query("DELETE FROM kategori WHERE id="+id, function(error,result) {
			if (error) console.log(error);,
			req.flash('success','Sukses delete data!');
			res.redirect(301,'/category');
		})
	},
	edit:function(req,res){},
	update:function(req,res){},
}