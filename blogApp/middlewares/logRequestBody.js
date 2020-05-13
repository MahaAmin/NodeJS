function logRequestBody(req, res, next){
    console.log('request body: ', req.body);
    if(!req.body){
        return next("Error happened!");
    }
    next();
}

module.exports = logRequestBody;