var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var logger = require('./utils/logger');

var app = express();

app.use(express.static('./public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routers/router'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    err.url = req ? req.url : '';
    next(err);
});

app.use(function(err, req, res, next) {
    logger.error(err);
    next(err);
});

if (!process.env.DEVELOPMENT === 'true') {
    // clear error in production to ensure that no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        next({message: 'Internal Server Error'});
    });
}

// handle errors
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    err.status = err.status || 500;
    res.status(err.status);
    res.write(err.message);
    res.end();
});

module.exports = app;
