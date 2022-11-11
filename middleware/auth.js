const jwt = require("jsonwebtoken");

module.exports= (request, response, next)=>{
    try{
    const token = request.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "Private key");
    next();
}
    catch(err){
        response.status(401).send(err.message)
    }
}