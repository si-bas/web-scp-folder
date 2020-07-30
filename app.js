const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const MySQLStore = require('connect-mysql')(session);

const glob = require('glob');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const config = require('./config/environment');
const baseUrl = '/' + config.app.dir;

// view engine setup
app.use(baseUrl, express.static(path.join(__dirname, 'resources/assets')));
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Cookie and session
app.use(cookieParser('secret'));
app.use(session({
  secret: config.app.key,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000
  },
  store: new MySQLStore({
    config: {
      user: config.db.username,
      password: config.db.password,
      database: config.db.database
    }
  })
}));
app.use(flash());
app.set('trust proxy', true);

// Global var for templating
app.use((req, res, next) => {
  res.locals.app = config.app;
  res.locals.user = req.session.user;
  next();
});

glob.sync(path.join(__dirname, 'routes/*.js')).forEach(file => {
  app.use(baseUrl, require(path.resolve(file)));
});

app.all('/*', (req, res) => {
  return res.status(404).render('errors/404');
});

app.listen(config.app.port, () => console.log(`server listening at port ${config.app.port}`));
