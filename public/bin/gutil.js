var fs = require('fs');
var _ = require('underscore');
var _s = require('underscore.string');
_.mixin(_s.exports());
_.mixin({
  //searches for find in string from the end and replaces it with replace
  replacelast: function(str,find,replace){
    //finds the index of what needs to be reaplced
    var index = str.lastIndexOf(find); 
    //get it's last index
    var findendIndex = find.length + index; 
    //get the end and start of the original string
    var startStr = str.substr(0,index);
    var endStr = str.substr(findendIndex);
    return startStr + replace + endStr;
  },
  replaceforever: function(string,find,replace){
    while(_.contains(string,find)){
      string = string.replace(find,replace);
    }
    return string;
  },
});

exports.underscore = _;
exports.root = function(){
  var path = './';
//  var files = fs.readdirSync(path); //main folder, start searching this 
 // console.log(files);
  //might need to update this
  return './routes';
}
