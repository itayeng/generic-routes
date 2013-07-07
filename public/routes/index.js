
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'index', submit: true });
};

exports.index_post = function(req,res){
  res.render('index', {title: 'index-post', submit:false});
}

exports.search = function(req,res){
  res.render('index', { title: 'index.search', submit: false });
};
