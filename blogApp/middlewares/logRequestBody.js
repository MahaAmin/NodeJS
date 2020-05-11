function logRequestBody(req, res, next){
    console.log(req.body);
    next();
}

module.exports = logRequestBody;