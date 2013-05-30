var express = require('express'), 
  ejs = require('ejs'),
  path = require('path'), 
  http = require('http'),
  routes = require('./routes');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3002);
//  app.set('views', __dirname + '/views');
//  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.post("/datalog", routes.datalog);

http.createServer(app).listen(app.get('port'), function() {
  console.log("SolPatch server started.");
});
