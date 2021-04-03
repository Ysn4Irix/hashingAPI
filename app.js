const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
app.use(express.json());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error("Request Not Found");
    error.status = 404;
    next(error);
});

// error handler
app.use((error, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // send the error message
    res.status(error.status || 400).json({
        error: {
            message: error.message
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started")
});

module.exports = app;