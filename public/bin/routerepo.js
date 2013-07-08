var _ = require('underscore');
//contains domain model for route repository

//route model
var Route = function(route,action,method){
  this.id = null;
  this.route = route;
  this.action = action;
  this.method = method;
}

//export to use new Route(route,controller,method);
module.exports.Route = Route;

//repository
module.exports.Repository = function(){
  var routes = [];
  
  //add route to repository (if autoid set to false then route.id wont be generated
  this.add = function(route,autoid){
    if(autoid == null || autoid == true)
      route.id = routes.length;
    routes.push(route);
  }

  //remove route from repository
  this.remove = function(route){
    routes = _.filter(routes,function(r){
      return r.id != route.id;
    });
  }

  //returns the requested route 
  this.find = function(find){
    if(typeof(find) == typeof('')){
      //search by route
      return _.find(routes,function(r){
        return r.route == find;
      });
    }
    else if(typeof(find) == typeof(function(){})){
      //search by custom method
      return _.find(routes,find);
    }
    return null;
  }

  //returns all
  this.getAll = function(){
    return routes;
  }

  //set route array
  this.setAll = function(newroutes){
    routes = newroutes
  }

  //edit the requested route
  this.edit = function(route){
    //remove old
    this.remove(route);
    //add new
    this.add(route,false);
  }
}
