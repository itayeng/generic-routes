exports.login = function(req, res){
  res.render('index', { title: 'login', submit: false });
};

//need to do post login

exports.signin = function(req, res){
  res.render('index', { title: 'user.signin', submit: false });
};

exports.index = function(req, res){
  res.render('index', { title: 'user.index', submit: false});
};



