const express = require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./Routes/userRoutes")
const { notesRouter } = require("./Routes/notesRoutes")
require("dotenv").config()
const app = express()
const cors = require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
app.use(express.json())
app.use(cors())
app.use("/notes",notesRouter)
app.use("/users",userRouter)



const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Notes App',
        version: '1.3.0',
      },
      servers:[
          {
              url : "http://localhost:8080/"
          }
      ]
    },
    apis: ['./Routes/*.js'], 
  };
  
  const openapiSpecification = swaggerJsdoc(options);
  app.use("/apidocs",swaggerUi.serve,swaggerUi.setup(openapiSpecification))


app.listen(process.env.port,async()=>{
   try{ await connection
    console.log(`server is running at : http://localhost:${process.env.port}`)}
    catch(err){
        console.log(err)
    }
})