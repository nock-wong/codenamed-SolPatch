var express = require('express'), 
  ejs = require('ejs'),
  path = require('path'), 
  http = require('http'),
  mongoose = require('mongoose'),
  routes = require('./routes');

var mongoUri = 'mongodb://nodejitsu_nock:c8ncq2pfehnrli0vac7j8v8q2c@ds039257.mongolab.com:39257/nodejitsu_nock_nodejitsudb3052986592';
mongoose.connect(mongoUri);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3002);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/dashboard', routes.dashboard);
app.post('/toggle_port', routes.toggle_port);
app.post('/datalog', routes.datalog);

mongoose.connection.on('open', function() {
  console.log('Database connected.');
  http.createServer(app).listen(app.get('port'), function() {
    console.log("SolPatch server started.");
  });
});
