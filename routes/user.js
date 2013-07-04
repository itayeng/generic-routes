exports.login = function(req, res){
  res.render('index', { title: 'login' });
};

//need to do post login

exports.signin = function(req, res){
  res.render('index', { title: 'user.signin' });
};

exports.index = function(req, res){
  res.render('index', { title: 'user.index' });
};



