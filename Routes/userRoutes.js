const express = require("express")
const { userModel } = require("../Model/userModel")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
userRouter.post("/register",async(req,res)=>{
    const {name,email,pass} = req.body
    const existingUser = await userModel.findOne({email})
    if(existingUser){
   res.send("user already exists")
}else{
    try{
        bcrypt.hash(pass,3,async(err,hash)=>{
            if(hash){
                const user = new userModel({name,email,pass:hash})
                await user.save()
                res.status(200).send("User has been registered")
            }else{
                res.status(200).send({"Error":err})
            }  
        })
    }catch(err){
        res.status(400).send(err)
    }
}
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    const user = await userModel.findOne({email})
    if(user){
    try{
        const token = jwt.sign({userId:user._id,author:user.name},"heena")
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                res.send({"login successful":token})
            }else{
                res.send("wrong credentials")
            }
        })
    }catch(err){
        res.send(err)
    }
}else{
    res.send("Please register yourself")
}
})

module.exports = {userRouter}