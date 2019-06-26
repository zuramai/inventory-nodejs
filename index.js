const mysql = require('mysql'),
      express = require('express'),
      app = express(),
      bodyparser = require('body-parser');
      path = require('path');
      session = require('express-session');
      cookieParser = require('cookie-parser');
      flash = require('connect-flash');

var HomeController = require('./routes/HomeController');      
var CategoryController = require('./routes/CategoryController');      
var ItemsController = require('./routes/ItemsController');      
var UsersController = require('./routes/UsersController');      
var PeminjamanController = require('./routes/PeminjamanController');      

app.set('view engine', 'ejs');
app.listen(8000, () => console.log("SiGUdang API is running on port 8000"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/views/assets"));
app.use('/uploads',express.static(path.join(__dirname,"uploads")));
app.use(session({
    secret: "secret123",
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'sigudang',
    multipleStatements: true
});

conn.connect(err =>{
    if (!err){
        console.log("Koneksi ke basis data sukses!" );
    } else {
        console.log("Koneksi ke basis data galat!");
    }
});


app.get("/", HomeController.home);

// ITEMS
app.get('/items', ItemsController.index);
app.post('/items/add', ItemsController.add);
app.get('/items/delete/:id', ItemsController.delete)
app.get('/items/update/:id',function(req,res) {
})

// USERS
app.get('/users', UsersController.index);
app.get('/users/delete/:id', UsersController.delete);
app.get('/users/edit/:id', UsersController.edit);
app.post('/users/update', UsersController.update)
app.post('/users/add', UsersController.add)


// PEMINJAMAN
app.route('/peminjaman')
    .get(PeminjamanController.index)
    .post(PeminjamanController.add);
app.get('/peminjaman/delete/:id', PeminjamanController.delete);
app.route('/peminjaman/update/:id')
    .get(PeminjamanController.edit)
    .post(PeminjamanController.update);



// CATEGORY
app.route('/category')
    .get(CategoryController.index)
    .post(CategoryController.add);
app.get('/category/delete/:id', CategoryController.delete);
app.route('/category/update/:id')
    .get(CategoryController.edit)
    .post(CategoryController.update);


app.get('/distributor', function(req,res) {
    conn.query("SELECT *  FROM users WHERE level='distributor'", function(error,result) {
        res.render('distributor', {data:result});
    });
});

app.get('/distributor/delete/:id', function(req,res) {
    var user_id = req.params.id;
    conn.query("DELETE FROM users WHERE id="+user_id, function(error,result) {
        res.redirect('/distributor');
    }); 
});

app.post('/distributor/add', UsersController.add);

app.get('/settings', function(req,res) {

    res.render('settings');});


    
// fungsi untuk mendapatkan,menambah,menyunting,menghapus data user
app.get("/users", (req,res) => {
    let sql = "SELECT * FROM users";

    conn.query(sql, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/register", (req,res) => {
    let arr_users = [req.body.nama,req.body.username,req.body.password,req.body.level],
        sql = "INSERT INTO users (nama,username,password,level) VALUES (?,?,?,?)";

    conn.query(sql,arr_users, (err,rows,fields) =>{
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menambahkan user ke dalam basis data"});
    });
});

app.post("/login", (req,res) => {
    let arr_usr = [req.body.username,req.body.password],
        sql = "SELECT * FROM users WHERE username=? AND password=?";

    conn.query(sql, arr_usr, (err,rows,fields) => {
        if (err)
            console.log(err);
        
        // console.log(rows.length);
        // console.log(rows);

        // res.send(rows.length);
        if (rows.length > 0)
            res.send({"sukses":"1","pesan":"akun user ada!"});
        else
            res.send({"sukses":"0", "pesan":"tidak ada akun user yang seperti itu"});
    });
});

app.put("/users", (req,res) => {
    let arr_usrs = [req.body.nama,req.body.username,req.body.password,req.body.level,req.body.id],
        sql = "UPDATE users SET nama=?, username=?, password=?, level=? WHERE id=?";
    
    conn.query(sql,arr_usrs, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses memperbaharui data"});
    });
});

app.delete("/users", (req,res) => {
    let usr_id = [req.body.id],
        sql = "DELETE FROM users WHERE id=?";
    
    conn.query(sql,usr_id, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menghapus data"});   
    });
});

// fungsi untuk mendapatkan,menambah,menyunting,menghapus data barang
app.get("/barang", (req,res) => {
    let sql = "SELECT * FROM barang";

    conn.query(sql, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/barang", (req,res) => {
    let arr_barang = [req.body.nama_barang,req.body.kategori,req.body.jumlah],
        sql = "INSERT INTO barang (nama_barang,kategori,jumlah) VALUES (?,?,?)";

    conn.query(sql,arr_users, (err,rows,fields) =>{
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menambahkan user ke dalam basis data"});
    });
});

app.put("/barang", (req,res) => {
    let arr_brg = [req.body.nama_barang,req.body.kategori,req.body.jumlah,req.body.id],
        sql = "UPDATE barang SET nama_barang=?, kategori=?, jumlah=? WHERE id=?";
    
    conn.query(sql,arr_brg, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses memperbaharui data"});
    });
});

app.delete("/barang", (req,res) => {
    let usr_id = [req.body.id],
        sql = "DELETE FROM barang WHERE id=?";
    
    conn.query(sql,usr_id, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menghapus data"});   
    });
});


// fungsi untuk mendapatkan,menambah,menyunting,menghapus data kategori
app.get("/kategori", (req,res) => {
    let sql = "SELECT * FROM kategori";

    conn.query(sql, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/kategori", (req,res) => {
    let arr_kategori = [req.body.nama],
        sql = "INSERT INTO barang (nama) VALUES (?)";

    conn.query(sql,arr_kategori, (err,rows,fields) =>{
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menambahkan user ke dalam basis data"});
    });
});

app.put("/kategori", (req,res) => {
    let arr_brg = [req.body.nama,req.body.id],
        sql = "UPDATE kategori SET nama WHERE id=?";
    
    conn.query(sql,arr_brg, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses memperbaharui data"});
    });
});

app.delete("/kategori", (req,res) => {
    let usr_id = [req.body.id],
        sql = "DELETE FROM kategori WHERE id=?";
    
    conn.query(sql,usr_id, (err,rows,fields) => {
        if (err) 
            console.log(err);
        else
            res.send({"sukses":"1","pesan":"Sukses menghapus data"});   
    });
});


// buat dapet dan menambah data transaksi
app.get("/transaksi", (req,res) => {
    let sql = "SELECT * FROM transaksi";

    conn.query(sql, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send(rows);
    });
});

app.post("/transaksi", (req,res) => {
    let arr_trx = [req.body.kode_trx, req.body.operator_id,req.body.id_barang,req.body.dist_id,req.body.keterangan,req.body.tanggal],
        sql = "INSERT INTO transaksi (kode_trx,operator_id,id_barang,dist_id,keterangan,tanggal) VALUES (?,?,?,?,?,?)";

    conn.query(sql,arr_trx, (err,rows,fields) => {
        if (err)
            console.log(err);
        else
            res.send(rows);
    });
});