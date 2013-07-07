groutes
==============

description:
node.js express module for creating generic routes for your /routes/ folder

how it works?:
simply reads your routes folder and creates generic listeners

how do groutes understands the difference between post request and get requests?:
normally all requests are made as'get' in order to tell the lab to use as 'post' method you need to add '_post' to the end of the action
example:

	exports.index_post = function(req,res){ //some code } ...
	
if you dont want groutes to auto update post requests like that the options should be changed
check the code in the /bin folder descriptioin is fount there

code example:

	var groutes = require('./bin/groutes');
	groutes.init();
	app = groutes.save(app);//save changes inside app 
	
manually changes can also be made, check app.js for an example and /bin/routerepo.js for doc
