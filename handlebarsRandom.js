var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3003);

function getRandomNum() {
	return Math.floor((Math.random() * 10) + 1);
}

app.get('/',function(req,res){
  res.render('home.handlebars'); //We can omit the .handlebars extension as we do below
  res.render('randomNum', getRandomNum());
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});
 
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});