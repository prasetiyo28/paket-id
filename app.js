require('dotenv').config();
const express = require('express');
// const helmet = require('helmet');
const bodyParser = require('body-parser');
const async = require('async');
const path = require('path');
const Cors = require('cors');
const xssFilter = require('x-xss-protection');

const addRequestId = require('express-request-id')();

const corsOption = require('./app/config/cors');



const parallelMiddleware = middlewares => (req, res, next) =>
  async.each(middlewares, (mw, cb) => mw(req, res, cb), next);
    const app = express();
app.options('*', Cors(corsOption));
app.use(Cors(corsOption));

app.use(addRequestId);
global._ = require('lodash');
global.MISC = require(path.join(__dirname, '/app/helpers/misc'));
global.MSG = require(path.join(__dirname, '/app/helpers/message'));


// app.use(helmet());
app.use(xssFilter());
app.use(
  parallelMiddleware([
    bodyParser.json({ limit: '2mb' }),
    bodyParser.urlencoded({
      extended: true,
      limit: '2mb',
      parameterLimit: 1000
    }),
    // morgan('dev')
  ])
);

// require('./app/config/passport');
require('./app/route')(app);

app.use(function (err, req, res, next) {
  console.log(err);

  return MSG.sendResponse(res, 'INTERNAL_ERROR');
});

// const intervalSocket = setInterval(() => {
//   console.log('interval');
//   global.socket = io.connect('http://localhost:3001/email-blast');
//   socket.on('connect', function () {
//     console.log('connected');
//     clearInterval(intervalSocket);
//   });
// }, 5000);

app.disable('x-powered-by');

module.exports = app;
