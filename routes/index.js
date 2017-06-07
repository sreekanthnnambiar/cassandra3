var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

exports.index=function(req,res,next){

var select='select * from users';  
req.app.get('cassandra').cql(select,function(err,users){
  if(err){
    next(err);
  }
  res.render('index',{title:'users',users:users});
});
};

exports.new=function(req,res,next){
  var insert='update users set name=?,place=? where email=?',
      params=[req.body.name,req.body.place,req.body.email];

  req.app.get('cassandra').cql(insert,params,function(err){
    if(err)
    {
      next(err);
    }
    res.redirect('/');
  });    
}

exports.delete=function(req,res,next){
  var remove='delete from users where email=?',
      params=[req.body.email];

  req.app.get('cassandra').cql(remove,params,function(err){
    if(err)
    {
      next(err);
    }
    res.redirect('/');
  });    
}

module.exports = router;
