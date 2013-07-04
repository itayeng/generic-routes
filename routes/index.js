
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'index' });
};

exports.search = function(req,res){
  res.render('index', { title: 'index.search' });
};
