var express = require('express')
var router = express.Router()
var mysql = require('mysql');
var formidable = require('formidable');
var mv = require('mv');
var util = require('util');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'sigudang',
    multipleStatements: true
});

module.exports = {
	index: function(req,res) {
		conn.query("SELECT *  FROM barang", function(error,result) {
			conn.query('SELECT * FROM kategori', function(error, result1) {
	        	res.render('items', {data:result, cat:result1, successMsg: req.flash('success')});
			})
	    });
	},

	delete: function(req,res) {
	    var id = req.params.id;
	    conn.query("DELETE FROM barang WHERE id=?",req.params.id,(err,rows,field)=>{
	        if (!err) {
	            res.redirect('/items');
	        }else{
	            console.log('failed to delete' + err);
	        }
	    });
	},

	add: function(req,res) {
	    // var nama = req.body.nama; // KOSONG
	    // var jml = req.body.jml; // KOSONG
	    // var kategori = req.body.kategori; // KOSONG

	    // membuat objek form dari formidable
      var form = new formidable.IncomingForm();

      // manangani upload file
      form.parse(req, function (err, fields, files) {
        var oldpath = files.foto.path;
        var newpath = __dirname + "/../uploads/" + files.foto.name;
        
        // GET FROM INPUT
        var nama = fields.nama;
        var nama_foto = files.foto.name;
        var jml = fields.jml;
        var kategori = fields.kategori;

        // pindahakan file yang telah di-upload
        mv(oldpath, newpath, function (err) {
          if (err) { throw err; }
          conn.query("INSERT INTO barang (nama_barang, kategori, jumlah, foto) VALUES('"+nama+"','"+kategori+"','"+jml+"','"+nama_foto+"')",function(err,result) {
		    	if (err) 
		    		console.log('error',err.message,err.stack);
		    	else
		    		console.log("success upload "+nama_foto);
			    	req.flash('success','Sukses menambahkan barang!')
			    	res.redirect(301,'/items');
		    		
		    });
        });
      });


	   
	    		
	    		
	    	
	    

	    // res.send(nama+jml+kategori);
	    
	},


}