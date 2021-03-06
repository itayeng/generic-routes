var util = require('./gutil.js');
var Repository = require('./routerepo.js').Repository;
var Route = require('./routerepo.js').Route;
var _ = util.underscore;
var fs = require('fs');
var path = require('path');
var repository; // would contains Repository object

//options
var options = {
   postend : '_post' //ending of actionname if requested to be as post action
  ,generatepost: true //set to false if u dont want groutes to create post actions automaticly
  ,defaultindex: 'home' //if index is fount at the middle the route would be switched to this so index.search would be converted into home.search
}

//var route repository


//crawl requested folder and returns all route.js files
var crawl = function(folder){
  routefiles = []; // would contain files to return
  files = fs.readdirSync(folder); //current files inside dir
  //read file
  routefiles = _.map(files,function(file){
    //get file full path
    var fullpath = path.join(folder,file);
    //check if directory
    if(fs.statSync(fullpath).isDirectory()){
      //crawl
      var childfiles = crawl(fullpath);
      return childfiles;
    }
    else{
      //if solo file add it alone
      if(_.endsWith(fullpath,'.js'))
	  return fullpath;
      return '';
    }
  });
  //remove unwanted objects and flatten array
  routefiles = _.flatten(routefiles);
  routefiles = _.without(routefiles,'');
  //result all
  return routefiles;
}

//get set of file links, and creates a Route object for each one
var createRoutes = function(files){
  //crawl each file
  var routes = _.map(files,function(filepath){
    //BUGS FIX WHEN USED FROM ROOT FOLDER
    //if filepath does not contain './' at start, add it
    filepath = _.startsWith(filepath,'./') ? filepath : '../' + filepath;
    //replace '\' with '/' for require search
    filepath = filepath.replace(/\\/g,'/');
    //BUG FIX END
    //get file controller
    var controller = require(filepath);
    //remove unwanted root folders from filepath (ex: '../routes/')
    var index = filepath.indexOf('routes') + 'routes'.length; //get end index of 'routes'
    var controllerpath = filepath.substr(index); //ex /index.js
    controllerpath = _.replacelast(controllerpath,'.js',''); //removes .js from path

    //crawl each controller action
    var routes = _.map(controller,function(action,actionName){
      //get action path
      var actionpath = _.replaceforever(controllerpath,'/','.') + '.' + actionName; //replaces '\' into '.'
      //check method
      var method = _.endsWith(actionName,options.postend) && options.generatepost ? 'post' : 'get';
      //get routeurl
      var routeurl = getRouteUrl(actionpath,method);
      //create route object
      var route = new Route(routeurl,action,method);
      return route;
    });
    //return all routes
    return routes;
  });
  //flatten
  routes = _.flatten(routes);
  return routes;
}

//returns requiested route url from actionname by using some rules
var getRouteUrl = function(actionname, method){
  /* get route url rules:
   * 1. remove options.postend ending if generatepost is set to true and if is actually a post type
   * 2. if ends with .index remove it, and return doing it so actions as .index.index would be switched to '/'
   * 3. if has index at middle but not at the end switch with options.defaultindex ex index.search to home.search
   * 4. switch '.' with '/' for routing
   */
  //rule 1:
  if(options.generatepost && method == 'post'){
    actionname = _.replacelast(actionname,options.postend,'');
  }
  //rule 2:
  while(_.endsWith(actionname,'.index')){
    actionname = _.replacelast(actionname,'.index','');
  };
  if(actionname == '') actionname = '.'; //in case result was .index.index
  //rule 3:
  actionname = actionname.replace('index',options.defaultindex);
  //rule 4:
  actionname = _.replaceforever(actionname,'.','/');
  //finished creating route url
  return actionname;
}

//crawls routes dir and creates a matching route repository
var init = function(){
  //reset repository
  repository = new Repository();
  //crawl folders
  var spath = util.root();
  var files = crawl(spath); //each file should be called ex: ..\\routes\\{path}.js
  //create new route for each method in route files
  var routes = createRoutes(files); 
  //add to repository
  _.each(routes,function(route){
    repository.add(route);
  });
}

//saves the app with the matching route repository
var save = function(app){
  //fetch all routes
  var routes = repository.getAll();
  //for each route
  _.each(routes,function(route){
    //if get - create app.get
    if(route.method == 'get'){
      app.get(route.route,route.action);
    }
    //if post - create app.post
    else if(route.method == 'post'){
      app.post(route.route,route.action);
    }
  });

  //return app object
  return app;
}

exports.init = init;
exports.save = save;

// ----- Repository handlers -----

exports.add = function(route){
  repository.add(route);
}
exports.remove = function(route){
  repository.remove(route);
}
exports.getAll = function(){
  return repository.getAll();
}
exports.setAll = function(routes){
  repository.setAll(routes);
}
exports.find = function(find){
  return repository.find(find); 
}
exports.edit = function(route){
  repository.edit(route);
}

//exports.getRepository = function(){ return repository; }
//exports.saveRepository = function(newRepository){ repository = newRepository; }

