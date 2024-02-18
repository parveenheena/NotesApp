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


//swagger api

 /**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Note"
 *     responses:
 *       '200':
 *         description: New note created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Note"
 *
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retrieved notes successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Note"
 *
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the note to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Retrieved note successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Note"
 *
 *   patch:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: noteid
 *         in: path
 *         required: true
 *         description: ID of the note to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Note"
 *     responses:
 *       '200':
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: noteid
 *         in: path
 *         required: true
 *         description: ID of the note to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         userId:
 *           type: string
 */



module.exports = {notesRouter}