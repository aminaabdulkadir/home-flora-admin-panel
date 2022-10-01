const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token 
    if(authHeader){
        const token = authHeader.split(' ')[1]
         jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
             if (err) res.status(403).json('Token is not valid!')
             req.user= user;
             next()

         })
    }else{
        return res.status(401).json('You are not authenticated!')

    }
}

const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if (req.user._id === req.params.id || req.user.isAdmin) {
             next()
        } else {
            res.status(403).json('You Are not Allowed to Perforem This Action!')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if (req.user.isAdmin) {
             next()
        } else {
            res.status(403).json('You Are not Allowed to Perforem This Action!')
        }
    })
}
module.exports = {verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin}