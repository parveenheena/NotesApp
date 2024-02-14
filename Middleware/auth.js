const jwt = require("jsonwebtoken")
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        const decoded=jwt.verify(token,"heena")
        if(decoded){
            req.body.userId = decoded.userId
            req.body.author = decoded.author
            console.log(decoded)
            next()
        }else{
            res.send({"msg":"Not authorized"})
        }
    }else{
        res.send({"msg":"Not authorized"})
    }
}

module.exports= {auth}