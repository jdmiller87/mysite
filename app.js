//Module dependencies
var express = require('express') ,
  stylus = require('stylus'),
  nib = require('nib')
  jadeStatic = require('connect-jade-static');
  
var app = express();
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Transform CSS
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }
));

// Serve static content
app.use(express.static(__dirname + '/public'));

// Serve static jadefiles
app.use(jadeStatic({
    baseDir: __dirname + '/views',
    baseUrl: '/',
    maxAge: 86400,
    jade: { pretty: true }
  }
));

// Redirect users who hit the root to /home
app.get('/', function (req, res) {
  res.render('home',
    { title : 'Home' }
  )
});

app.listen(3000)
