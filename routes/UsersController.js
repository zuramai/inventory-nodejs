var express = require('express')
var router = express.Router()
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'sigudang',
    multipleStatements: true
});

module.exports = {
	index: function(req,res) {
	    conn.query('SELECT *  FROM users', function(error,result) {
	        res.render('users', {data:result});
	    })
	},

	delete: function(req,res) {
	    var user_id = req.params.id;
	    conn.query("DELETE FROM users WHERE id="+user_id, function(error,result) {
	        res.redirect('/users');
	    }); 
	},

	edit: function(req,res) {
	    var user_id = req.params.id;
	    conn.query("SELECT * FROM users WHERE id="+user_id, function(error,result) {
	        res.render('update_users', {data:result});
	    });
	},

	update: function(req,res) {
	    var user_id = req.body.id;
	    var nama = req.body.nama;
	    var username = req.body.username;
	    var password = req.body.password;
	    var level = req.body.level;

	    conn.query("UPDATE users SET nama='"+nama+"', username='"+username+"', password='"+password+"', level='"+level+"' WHERE id="+user_id, function(request,result) {
	        res.redirect('/users');
	    })
	},

	add: function(req,res) {
	    var nama = req.body.nama;
	    var username = req.body.username;
	    var password = req.body.password;
	    var level = req.body.level;
	    conn.query("INSERT INTO users VALUES('','"+nama+"','"+username+"','"+password+"','"+level+"','')", function(error,result) {
	        res.redirect('/users');
	    }); 
	
	}
}