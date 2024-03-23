var express = require("express");
var app = express();
var path = require("path");
var mssql = require('mssql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const config = {
    user: 'yashvi',
    password: 'yashvi123',
    server: '127.0.0.1',
    database: 'studentdb',
    trustServerCertificate: true
};


var con = mssql.connect(config);

// app.get('/', function (req, res) {
//      console.log("inside app.get");
//      res.sendFile(path.join(__dirname + '/index.html'));
//  });


app.post('/', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var DOB = req.body.DOB;
    var branch = req.body.branch;
    var number =req.body.number;
    //var moment = require('moment');
    //var dateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    res.write('You sent the name "' + req.body.name + '".\n');
    res.write('You sent the email "' + req.body.email + '".\n');
    res.write('You sent the DOB "' + req.body.DOB + '".\n');
    res.write('You sent the branch "' + req.body.branch + '".\n');
    res.write('You sent the number "' + req.body.number + '".\n');

    var req = new mssql.Request();

    mssql.connect(config, err => {

        if (err) throw err;
        var sql = "INSERT INTO studentprofile (name, email,DOB,branch,number) VALUES ('" + name + "', '" + email + "','" + DOB + "','" + branch + "','" + number + "')";
        res.write("1 record inserted");
        req.query(sql, function (err, result) {
            if (err) {  //we make sure theres an error (error obj)

                if (err.errno == 1062) {

                    var sql = 'UPDATE studentprofile SET name ="' + req.body.namee + '",DOB="' + req.body.DOB + '" WHERE email ="' + req.body.email + '"';
                    req.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + " record(s) updated");
                    });
                    res.end();

                }
                else {
                    throw err;
                    res.end();
                }
            }
            
            console.log(__dirname);
            //return res.redirect('/index.html');
            //res.sendFile(path.join(__dirname + '/index.html'));
            res.end();

        });
    });
});

// app.post('/search', function (req, res) {
//     var emailId = req.body.emailIs;
//     console.log(emailId);
//     res.write('You sent the email "' + req.body.emailIs + '".\n');
//     var req = new mssql.Request();

//     mssql.connect(config, err => {
//         var sql = "SELECT * FROM userData WHERE emailId ='" +  emailId + "'" ;


//         if (err) throw err;
//         req.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log(result);
//         });
//     });
// });
app.listen(3000);
console.log("Running at Port 3000");
