var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
var request = require('request');
var multer = require('multer');
const morgan = require('morgan');
const AWS = require('aws-sdk');
const fs = require('fs');

const ID = 'AKIAJXEFJNBCEVBEV7HA';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'test-bucket';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

// upload file path
const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
    dest: `${FILE_PATH}/`
});


var config = require('./config/database');
var indexRouter = require('./routes/index');
var merchantRouter = require('./routes/merchant')
var storeRouter = require('./routes/stores')
var quidRouter = require('./routes/quid')

var sympillRouter = require('./routes/sympill')

var app = express();
mongoose.connect(config.cluster, {
    useCreateIndex: true,
    useNewUrlParser: true
});

// mongoose.connect(config.cluster);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//Increased the request size to accept base64 string 
var bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (config.whitelist.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    }

        app.use('/', indexRouter);
        app.use('/merchant', cors(corsOptions), merchantRouter);
        app.use('/store', cors(corsOptions), storeRouter);
        app.use('/quid', cors(corsOptions), quidRouter);
        app.use('/sympill', sympillRouter);

        app.use(passport.initialize());

        app.use(request);

        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            next(createError(404));
        });

        // error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        module.exports = app;