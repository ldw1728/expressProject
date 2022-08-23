
process.on('uncaughtException', (err)=>{
    logger.error(err);
});

const error = (app) => {
    //404 error handler
    const pageNotFoundErrorHandler = (req, res, next) =>{
        let httpCode = 404;
        res.status(httpCode);
        res.send(`${httpCode} | the page not found`);
    }

    //500 error handler
    const resInternalErrorHandler = (err, req, res, next) => {
        let httpCode = 500;
        res.status(httpCode);
        logger.error(err.stack);
        res.send(`${httpCode} | server internal error`);
    }

    app.use(pageNotFoundErrorHandler);
    app.use(resInternalErrorHandler);

}

module.exports = error;

