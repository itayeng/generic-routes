exports.index = function(req, res){
  res.render('index', { title: 'admin.articles.index' });
};
exports.create = function(req, res){
  res.render('index', { title: 'admin.articles.create'});
};
exports.list = function(req, res){
  res.render('index', { title: 'admin.articles.list' });
};
exports.edit = function(req, res){
  res.render('index', { title: 'admin.articles.edit' });
};
//need to create another index with query
