var express = require('express')
  , path = require('path')
  , app = express()
  , exphbs = require('express-handlebars')
  , bodyParser = require('body-parser')
  , routers = require('./routers')
  , pkg = require('../../package.json')
  , ROOT = process.cwd()
  , VIEWS_PATH = `${ROOT}/${pkg.folders.views}`
  , STATIC_PATH = `${ROOT}/${pkg.folders.public}`
  , PORT = process.env.PORT || 3001;


app.set('views', path.resolve(VIEWS_PATH));
app.set('view engine', '.html');
app.engine('.html', exphbs({
  defaultLayout: 'main',
  partialsDir: `${VIEWS_PATH}/partials`,
  extname: '.html',
  layoutsDir: VIEWS_PATH,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(STATIC_PATH)));
app.use('/', routers);

app.listen( PORT, () => {
  console.log( `Listening on PORT: ${PORT}` );
});
