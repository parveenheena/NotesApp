const express = require("express")
const { auth } = require("../Middleware/auth")
const { notesModel } = require("../Model/notesModel")
const notesRouter = express.Router()

notesRouter.post("/",auth,async(req,res)=>{
    console.log(req.body)
    try{
        const note = new notesModel(req.body)
        await note.save()
        res.send({"new note added":note})
    }catch(err){
        res.send({err})    
    }
})

notesRouter.get("/",auth,async(req,res)=>{
    try{
        const notes = await notesModel.find({userId:req.body.userId})
        res.send({notes})
    }catch(err){
        res.send({err})
    }
})

notesRouter.get("/:id",auth,async(req,res)=>{
    const {id} = req.params
    try{
        const notes = await notesModel.find({_id:id})
        res.send({notes})
    }catch(err){
        res.send({err})
    }
})

notesRouter.patch("/:noteid",auth,async(req,res)=>{
    const {noteid} = req.params
    try{
        const note = await notesModel.findOne({_id:noteid})
        if(note.userId===req.body.userId){
            await notesModel.findByIdAndUpdate({_id:noteid},req.body)
            res.send({"msg":"notes updated"})
        }
        else{
            res.send({"msg":"you are not authorized"})
        }
    }catch(err){
        res.send({err})
    }
})

notesRouter.delete("/:noteid",auth,async(req,res)=>{
    const {noteid} = req.params
    try{
        const note = await notesModel.findOne({_id:noteid})
        if(note.userId===req.body.userId){
        await notesModel.findByIdAndDelete({_id:noteid})
        res.send({"msg":"notes deleted"})
        }else{
            res.send({"msg":"you are not authorized"})
        }
    }catch(err){
        res.send({err})
    }
})

module.exports = {notesRouter}