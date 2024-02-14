const express = require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./Routes/userRoutes")
const { notesRouter } = require("./Routes/notesRoutes")
require("dotenv").config()
const app = express()
const cors = require("cors")

app.use(express.json())
app.use("/notes",notesRouter)
app.use("/users",userRouter)
app.use(cors())


app.listen(process.env.port,async()=>{
   try{ await connection
    console.log(`server is running at : http://localhost:${process.env.port}`)}
    catch(err){
        console.log(err)
    }
})