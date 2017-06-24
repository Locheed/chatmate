const express = require('express');

const app = express();
const mongoose = require('mongoose');
const path = require('path');
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const history = require('connect-history-api-fallback');
const morgan = require('morgan');

const io = require('socket.io').listen(server);
const SECRETS = require('./server/config/secrets');

let config = '';
const env = process.env.NODE_ENV;
console.log(env);
/* eslint-disable global-require */
if (env !== 'production') {
  config = require('./webpack.config.dev');
  console.log('Launching dev version');
} else {
  config = require('./webpack.config.prod');
  console.log('Launching production version');
}
/* eslint-enable global-require */

require('./server/config/sockets')(io);

app.use(history());

// Parse cookies
app.use(cookieParser());

// Express session and validation error
app.use(session({
  secret: SECRETS.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 360 * 60 * 1000 },
}));


// Parse application/json
app.use(bodyParser.json());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      msg: msg,
      value: value,
    };
  },
}));

// Log request's to console
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Initialize passport
require('./server/config/pass')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Server routes
const messages = require('./server/routes/messages');
const users = require('./server/routes/users');


app.use('/users', users);
app.use('/', messages);


// Webpack middleware config
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    noInfo: true,
    reload: true,
    publicPath: config.output.publicPath,
  }));

  app.use((webpackHotMiddleware)(compiler));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });
} else {
  // Get static files.
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile('./dist/index.html');
  });
}

// Create server
const port = process.env.PORT || '3002';
app.set('port', port);


server.listen(port, () => console.log(`API running on localhost:${port}`));
