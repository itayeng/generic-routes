exports.index = function(req, res){
  res.render('index', { title: 'admin.index' });
};

exports.logoff = function(req, res){
  res.render('index', { title: 'admin.index.logoff' });
};

