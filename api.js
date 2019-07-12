const express = require('express')
var mysql   = require('mysql');
const app = express()
//var router = app.Router()
const port = 3000
var localvar='temp';
debugger;
var connection;

app.use(function(req, res, next){
  connection = mysql.createConnection({
		host: 'localhost',
    user: 'root',
    password: '',
    database: 'tms_app'
	});
	connection.connect();
	next();
});


app.use(function (req, res, next) {
  var localvar='temp';
  console.log('Time: %d', Date.now())
  console.log(req.originalUrl) 
  console.log(req.ip)
  console.log(app.locals.localvar)
  console.log(req.protocol)
  next()
})

app.get('/country', function(req, res, next) {
 
  connection.query('SELECT * FROM country', function (error, results, fields) {
     if (error) throw error;
     res.status(200).send(JSON.stringify({"status": 200, "error": null, "response": results}));
     //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
     
   });
 }); 


app.get('/', function(req, res, next) {
 connection.query('SELECT * FROM contact', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


app.get('/:id', function(req, res, next) {
  var id=req.params.id;
  connection.query('SELECT * FROM contact where id=' + id, function (error, results, fields) {
     if (error) throw error;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
   });
 });



//  app.put('/contact/:name/:id', function(req, res, next) {
//   var id=req.params.id;
//   var name=req.param.name;
//   console.log(id,name);
//   connection.query('update contact set name=' + name + 'where id=' + id, function (error, results, fields) {
//      if (error) throw error;
//      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//    });
//  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


