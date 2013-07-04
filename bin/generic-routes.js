var _ = require('underscore'),
    _s = require('underscore.string');
    fs = require('fs'),
    path = require('path');

//mix underscore and underscore.string
_.mixin(_s.exports());

//add remove string from the end - needed in few places
String.prototype.removeFromEnd = function(texttoremove){
  return this.substr(0,this.lastIndexOf(texttoremove));
}

//holds all our routes
var routes_array = [];
var options = {
  defaultIndexRouteName : 'home'
}

/* generic routes module should read all the routes.js files and there methods
 * and make generic routing as exists
 */

//get all sub-folders from this route
var crawl = function(routefolder){
  /*
   * first we would crawl all the folders inside routefolder
   * if file is a folder, send back to this method and crawl this folder
   * if file is a route.js, send to getrouteinfo method
   */

  //create route physical path
  var routephysicalpath = './' + routefolder;
  //get all the files inside dir directory
  var files = fs.readdirSync(routephysicalpath);

  //read file
  _.each(files,function(file){
    //get file full virtual path
    var filevirtualpath = path.join(routephysicalpath,file);
    //check if is directory
    if(fs.statSync(filevirtualpath).isDirectory()){
      //send to this method again to find sub folders inside this folder
      crawl(filevirtualpath);
    } 
    else{
      //check if this file is a .js file
      if(_.endsWith(filevirtualpath,'.js')){
	getrouteinfo(filevirtualpath);
      }
    }
  });
}

//gets route info and saves it inside routes = [];
var getrouteinfo = function(filepath){
  /*
   * we get routes/folders/filename.js string, we would change it to match
   * require(filepath) so we can get a module for this type
   * after doing that we would crawl all it methods and then send to generategenericroute
   * after that we would append the new info into our routes array for farther useage
   */
  //create route object
  var regexp = new RegExp('\\\\', 'g');
  var routevirtualpath = '../' + filepath.replace(regexp,'/').replace('.js','');
  var routemodule = require(routevirtualpath);
  //crawl methods
  _.each(routemodule,function(methodaction,methodname){
    //generate generic route
    var genericrouteurl = generategenericroute(routevirtualpath, methodname);
    //create route json object
    var route = {
      url: genericrouteurl,
      action: methodaction,
    };
    //save json
    routes_array.push(route);
  });
}

//returns generic route url for the requested method
var generategenericroute = function(virtualpath, methodname){
  /*
   * basic idea, from route/somefolder/somefile.js somemethod should create
   * url: somefolder/somefile/somemethod
   *
   * spaciel rules:
   * index methods should be switched to empty '/' 
   * index.js should be switched to 'home' (means if ends with index)
   */
  var urlpath = virtualpath.replace('../routes',''); //remove routes
  urlpath = _.endsWith(urlpath,'index') ? urlpath.removeFromEnd('index') + options.defaultIndexRouteName : urlpath; //changed ends with 'index' into home
  urlpath = methodname == 'index' ? urlpath : urlpath + '/' + methodname; //if index is last, removes it
  return urlpath;
}

var setoptions = function(optionsToSet){
  optionsToSet = optionsToSet == undefined ? {} : optionsToSet;
  options = {
    defaultIndexRouteName : optionsToSet.defaultIndexRouteName != undefined ? optionsToSet.defaultIndexRouteName : options.defaultIndexRouteName
  }
}

//gets default routes
exports.init = function(newoptions){
  //merge
  setoptions(newoptions);

  //start crawling
  crawl('routes');
}

//returns routes object to client
exports.getroutes = function(){
  return routes_array;
}

//sets route object
exports.setroutes = function(routes_to_set){
  routes_array = routes_to_set;
}
//updates app and returns it
exports.updateapp = function(app){
  _.each(routes_array,function(route){
    //append default route
    app.get(route.url,route.action);
    //if route ends with '/home', append '/' also
    if(_.endsWith(route.url,'/'+options.defaultIndexRouteName)) {
      var routeurl = route.url.removeFromEnd('/'+options.defaultIndexRouteName) + '/';
      app.get(routeurl,route.action);
    }
  });
  return app;
}
