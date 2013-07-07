exports.index = function(req, res){
  res.render('index', { title: 'admin.articles.index', submit: false });
};
exports.create = function(req, res){
  res.render('index', { title: 'admin.articles.create', submit: true });
};
exports.create_post= function(req,res){
  res.render('index',{title:'admin.articles.create-post', submit: false});
}
exports.list = function(req, res){
  res.render('index', { title: 'admin.articles.list', submit: false });
};
exports.edit = function(req, res){
  res.render('index', { title: 'admin.articles.edit', submit: true });
};
exports.edit = function(req,res){
  res.render('index',{title:'admin.articles.edit-post', submit: false});
}
//need to create another index with query
