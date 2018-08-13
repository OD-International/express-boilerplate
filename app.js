const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const appRoute = require('./routes/app.route')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: custom routes
app.use('/app', appRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500)
    res.json({
        status: false,
        message: err.message || err
    })
})

module.exports = app;
