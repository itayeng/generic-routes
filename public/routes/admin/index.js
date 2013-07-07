exports.index = function(req, res){
  res.render('index', { title: 'admin.index', submit: true});
};
exports.index_post = function(req, res){
  res.render('index', { title: 'admin.index', submit: false});
};
exports.logoff_post = function(req, res){
  res.render('index', { title: 'admin.index.logoff-post' });
};

