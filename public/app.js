
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var groutes = require('./bin/groutes');
groutes.init();
//example how to create on solo
var routeRepository = groutes.getRepository(); //get route repository
var route = routeRepository.find(function(r){ //find requested route, check api for more methods or routerepo.js file
  return r.route == '/admin/home/logoff';
});
route.method = 'get';//change the get manually
routeRepository.edit(route);//update the repository
groutes.saveRepository(routeRepository);//save the repository inside groutes
//example end
app = groutes.save(app);//save changes inside app 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
